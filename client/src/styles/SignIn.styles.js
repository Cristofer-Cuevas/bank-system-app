import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 58rem;
  position: relative;

  .container {
    width: 90%;
    max-width: 500px;
    height: auto;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  .signInForm,
  .signUpForm {
    display: flex;
    flex-direction: column;
    align-items: center;

    justify-content: center;
    width: 100%;
    background-color: #ffffff;

    transition: all 0.6s ease-in-out;
    height: auto;
  }

  .formTitle {
    margin: 1rem;
  }

  .useAccount {
    font-size: 0.8rem;
  }

  .form {
    width: 75%;
  }

  .btn {
  }
  
  .input {
    display: block;
    width: 100%;
    padding-left: 0.8rem;
    margin-top: 0.8rem;
    background-color: #eee;
    height: 2rem;
    font-size: 1rem;
  }
  
  .input::placeholder {
    color: black;
    font-size: 0.8rem;
  }
  
  .btn,
  .overlayBtn {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1.3rem;
    margin-bottom: 1rem;
    border-radius: 20px;

    background-color: #ff4b2b;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    cursor: pointer;
  }

  .btn:active {
    transform: scale(0.95);
  }

  .orContainer {
    display: flex;

    margin: 2rem 0;
    width: auto;

    hr {
      background-color: black;
      width: 7rem;
      border-width: 0px;
      margin-block-start: 10.5px;
      margin-block-end: 8px;
    }
  }

  .errorMessage {
    color: hsl(0, 100%, 60%);
    font-weight: bold;
    margin-top: 0.1rem;
    padding: 0;
    font-size: 0.7rem;
  }

  .overlayContainer {
    display: none;
  }

  @media screen and (min-width: 800px) {
    height: 42rem;

    .container {
      width: 90%;
      max-width: 920px;
      position: relative;
      height: 75%;
    }

    .signUpForm,
    .signInForm {
      position: absolute;
      width: 50%;
      height: 100%;
    }

    .signInForm {
      z-index: 2;
    }

    .container.moveForms .signInForm {
      transform: translateX(100%);
    }

    .container.moveForms .signUpForm {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: show 0.6s;
    }

    .signUpForm {
      opacity: 0;

      z-index: 1;
    }



    @keyframes show {
      0%,
      49.99% {
        opacity: 0;
        z-index: 1;
      }

      50%,
      100% {
        opacity: 1;
        z-index: 5;
      }
    }

    .overlayContainer {
      display: block;
      z-index: 100;
      color: #ffffff;
      overflow: hidden;
      width: 50%;
      position: absolute;
      transform: translateX(100%);
      height: 100%;
      transition: transform 0.6s ease-in-out;
    }

    .overlayBtn {
      margin-top: 0.7rem;
      background-color: transparent;
      border: 1px solid #ffffff;
    }

    .container.moveForms .overlayContainer {
      transform: translateX(0%);
    }

    .overlay {
      display: flex;
      transform: translateX(-50%);
      background-image: linear-gradient(to right, #ff4b2b, #ff416c);
      height: 100%;
      width: 200%;
      transition: transform 0.7s ease-in-out;
    }

    .container.moveForms .overlay {
      transform: translateY(0%);
    }

    .overlayLeft,
    .overlayRight {
      display: inline;

      display: flex;
      flex-direction: column;

      align-items: center;
      justify-content: center;
      height: 100%;
      width: 50%;
      text-align: center;
    }

    .formTitle {
      margin: 2rem;
    }
    .orContainer {
      display: none;
    }
  }
`;

export default Div;
