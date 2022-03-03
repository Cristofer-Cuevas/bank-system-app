import React, { useEffect, useRef, useState } from "react";
import Div from "../styles/SignIn.styles";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { signUpPost, signInPost, signUpPostGoogleIdToken, signInPostGoogleIdToken } from "../fetchMethods/post";
import { getAuth } from "../fetchMethods/get";
import {} from "../fetchMethods/post";

import ReactDOM from "react-dom";

import { GoogleLogin } from "react-google-login";

const setCookie = (token) => {
  const cookieExpires = new Date();
  cookieExpires.setTime(cookieExpires.getTime() + 1000 * 60 * 60 * 24 * 2);

  document.cookie = `Jwt=${token}; expires=${cookieExpires}; path=/`;
};

const Signin = () => {
  useQuery("userAuth", () => getAuth().then((res) => res.json()), {
    onSuccess: (res) => {
      if (res.isAuth) {
        navigate("/bank-system", { replace: true });
      }
    },
  });

  const [formState, setFormState] = useState({});
  const overlayContainerRef = useRef(null);
  const containerRef = useRef(null);
  const signUpFormRef = useRef(null);
  const signUpNameRef = useRef(null);
  const signUpLastNameRef = useRef(null);
  const signUpEmailRef = useRef(null);
  const signUpPasswordRef = useRef(null);

  const signInEmailRef = useRef(null);
  const signInPasswordRef = useRef(null);

  const navigate = useNavigate();
  const onSignUpClickAnimation = () => {
    containerRef.current.classList.toggle("moveForms");
  };

  // ---------- Sign In funcs ---------- //
  function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;

    signInPostGoogleIdToken(id_token)
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          setCookie(res.token);
        }
        if (res.isAuth) {
          navigate("/bank-system", { replace: true });
        }
      });
  }

  const signInPostMutation = useMutation((credentials) => signInPost(credentials).then((res) => res.json()), {
    onSuccess: (res) => {
      if (res.token) {
        setCookie(res.token);
      }
      if (res.isAuth) {
        navigate("/bank-system", { replace: true });
      }

      if (res.hasToVerify) {
        setFormState({ onSignInhasToVerify: true });
      } else if (res.userExist === false) {
        setFormState({ signIngUserExist: true });
      } else if (res.wrongPassword) {
        setFormState({ wrongPassword: true });
      }
    },
    refetchOnWindowsFucs: false,
  });

  const onSignInClick = (e) => {
    e.preventDefault();

    const credentials = {
      email: e.target.parentNode.children[0].value,
      password: e.target.parentNode.children[1].value,
    };

    if (regEx.test(signInEmailRef.current.value) === false && !signInPasswordRef.current.value) {
      setFormState({ signIninvalidEmail: true, signInPassword: true });
    } else if (!signInEmailRef.current.value) {
      setFormState({ signInEmail: true });
    } else if (!signInPasswordRef.current.value) {
      setFormState({ signInPassword: true });
    } else {
      setFormState(null);

      signInPostMutation.mutate(credentials);
    }
  };

  // ---------- Sign up funcs ---------- //
  function onSignUp(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;

    signUpPostGoogleIdToken(id_token)
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          setCookie(res.token);
        }
        if (res.isAuth) {
          navigate("/bank-system", { replace: true });
        }

        if (res.userExist) {
          setFormState({ userExist: true });
        }
      });
  }

  const signUpPostMutation = useMutation((credentials) => signUpPost(credentials).then((res) => res.json()), {
    onSuccess: (res) => {
      if (res.token) {
        setCookie(res.token);
      }
      if (res.isAuth) {
        navigate("/bank-system");
      }

      if (res.hasToVerify) {
        setFormState({ onSignUphasToVerify: true });
      } else if (res.userExist) {
        setFormState({ userExist: true });
      }
    },

    refetchOnWindowsFucs: false,
  });

  const regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;

  const signUpPostClick = (e) => {
    e.preventDefault();

    if (!signUpNameRef.current.value && !signUpLastNameRef.current.value && regEx.test(signUpEmailRef.current.value) === false && !signUpPasswordRef.current.value) {
      setFormState({ signUpName: true, signUpLastName: true, invalidEmail: true, signUpPassword: true });
    } else if (!signUpNameRef.current.value) {
      setFormState({ signUpName: true });
    } else if (!signUpLastNameRef.current.value) {
      setFormState({ signUpLastName: true });
    } else if (!regEx.test(signUpEmailRef.current.value)) {
      setFormState({ invalidEmail: true });
    } else if (!signUpPasswordRef.current.value) {
      setFormState({ signUpPassword: true });
    } else {
      const credentials = {
        username: e.target.parentNode.children[0].value,
        lastname: e.target.parentNode.children[1].value,
        email: e.target.parentNode.children[2].value,
        password: e.target.parentNode.children[3].value,
      };

      setFormState(null);
      signUpPostMutation.mutate(credentials);
    }
  };

  useEffect(() => {
    ReactDOM.render(<GoogleLogin clientId="368077113948-s7gg160dimslua257mjr69s974u7gr5s.apps.googleusercontent.com" buttonText="Sign in with Google" onSuccess={onSignIn} cookiePolicy={"single_host_origin"} theme="dark" />, document.getElementById("g-signin2"));

    ReactDOM.render(<GoogleLogin clientId="368077113948-s7gg160dimslua257mjr69s974u7gr5s.apps.googleusercontent.com" buttonText="Sign up with Google" onSuccess={onSignUp} cookiePolicy={"single_host_origin"} theme="dark" />, document.getElementById("g-signup2"));
  });

  return (
    <Div>
      <div ref={containerRef} className="container">
        <div className="signInForm">
          <h1 className="formTitle">Sign in</h1>

          <div id="g-signin2" data-onsuccess="onSignIn"></div>

          <p className="useAccount">or use your account</p>
          <form className="form">
            <input ref={signInEmailRef} className="inputEmail input" type="text" placeholder="Email" autoComplete="username" />

            {formState?.signIninvalidEmail ? <p className="errorMessage">Please provide a valid email</p> : null}

            {formState?.signIngUserExist ? <p className="errorMessage">This email isn't associated with any account.</p> : null}

            <input ref={signInPasswordRef} autoComplete="current-password" className="inputPassword input" type="password" placeholder="Password" />

            {formState?.signInPassword ? <p className="errorMessage">Password is empty</p> : null}

            {formState?.wrongPassword ? <p className="errorMessage">Wrong password</p> : null}

            <button onClick={onSignInClick} className="btn">
              SIGN IN
            </button>

            {formState?.onSignInhasToVerify ? <p className="errorMessage verifyEmail">Please verify your account.</p> : null}
          </form>
        </div>

        <div className="orContainer">
          <hr />
          <span className="or">or</span>
          <hr />
        </div>

        <div className="signUpForm">
          <h1 className="formTitle">Sign up</h1>
          <div id="g-signup2" data-onsuccess="onSignUp"></div>
          <p className="useAccount">or use your credentials to sign up</p>
          <form ref={signUpFormRef} className="form">
            {formState?.userExist ? <p className="errorMessage">This user already exist. Try with another email.</p> : null}

            <input ref={signUpNameRef} autoComplete="name" type="text" className="input" placeholder="Name" />
            {formState?.signUpName ? <p className="errorMessage">Name is empty</p> : null}

            <input ref={signUpLastNameRef} type="text" className="input" placeholder="Last Name" />

            {formState?.signUpLastName ? <p className="errorMessage">Last name is empty</p> : null}

            <input ref={signUpEmailRef} autoComplete="email" type="text" className="input" placeholder="Email" />

            {formState?.invalidEmail ? <p className="errorMessage">Please provide a valid email</p> : null}

            <input ref={signUpPasswordRef} autoComplete="current-password" type="password" className="input" placeholder="Password" />

            {formState?.signUpPassword ? <p className="errorMessage">Password is empty</p> : null}

            <button onClick={signUpPostClick} className="btn">
              SIGN UP
            </button>

            {formState?.onSignUphasToVerify ? <p className="errorMessage">Check your inbox to verify your account</p> : null}
          </form>
        </div>

        <div ref={overlayContainerRef} className="overlayContainer">
          <div className="overlay">
            <div className="overlayLeft">
              <h2>Welcome Back!</h2>
              <p>To keep connected with us please login with your personal info</p>
              <button className="overlayBtn" onClick={onSignUpClickAnimation}>
                SIGN IN
              </button>
            </div>
            <div className="overlayRight">
              <h2>Hello, Friend!</h2>
              <p>Enter your personal details and start journey with us</p>
              <button className="overlayBtn" onClick={onSignUpClickAnimation}>
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </Div>
  );
};

export default Signin;
