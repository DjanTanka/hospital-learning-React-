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
    repeatPassword: '',
    rightRepeatPassword: false,
    showPassword: false,
  });
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleChangeLogin = (e) => {
    setValues({ ...values, login: e.target.value });
  };

  const handleLoginBlur = () => {
    if (values.login) {
      const correctValue = (/^[A-Za-z0-9]{6,}$/.test(values.login));
      setValues({ ...values, loginError: correctValue });
    };
  };

  const handleLoginFocus = () => {
    setValues({ ...values, loginError: true, loginNotFound: false });
  };

  const handlePassword = (e) => {
    setValues({ ...values, password: e.target.value });
  };

  const handlePasswordBlur = () => {
    if (values.password) {
      const correctValue1 = (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(values.password));
      setValues({ ...values, passwordError: correctValue1 });
    };
  };

  const handlePasswordFocus = () => {
    setValues({ ...values, passwordError: true });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const goToRegistr = () => {
    history.push('/registr');
  };

  const funcAuthorization = async (values) => {
    const {login, 
      loginError,
      password,
      passwordError,
    } = values;
    if (login
      &&loginError
      &&password
      &&passwordError) {
      await axios.post('http://localhost:8000/userEnter', {
        login: login,
        password: password
      }).then(res => history.push('/appoint'))
        .catch(err => setValues({ ...values, loginNotFound: true}))
    } if (login && !password) {
      alert('введите пароль');
    } if (!login && password) {
      alert('введите логин');
    };
  };
  
  return(
    <div> 
      <AppBar position="static" className='app'>
        <Toolbar className="myToolBar">
          <IconButton edge="start" className='menuButton' aria-label="menu">
            <img src={logo} alt='mainLo'/>
          </IconButton>
          <Typography className='title'>
            Войти в систему
        </Typography>
        </Toolbar>
      </AppBar>
      <Container className='container'>
        <img src={bigLogo} alt='bigLogo' />
        <div className='registrationDivAuthor'>
          <h1 className='containerh1'> Войти в систему</h1>
          <div className="labelInput">
            <label>Login:</label>
            <OutlinedInput
              className="input"
              placeholder="Login"
              id="login"
              value={values.login}
              onChange={(e) => handleChangeLogin(e)}
              onBlur={() => handleLoginBlur()}
              onFocus={() => handleLoginFocus()}
            />
            {
              values.loginNotFound && 
              <Alert severity="error" className='myStyleError'> 
                Логин или пароль введены неверно
              </Alert>
            }
            <Alert
              severity="error"
              className='myStyleError'
              style={{display: values.loginError ? 'none': 'flex' }}
            >   
              Пароль должен состоять минимум из 6 символов латинского алфавита и содержать минимум 1 цифру
            </Alert>
          </div>
          <div className="labelInput">
            <label>Password:</label>
            <OutlinedInput 
              className="input"
              placeholder="Password"
              id="password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={(e) => handlePassword(e)}
              onBlur={() => handlePasswordBlur()}
              onFocus={() => handlePasswordFocus()}
              endAdornment={
                <InputAdornment position="end" >
                  <IconButton
                    onClick={() => handleClickShowPassword()}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Alert
              severity="error"
              className='myStyleError'
              style = {{display: values.passwordError ? 'none' : 'flex', zIndex: "10"}}
            >   
              Пароль должен содержать минимум 6 символов латинского алфавита и минимум 1 цифру
            </Alert>
          </div>
          <div className="registrationButtons">
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