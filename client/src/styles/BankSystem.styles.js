import styled from "styled-components";

const Section = styled.section`
  display: grid;
  grid-template-rows: 4.5rem 25rem 25rem;
  grid-template-columns: 1fr;
  width: 100%;
  height: 60rem;
  background-color: #232f3b;
  grid-gap: 2rem;
  position: relative;

  @media screen and (min-width: 900px) {
    height: 70rem;

    .transferContainer {
      .usersContainer {
        padding: 0 4rem;
      }
      max-width: 50rem;

      justify-self: center;
    }

    .transactionsContainer {
      max-width: 50rem;

      justify-self: center;
      .transactionContainer {
        padding: 0 4rem;
      }
    }

    grid-template-rows: 4.5rem 30rem 30rem;
  }

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);

    border-radius: 0.5rem;
  }

  .conditions {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0.5rem;
    text-align: center;
    transform: translateY(-100%);
    z-index: 20;
    color: #e7ecf0;
  }

  .showConditions {
    background-color: #1b707c;
    animation: reveal 20s ease;
  }

  .successfulTransaction {
    position: fixed;
    width: 100%;
    transform: translateY(-100%);
    z-index: 20;
    margin: 0;
    padding: 1rem 0;
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
    text-align: center;
    background-color: #0dbf31;
  }

  .showSuccessfulTransaction {
    animation: reveal 5s ease;
  }

  @keyframes reveal {
    0% {
      transform: translateY(-100%);
    }
    15%,
    90% {
      transform: translateY(0);
    }
  }

  .showSuccessfulTransaction {
  }
`;

export const HeaderStyles = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #2a3b4d;

  .formContainer {
    width: 50%;
  }

  // Form //
  .form {
  }

  .nameInitials {
    margin-right: 1rem;

    font-weight: bold;
    text-align: center;

    width: 3rem;
    padding: 1rem 0;
    color: #e7ecf0;

    border-radius: 50%;
    background-color: #63625f;
  }

  .input {
    font-size: 1rem;
    width: 100%;
    height: 2rem;
    color: #e7ecf0;
    outline: none;
    background-color: #2a3b4d;
  }

  .userBox {
    position: relative;
    z-index: 10;
    display: flex;
  }

  .initialsAndUsername {
    display: flex;
    align-items: center;
  }

  .userIcon {
    margin-right: 0.5rem;
    width: 2rem;
  }

  .username {
    width: 5rem;
    font-size: 0.9rem;
    color: #e7ecf0;
  }

  .modal {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 10rem;
    height: 5rem;

    background-color: #1b707c;
    position: absolute;
    visibility: hidden;

    top: 140%;
    right: 0;
    border-radius: 0.2rem;

    .credit {
      font-weight: bold;
      color: #00ff48;
    }
  }

  .signOutBtn {
    background: linear-gradient(to bottom right, #ef4765, #ff9a5a);
    border: 0;
    border-radius: 12px;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 2.5;
    outline: transparent;
    padding: 0 1rem;
    text-align: center;
    text-decoration: none;
    transition: box-shadow 0.2s ease-in-out;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
  }

  .signOutBtn:hover {
    transform: scale(92%);
  }

  // Shows sign out button //
  .showModal {
    visibility: visible;
  }
`;

export const TransferStyles = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  justify-self: end;
  width: 95%;
  overflow: hidden;

  .wrapper::-webkit-scrollbar {
    width: 0.5rem;
  }

  .wrapper::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);

    border-radius: 0.5rem;
  }

  .wrapper {
    overflow: auto;
    width: 100%;
  }

  .title {
    width: 100%;
    margin-top: 0;
    color: #b1b3bc;
    padding: 1rem 1.5rem;
    background-color: #2a3b4d;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .usersContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    height: 5rem;
    background-color: #27333f;
    border-radius: 0.3rem;
    padding: 0 5%;
  }

  .userInfo {
    display: flex;
    align-items: center;
  }

  .username {
    line-height: 1.2rem;
    letter-spacing: 0.5px;
    width: min-content;
    font-weight: bold;
    font-size: 0.8rem;
    color: #e7ecf0;
  }

  .input {
    width: 5rem;
    outline: none;
    margin-right: 0.5rem;

    border-bottom: 2px solid #394551;
    background-color: #27333f;
    font-weight: bold;
    padding: 0;
    color: #e7ecf0;
    text-align: right;
  }

  .input::placeholder {
    padding-left: 45%;
  }

  .sendBtn {
    font-size: 1rem;
    font-weight: bold;
    color: #0982d5;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  .nameInitials {
    margin-right: 1rem;

    font-weight: bold;
    text-align: center;

    width: 3rem;
    /* height: 3rem; */
    padding: 0.85rem 0;
    color: #e7ecf0;

    border-radius: 50%;
    background-color: #63625f;
  }
`;

export const TransactionsStyles = styled.section`
  display: flex;
  flex-direction: column;
  justify-self: start;
  width: 95%;
  overflow: hidden;
  border-radius: 0.5rem;

  .title {
    width: 100%;
    margin-top: 0;
    color: #b1b3bc;
    padding: 1rem 1.5rem;
    background-color: #2a3b4d;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .wrapper::-webkit-scrollbar {
    width: 0.5rem;
  }

  .wrapper::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0.5rem;
  }

  .wrapper {
    overflow: auto;
    width: 100%;
  }

  .transactionContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    background-color: #27333f;
    width: 100%;
    height: 5rem;
  }

  .date {
    width: 3rem;
    height: 3rem;
    padding-top: 0.55rem;
    border-radius: 50%;
    background-color: white;
    text-align: center;
    font-size: 0.7rem;
    font-weight: bold;
    line-height: 1rem;
    background-image: linear-gradient(to top, #fe6196, #ffac73);
    background-repeat: no-repeat;
    color: #e7ecf0;
    word-spacing: 20px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 12rem;
    .username {
      margin: 0;
      color: #e7ecf0;
      font-size: 0.9rem;
    }
    .amount {
      margin-top: 0.4rem;
      color: #e7ecf0;
      font-weight: bold;
    }
  }

  .increment,
  .decrement {
    width: 1rem;
  }
`;

export const SearchStyles = styled.div`
  background-color: #2a3b4d;
  position: absolute;
  top: 5rem;
  overflow: auto;
  max-height: 20rem;
  width: 20rem;
  border-radius: 0.3rem;

  .coincidencesContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .coincidence {
    display: flex;
    flex-direction: column;
    background-color: #27333f;

    width: 18rem;
    margin: 1rem 0rem;
    border-radius: 1rem;
  }

  .username,
  .amount,
  .date {
    margin: 0.5rem 0;
  }
  .date {
    align-self: flex-end;
    font-size: 0.9rem;
    margin-top: 0;
    margin-right: 2rem;
    color: #e7ecf0;
  }

  .username,
  .amount {
    margin-left: 1rem;
  }

  .green {
    color: green;
  }

  .red {
    color: hsl(0, 100%, 68%);
  }

  .noResults {
    margin-top: 3rem;
    margin-bottom: 3rem;
    color: #e7ecf0;
  }
`;

export default Section;
