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
import './Author.scss';

const Author = () => {
  let history = useHistory();

  const [values, setValues] = useState({
    login: '',
    loginError: true,
    loginNotFound: false,
    password: '',
    passwordError: true,
    showPassword: false,
    noLogin: false,
    noPassword: false,
  });

  const { login,
    loginError,
    loginNotFound,
    password,
    passwordError,
    showPassword,
    noLogin,
    noPassword
  } = values;
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleChangeLogin = (e) => {
    setValues({ ...values, login: e.target.value });
  };

  const handleLoginBlur = () => {
    if (login) {
      const correctValue = (/^[A-Za-z0-9]{6,}$/.test(login));
      setValues({ ...values, loginError: !correctValue });
    };
  };

  const handleLoginFocus = () => {
    setValues({ ...values, loginError: false, loginNotFound: false, noLogin: false });
  };

  const handlePassword = (e) => {
    setValues({ ...values, password: e.target.value });
  };

  const handlePasswordBlur = () => {
    if (password) {
      const correctValue1 = (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password));
      setValues({ ...values, passwordError: !correctValue1 });
    };
  };

  const handlePasswordFocus = () => {
    setValues({ ...values, passwordError: false, noPassword: false });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !showPassword });
  };

  const goToRegistr = () => {
    history.push('/registr');
  };

  const funcAuthorization = async (values) => {
    if (!loginError && !passwordError) {
      await axios.post('http://localhost:8000/userEnter', {
        login: login,
        password: password
      }).then(res => {
          localStorage.setItem('userEntered', JSON.stringify(login)); 
          history.push('/appoint');
        })
        .catch(err => setValues({ ...values, loginNotFound: true}));
    } if (login && !password) {
      setValues({ ...values, noPassword: true });//alert('введите пароль');
    } if (!login && password) {
      setValues({ ...values, noLogin: true });//alert('введите логин');
    };
  };
  
  return(
    <div> 
      <AppBar position="static" className='my-app'>
        <Toolbar className="myToolBar">
          <IconButton edge="start" className='menu-button' aria-label="menu">
            <img src={logo} alt='mainLo'/>
          </IconButton>
          <Typography className='title'>
            Войти в систему
        </Typography>
        </Toolbar>
      </AppBar>
      <Container className='my-wrapper'>
        <img src={bigLogo} alt='bigLogo' />
        <div className='div-registration-author'>
          <h1 className='container-h1'> Войти в систему</h1>
          <div className="label-input">
            <label>Login:</label>
            <OutlinedInput
              className="input"
              placeholder="Login"
              id="login"
              value={login}
              onChange={(e) => handleChangeLogin(e)}
              onBlur={() => handleLoginBlur()}
              onFocus={() => handleLoginFocus()}
            />
             <Alert
                severity="error"
                className={`my-style-error ${!noLogin ? 'my-style-error-none' : ''}`}
              >
                Введите логин
            </Alert>
            {loginNotFound && 
              <Alert severity="error" className='my-style-error'> 
                Логин или пароль введены неверно
              </Alert>
            }
            <Alert
              severity="error"
              className={`my-style-error ${!loginError || !login ? 'my-style-error-none' : ''}`}
            >   
              Пароль должен состоять минимум из 6 символов латинского алфавита и содержать минимум 1 цифру
            </Alert>
          </div>
          <div className="label-input">
            <label>Password:</label>
            <OutlinedInput 
              className="input"
              placeholder="Password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => handlePassword(e)}
              onBlur={() => handlePasswordBlur()}
              onFocus={() => handlePasswordFocus()}
              endAdornment={
                <InputAdornment position="end" >
                  <IconButton
                    onClick={() => handleClickShowPassword()}
                    edge="end"
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
          <div className="registration-buttons">
            <Button 
              variant="outlined" 
              onClick ={() => funcAuthorization(values)}
            >
                Войти
            </Button>
            <Button onClick ={() => goToRegistr()}>Зарегистрироваться</Button>
          </div>
        </div>
      </Container>
    </div>
  )
};

export default Author;