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
import '../components/Registr.scss';

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

  const handleChangLogin = (e) => {
    setValues({ ...values, login: e.target.value });
  };

  const handleLoginBlur = () => {
    if (values.login) {
      const correctValue = (/^[A-Za-z0-9]{6,}$/.test(values.login));
      setValues({ ...values, loginError: !correctValue });
    };
  };

  const handleLoginFocus = () => {
    setValues({ ...values, loginError: false, loginExists: false });
  };

  const handlePassword = (e) => {
    setValues({ ...values, password: e.target.value });
  };

  const handlePasswordBlur = () => {
    if (values.password) {
      const correctValue1 = (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(values.password));
      setValues({ ...values, passwordError: !correctValue1 });
    };
  };

  const handlePasswordFocus = () => {
    setValues({ ...values, passwordError: false });
  };

  const handleRepeatPassword = (e) => {
    setValues({ ...values, repeatPassword: e.target.value });
  };

  const handleRepeatPasswordBlur = () => {
    if (values.password !== values.repeatPassword && values.password && values.repeatPassword ) {
      setValues({ ...values, wrongRepeatPassword: true });
    } else {
      setValues({ ...values, wrongRepeatPassword: false });
    };
  };

  const handleRepeatPasswordfocus = () => {
    setValues({ ...values, wrongRepeatPassword: false });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const goToAuthor = () => {
      history.push('/author');
  };

  const funcRegistration = async () => {
    if (values.login
        && !values.loginError
        && !values.loginExists
        && values.password 
        && !values.passwordError
        && !values.wrongrRepeatPassword) {
        await axios.post('http://localhost:8000/addNewUser', {
          login: values.login,
          password: values.password
        }).then(res => history.push('/appoint'))
          .catch(err => setValues({ ...values, loginExists: true}))
    } if (values.login && !values.password) {
      alert('введите пароль');
    } if (!values.login && values.password) {
      alert('введите логин');
    };
  };

  return (
    <>
      <AppBar position='static' className='app'>
        <Toolbar className='myToolBar'>
          <IconButton edge='start' className='menuButton' aria-label='menu'>
            <img src={logo} alt='mainLo'/>
          </IconButton>
          <Typography className='title'>
            Зарегистрироваться в системе
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className='container'>
        <img src={bigLogo} alt='bigLogo' />
        <div className='registrationDiv'>
          <h1 className='containerh1'> Регистрация</h1>
          <div className='labelInput'>
             <label>Login:</label>
             <OutlinedInput
                className='input'
                placeholder='Login'
                id='login'
                type='text'
                value={values.login}
                onChange={(e) => handleChangLogin(e)}
                onBlur={() => handleLoginBlur()}
                onFocus={() => handleLoginFocus()}
              />
              {
                values.loginExists && 
                <Alert severity="error" className='myStyleError'> 
                  Пользователь с таким логином уже существует
                </Alert>
              }
              <Alert
                severity="error"
                className='myStyleError'
                style = {values.loginError ? {visibility: 'visible'} : {visibility: 'hidden'}}
              >   
                Логин может содержать символы латинского алфавита и цифры. Минимальная длина 6 
              </Alert>
          </div>
          <div className='labelInput'>
          <label>Password:</label>
          <OutlinedInput 
            className='input'
            placeholder='Password'
            id='password'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={(e) => handlePassword(e)}
            onBlur={() => handlePasswordBlur()}
            onFocus={() => handlePasswordFocus()}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
           <Alert
              severity="error"
              className='myStyleError'
              style = {values.passwordError ? {visibility: 'visible'} : {visibility: 'hidden'}}
            >   
              Пароль должен содержать минимум 6 символов латинского алфавита и минимум 1 цифру
            </Alert>
          </div>
          <div className='labelInput'>
            <label>Repeat password:</label>
            <OutlinedInput
              className='input'
              placeholder='Repeat password'
              id='repeatPassword'
              type={values.showPassword ? 'text' : 'password'}
              value={values.repeatPassword}
              onChange={(e) => handleRepeatPassword(e)}
              onBlur={() => handleRepeatPasswordBlur()}
              onFocus={() => handleRepeatPasswordfocus()}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Alert
              severity="error"
              className='myStyleError'
              style = {values.wrongRepeatPassword ? {visibility: 'visible'} : {visibility: 'hidden'}}
            >   
              Пароли должны совпадать!            
            </Alert>
          </div>
          <div className='registrationButtons'>
            <Button variant='outlined' onClick ={() => funcRegistration()}>
              Зарегистрироваться
            </Button>
            <Button onClick ={()=>goToAuthor()}>
              Авторизироваться
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
};

export default Registr;