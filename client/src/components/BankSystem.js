import React, { useEffect, useState, useRef } from "react";
import { GoogleLogout } from "react-google-login";
import { getUsers } from "../fetchMethods/get";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Section, { HeaderStyles, TransferStyles, TransactionsStyles, SearchStyles } from "../styles/BankSystem.styles";
import { transferPost } from "../fetchMethods/post";
import iconUp from "../styles/images/icon-up.svg";
import iconDown from "../styles/images/icon-down.svg";

const BankSystem = () => {
  const navigate = useNavigate();
  const conditionsRef = useRef(null);
  const [users, setUsers] = useState(null);
  const [requester, setRequester] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const successfulTransactionRef = useRef(null);

  useQuery("users", () => getUsers().then((res) => res.json()), {
    onSuccess: (res) => {
      if (res.isAuth === true) {
        setUsers(res.users);
        setRequester(res.requester);
        setTransactions(res.transactions);
        console.log("Setting Data");
      }
      if (res.isAuth === false) {
        navigate("/", { replace: true });
      }
    },
    refetchOnWindowFocus: false,
  });

  const shouldShowConditions = () => {
    conditionsRef.current.classList.remove("showConditions");
    setTimeout(() => {
      conditionsRef.current.classList.add("showConditions");
    }, 1);
  };

  const shouldShowSuccessfulTransaction = () => {
    successfulTransactionRef.current.classList.remove("showSuccessfulTransaction");
    setTimeout(() => {
      successfulTransactionRef.current.classList.add("showSuccessfulTransaction");
    }, 1);
  };

  const postTransfer = async (id, amount) => {
    await transferPost(id, amount)
      .then((res) => res.json())
      .then((res) => {
        if (res.hasEnoughCredit === false || res.isTransferCompleted === false) {
          shouldShowConditions();
          conditionsRef.current.classList.remove("showConditions");
          conditionsRef.current.classList.add("showConditions");
          console.log("Showing Conditions");
        }

        // ---------- Updating user credit after a new transaction ---------- //
        if (res.isTransferCompleted) {
          shouldShowSuccessfulTransaction();
          setRequester((requester) => {
            return { name: requester.name, name_initials: requester.name_initials, credit: res.credit };
          });

          // ---------- Updating transactions component ---------- //
          setTransactions((transactions) => {
            return [res.transaction, ...transactions];
          });
          console.log("New Transaction added and current credit updated");
        }
      });
  };

  return (
    <Section>
      <p ref={conditionsRef} className="conditions">
        Something went wrong. The number has to follow the next conditions: the number has to be integer or contain two decimal digits only, and it has to be a positive number. Make sure you have enough credit to make the transfer.
      </p>
      <p ref={successfulTransactionRef} className="successfulTransaction">
        Transaction has been successful
      </p>
      <Header transactions={transactions} requester={requester}>
        {" "}
      </Header>

      <Transfer postTransfer={postTransfer} users={users} shouldShowConditions={shouldShowConditions}></Transfer>
      <Transactions transactions={transactions}></Transactions>
    </Section>
  );
};

const Header = ({ transactions, requester }) => {
  const [shouldShowSearch, setShouldShowSearch] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const googleSignOutRef = useRef(null);
  const handleUserIconClick = () => {
    googleSignOutRef?.current.classList.toggle("showModal");
  };
  const navigate = useNavigate();

  const signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      // ---------- Deleting cookie ---------- //
      document.cookie = `Jwt=; expires=${new Date()};`;
      // ---------- Redirecting to login page ---------- //
      navigate("/", { replace: true });
    });
  };

  // ---------- Rendering search component when user starts typing ---------- //
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      setShouldShowSearch(true);
    } else {
      setShouldShowSearch(false);
    }
  };

  return (
    <HeaderStyles>
      <div className="formContainer">
        <form className="form">
          <input onChange={handleInputChange} type="text" placeholder="Search for transactions" className="input" />
        </form>
        {shouldShowSearch ? <Search setShouldShowSearch={setShouldShowSearch} transactions={transactions} inputValue={inputValue} /> : null}
      </div>
      <div className="userBox">
        <button className="initialsAndUsername" onClick={handleUserIconClick}>
          {requester?.name_initials ? <span className="nameInitials">{requester.name_initials}</span> : null}
          {requester?.name ? <span className="username">{requester.name.split(" ", 2).join(" ")} </span> : null}
        </button>
        <div ref={googleSignOutRef} className="modal">
          {requester?.credit ? <span className="credit">$ {requester.credit}</span> : null}

          <GoogleLogout
            clientId="368077113948-s7gg160dimslua257mjr69s974u7gr5s.apps.googleusercontent.com"
            onLogoutSuccess={signOut}
            render={(renderProps) => (
              <button className="signOutBtn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                Sign Out
              </button>
            )}
          ></GoogleLogout>
        </div>
      </div>
    </HeaderStyles>
  );
};

const Search = ({ transactions, inputValue }) => {
  const [coincidences, setCoincidences] = useState([]);

  useEffect(() => {
    if (transactions) {
      const filteredCoincidences = transactions.filter((transaction) => transaction.name.includes(inputValue || "*"));
      setCoincidences(filteredCoincidences);
    }
  }, [inputValue, transactions]);

  return (
    <SearchStyles className="searchContainer">
      <div className="coincidencesContainer">
        {coincidences.length > 0 ? (
          coincidences.map((coincidence, index) => {
            return (
              <div key={index} className="coincidence">
                <p className="username">{coincidence.name}</p>
                {coincidence?.increment ? <p className="amount green">$ {coincidence.amount}</p> : <p className="amount red">$ {coincidence.amount}</p>}
                <p className="date">{coincidence.date}</p>
              </div>
            );
          })
        ) : (
          <div className="noResults">No results</div>
        )}
      </div>
    </SearchStyles>
  );
};

const Transfer = ({ users, postTransfer, shouldShowConditions }) => {
  const inputAmountRef = useRef(null);

  const onSendClick = (e) => {
    // ---------- Regular Expresion so user enters the desired number format ---------- //
    const regEx = /^[0-9][0-9]*[.]?[0-9]{0,2}$/;

    e.preventDefault();
    const userId = e.target.value;
    const amount = e.target.previousSibling.valueAsNumber;

    if (isNaN(amount) || regEx.test(e.target.previousSibling.value) === false) {
      shouldShowConditions();
      console.log("Showing Conditions");
    } else {
      postTransfer(userId, amount);
      e.target.previousSibling.value = "";
      console.log("Posting new transaction");
    }
  };

  return (
    <TransferStyles className="transferContainer">
      <h2 className="title">Transfer</h2>
      <div className="wrapper" ref={inputAmountRef}>
        {users
          ? users.map((user, index) => {
              return (
                <div key={index} className="usersContainer">
                  <div className="userInfo">
                    <span className="nameInitials">{user.name_initials}</span>
                    <span className="username">{user.name + " " + user.last_name.split(" ")[0]}</span>
                  </div>
                  <form className="form">
                    <input min="1" className="input" type="number" placeholder="0.00 $" />
                    <button onClick={onSendClick} value={user.id} className="sendBtn">
                      Send
                    </button>
                  </form>
                </div>
              );
            })
          : null}
      </div>
    </TransferStyles>
  );
};

const Transactions = ({ transactions }) => {
  return (
    <TransactionsStyles className="transactionsContainer">
      <h2 className="title">Transactions</h2>

      <div className="wrapper">
        {transactions
          ? transactions.map((transaction, index) => {
              return (
                <div key={index} className="transactionContainer">
                  <span className="date">{transaction.date.split(",")[1]}</span>
                  <div className="info">
                    <p className="username">{transaction.name}</p>
                    <span className="amount">$ {transaction.amount}</span>
                  </div>
                  {transaction?.increment ? <img src={iconUp} className="increment" alt="up" /> : <img src={iconDown} className="decrement" alt="down" />}
                </div>
              );
            })
          : null}
      </div>
    </TransactionsStyles>
  );
};

export default BankSystem;
