import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";


const emailReducer = (prevState, action) => {
  switch (action.type) {
    case 'USER_INPUT':
      return {
        value: action.value,
        isValid: action.value.includes('@')
      }
    case 'INPUT_BLUR':
      return {
        value: prevState.value,
        isValid: prevState.value.includes('@'),
      }
    default:
      return {
        value: '',
        isValid: false,
      }
  }
}

const passwordReducer = (prevState, action) => {
  switch (action.type) {
    case 'PASSWORD_INPUT':
      return {
        value: action.value,
        isValid: action.value.length>7
      }
    case 'PASSWORD_BLUR':
      return {
        value: prevState.value,
        isValid: prevState.value.length>7,
      }
    default:
      return {
        value: '',
        isValid: false,
      }
  }
}

const Login = (props) => {
  // const [inputEmail, setInputEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [inputPassword, setInputPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailState] = useReducer(emailReducer, { value: '', isValid: undefined })
  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, { value: '', isValid: undefined })


  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setFormIsValid(inputEmail.includes("@") && inputPassword.trim().length > 7
  //     )
  //   }, 1000)
  //   return () => { clearTimeout(timer) }
  // }, [inputEmail, inputPassword])


  const emailChangeHandler = (event) => {
    dispatchEmailState({ type: 'USER_INPUT', value: event.target.value })
    setFormIsValid(event.target.value.includes("@") && inputPassword.trim().length > 7)
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({type:'PASSWORD_INPUT', value: event.target.value})
    setFormIsValid(event.target.value.trim().length > 7 && emailState.isValid)
  };

  const validateEmailHandler = () => {
    dispatchEmailState({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({type:'PASSWORD_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, inputPassword);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${emailState.isValid === false ? styles.invalid : ""
            }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${passwordState.isValid === false ? styles.invalid : ""
            }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
