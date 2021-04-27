import React from 'react';
import  { useHistory } from 'react-router-dom'
import '../components/Author.scss'
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import logo from '../img/logo.png';
import Container from '@material-ui/core/Container';
import bigLogo from '../img/bigLogo.png';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

const Author = () => {
  let history = useHistory();

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const goToRegistr = () => {
    history.push('/registr');
  }
 
  return(
    <> <AppBar position="static" className='app'>
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
    <img src={bigLogo} width='30%' alt='bigLogo' />
    <div className='registrationDiv'>
      <h1 className='containerh1'> Войти в систему</h1>
      <div className="labelInput">
         <label>Login:</label>
         <OutlinedInput
          className="input"
          placeholder="Login"
          id="login"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          />
      </div>
      <div className="labelInput">
      <label>Password:</label>
      <OutlinedInput 
        className="input"
        placeholder="Password"
        id="password"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end" >
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      </div>
      <div className="registrationButtons">
        <Button variant="outlined">Войти</Button>
        <Button onClick ={()=>goToRegistr()}>Зарегистрироваться</Button>
      </div>
    </div>
  </Container></>
  )
};

export default Author;