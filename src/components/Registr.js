import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import logo from '../img/logo.png';
import bigLogo from '../img/bigLogo.png';
import './Registr.scss';

const Registr = () => {
  let history = useHistory();
  const [values, setValues] = useState({
    login: '',
    loginError: false,
    loginExists: false,
    password: '',
    passwordError: false,
    repeatPassword: '',
    wrongRepeatPassword: false,
    showPassword: false,
  });

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  // const handleChangLogin = (e) => {
  //   setValues({ ...values, login: e.target.value });
  // };

  // const handleLoginBlur = () => {
  //   if (values.login) {
  //     const correctValue = (/^[A-Za-z0-9]{6,}$/.test(values.login));
  //     setValues({ ...values, loginError: !correctValue });
  //   };
  // };

  // const handleLoginFocus = () => {
  //   setValues({ ...values, loginError: false, loginExists: false });
  // };

  // const handlePassword = (e) => {
  //   setValues({ ...values, password: e.target.value });
  // };

  // const handlePasswordBlur = () => {
  //   if (values.password) {
  //     const correctValue1 = (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(values.password));
  //     setValues({ ...values, passwordError: !correctValue1 });
  //   };
  // };

  // const handlePasswordFocus = () => {
  //   setValues({ ...values, passwordError: false });
  // };

  // const handleRepeatPassword = (e) => {
  //   setValues({ ...values, repeatPassword: e.target.value });
  // };

  // const handleRepeatPasswordBlur = () => {
  //   (values.password !== values.repeatPassword
  //   && values.password 
  //   && values.repeatPassword) 
  //   ? setValues({ ...values, wrongRepeatPassword: true })
  //   : setValues({ ...values, wrongRepeatPassword: false })
  // };

  // const handleRepeatPasswordfocus = () => {
  //   setValues({ ...values, wrongRepeatPassword: false });
  // };

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };

  // const goToAuthor = () => {
  //     history.push('/author');
  // };

  // const funcRegistration = async (values) => {
  //   const {login, 
  //     loginError,
  //     loginExists,
  //     password,
  //     passwordError,
  //     wrongrRepeatPassword
  //   } = values;
  //   if (login
  //       && !loginError
  //       && !loginExists
  //       && password 
  //       && !passwordError
  //       && !wrongrRepeatPassword) {
  //       await axios.post('http://localhost:8000/addNewUser', {
  //         login: login,
  //         password: password
  //       }).then(res => history.push('/appoint'))
  //         .catch(err => setValues({ ...values, loginExists: true}))
  //   } if (login && !password) {
  //     alert('введите пароль');
  //   } if (!login && password) {
  //     alert('введите логин');
  //   };
  // };

  return (
    <div>
      <AppBar position="static" className='my-app'>
        <Toolbar variant="dense">
          <IconButton edge="start" >
            <img src = {logo} />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Зарегистрироваться в системе
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
};

export default Registr;