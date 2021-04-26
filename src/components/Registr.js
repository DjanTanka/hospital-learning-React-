import React, { useState } from 'react';
import '../components/Registr.scss'
import { useHistory } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Snackbar,  
} from '@material-ui/core';
import logo from '../img/logo.png';
import bigLogo from '../img/bigLogo.png';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MuiAlert from '@material-ui/lab/Alert';


const Registr = () => {
  let history = useHistory();

  const [values, setValues] = useState({
    login: '',
    loginError: false,
    password: '',
    repeatPassword: '',
    rightRepeatPassword: false,
    showPassword: false,
  });

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    };
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const goToAuthor = () => {
    history.push('/author');
  };

  const funcLogin = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const funcLoginBlur = () => {
    if (/(?=.*[A-Za-z])(?=.*[0-9]){6,}/.test(values.login))
    {console.log("пр")
    setValues({ ...values, loginError: false });}
    else {
      setValues({ ...values, loginError: true });
      console.log(values.loginError)
    }
  }

  const funcPassword = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const funcRepeatPassword = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const funcRegistration = () => {
    (values.password !== values.repeatPassword)
      ? console.log ('не отправляю на сервер')
      : console.log('отправляю на сервер', values)
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
        <img src={bigLogo} width='375px' height='375px' alt='bigLogo' />
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
                onChange={funcLogin('login')}
                onBlur={funcLoginBlur}
              />
            {values.loginError && <Alert severity="error">неверный пароль!</Alert>}
          </div>
          <div className='labelInput'>
          <label>Password:</label>
          <OutlinedInput 
            className='input'
            placeholder='Password'
            id='password'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={funcPassword('password')}
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
          </div>
          <div className='labelInput'>
          <label>Repeat password:</label>
          <OutlinedInput
            className='input'
            placeholder='Repeat password'
            id='repeatPassword'
            type={values.showPassword ? 'text' : 'password'}
            value={values.repeatPassword}
            onChange={funcRepeatPassword('repeatPassword', 'repeatRepeatPassword')}
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
           {values.rightRepeatPassword && <Alert severity="error">Пароли должны совпадать!</Alert>}
          </div>
          <div className='registrationButtons'>
            <Button variant='outlined' onClick ={()=>funcRegistration()}>Зарегистрироваться</Button>
            <Button onClick ={()=>goToAuthor()}>Авторизироваться</Button>
          </div>
        </div>
      </Container>
    </>
  )

};

export default Registr;