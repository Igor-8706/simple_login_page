import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";


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
        isValid: action.value.trim().length > 7
      }
    case 'PASSWORD_BLUR':
      return {
        value: prevState.value,
        isValid: prevState.value.trim().length > 7,
      }
    default:
      return {
        value: '',
        isValid: false,
      }
  }
}

const Login = () => {
  // const [inputEmail, setInputEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [inputPassword, setInputPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailState] = useReducer(emailReducer, { value: '', isValid: undefined })
  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, { value: '', isValid: undefined })

  const ctx = useContext(AuthContext)

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid)
    }, 1000)
    return () => { clearTimeout(timer) }
  }, [emailState.isValid, passwordState.isValid])


  const emailChangeHandler = (event) => {
    dispatchEmailState({ type: 'USER_INPUT', value: event.target.value })
    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid)
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({ type: 'PASSWORD_INPUT', value: event.target.value })
    // setFormIsValid(event.target.value.trim().length > 7 && emailState.isValid)
  };

  const validateEmailHandler = () => {
    dispatchEmailState({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({ type: 'PASSWORD_BLUR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        {/* <div
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
        </div> */}
        <Input styles={styles}
          ref={emailInputRef}
          state={emailState}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          label={'Email'} />

        {/* <div
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
        </div> */}
        <Input styles={styles}
          ref={passwordInputRef}
          state={passwordState}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          label={'Password'}
        />

        <div className={styles.actions}>
          <Button type="submit" className={styles.btn}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
