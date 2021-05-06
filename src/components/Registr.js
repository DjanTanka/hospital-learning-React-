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
    loginError: true,
    loginExists: false,
    password: '',
    passwordError: true,
    repeatPassword: '',
    wrongRepeatPassword: false,
    showPassword: false,
    noLogin: false,
    noPassword: false,
    noReapeatPassword: false
  });

  const { login,
    loginError,
    loginExists,
    password,
    repeatPassword,
    passwordError,
    wrongRepeatPassword,
    showPassword,
    noLogin,
    noPassword,
    noRepeatPassword
  } = values;

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleChangLogin = (e) => {
    setValues({ ...values, login: e.target.value });
  };

  const handleLoginBlur = () => {
    if (login) {
      const correctValue = (/^[A-Za-z0-9]{6,}$/.test(login));
      setValues({ ...values, loginError: !correctValue, noLogin: !correctValue });
    };
  };

  const handleLoginFocus = () => {
    setValues({ ...values, loginError: false, loginExists: false, noLogin: false});
  };

  const handlePassword = (e) => {
    setValues({ ...values, password: e.target.value });
  };

  const handlePasswordBlur = () => {
    if (password) {
      const correctValue1 = (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password));
      setValues({ ...values, passwordError: !correctValue1, noPassword: !correctValue1 });
    };
  };

  const handlePasswordFocus = () => {
    setValues({ ...values, passwordError: false, noPassword: false });
  };

  const handleRepeatPassword = (e) => {
    setValues({ ...values, repeatPassword: e.target.value });
  };

  const handleRepeatPasswordBlur = () => {
    (password !== repeatPassword
      && password
      && repeatPassword)
        ? setValues({ ...values, wrongRepeatPassword: true })
        : setValues({ ...values, wrongRepeatPassword: false })
  };

  const handleRepeatPasswordfocus = () => {
    setValues({ ...values, wrongRepeatPassword: false, noRepeatPassword: false });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !showPassword });
  };

  const goToAuthor = () => {
    history.push('/author');
  };

  const funcRegistration = async (values) => {
    if (!loginError
        && !loginExists
        && repeatPassword
        && !passwordError
        && !wrongRepeatPassword) {
      await axios.post('http://localhost:8000/addNewUser', {
        login: login,
        password: password
      }).then(res => { 
          localStorage.setItem('userEntered', JSON.stringify(login));
          history.push('/appoint');
        })
        .catch(err => setValues({ ...values, loginExists: true }));
    } if (login && !password) {
      setValues({ ...values, noPassword: true });
    } if (!login && password) {
      setValues({ ...values, noLogin: true });
    } if (!repeatPassword && password) {
      setValues({ ...values, noRepeatPassword: true });
    }
  };

  return (
    <div>
      <AppBar position="static" className='my-app'>
        <Toolbar variant="dense">
          <IconButton edge="start" >
            <img src={logo} />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Зарегистрироваться в системе
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className='my-wrapper'>
        <img src={bigLogo} className='my-big-logo' alt='bigLogo' />
        <div className='div-registration'>
          <h1 className='container-h1'> Регистрация</h1>
          <div className='label-input'>
            <label>Login:</label>
            <OutlinedInput
              className='input'
              placeholder='Login'
              id='login'
              type='text'
              value={login}
              onChange={(e) => handleChangLogin(e)}
              onBlur={() => handleLoginBlur()}
              onFocus={() => handleLoginFocus()}
            />
            {loginExists &&
              <Alert severity="error" className='my-style-error'>
                Пользователь с таким логином уже существует
              </Alert>
            }
            <Alert
              severity="error"
              className={`my-style-error ${!loginError || !login ? 'my-style-error-none' : ''}`}
            >
              Логин может содержать символы латинского алфавита и цифры. Минимальная длина 6
            </Alert>
            <Alert
                severity="error"
                className={`my-style-error ${!noLogin ? 'my-style-error-none' : ''}`}
              >
                Введите логин
            </Alert>
          </div>
          <div className='label-input'>
            <label>Password:</label>
            <OutlinedInput
              className='input'
              placeholder='Password'
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handlePassword(e)}
              onBlur={() => handlePasswordBlur()}
              onFocus={() => handlePasswordFocus()}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Alert
              severity="error"
              className={`my-style-error ${!password || !passwordError ? 'my-style-error-none' : ''}`}
            >
              Пароль должен содержать минимум 6 символов латинского алфавита и минимум 1 цифру
            </Alert>
            <Alert
                severity="error"
                className={`my-style-error ${!noPassword ? 'my-style-error-none' : ''}`}
              >
                Введите пароль
            </Alert>
          </div>
          <div className='label-input'>
            <label>Repeat password:</label>
            <OutlinedInput
              className='input'
              placeholder='Repeat password'
              id='repeatPassword'
              type={showPassword ? 'text' : 'password'}
              value={repeatPassword}
              onChange={(e) => handleRepeatPassword(e)}
              onBlur={() => handleRepeatPasswordBlur()}
              onFocus={() => handleRepeatPasswordfocus()}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => handleClickShowPassword}
                    edge='end'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Alert
              severity="error"
              className={`my-style-error ${!wrongRepeatPassword ? 'my-style-error-none' : ''}`}
            >
              Пароли должны совпадать!
            </Alert>
            <Alert
                severity="error"
                className={`my-style-error ${!noRepeatPassword ? 'my-style-error-none' : ''}`}
              >
                Необходимо повторить пароль
            </Alert>
          </div>
          <div className='registration-buttons'>
            <Button variant='outlined' onClick={() => funcRegistration(values)}>
              Зарегистрироваться
            </Button>
            <Button onClick={() => goToAuthor()}>
              Авторизироваться
           </Button>
          </div>
        </div>
      </Container>
    </div>
  )
};

export default Registr;