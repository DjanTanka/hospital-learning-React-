import React from 'react';
import '../components/Registr.scss'
import {
  AppBar,
  Toolbar,
  Typography
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

const Registr = () => {
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
  return (
    <>
      <AppBar position="static" className='app'>
        <Toolbar classname="myToolBar">
          <IconButton edge="start" className='menuButton' aria-label="menu">
            <img src={logo} />
          </IconButton>
          <Typography className='title'>
            Зарегистрироваться в системе
        </Typography>
        </Toolbar>
      </AppBar>
      <Container className='container'>
        <img src={bigLogo} width='375px' height='375px' />
        <div className='registrationDiv'>
          <h1 className='containerh1'> Регистрация</h1>
          <div className="labelInput">
             <label>Login:</label>
             <OutlinedInput
              className="input"
              placeholder="Login"
              id="outlined-adornment-password"
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
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
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
          <div className="labelInput">
          <label>Repeat password:</label>
          <OutlinedInput
            className="input"
            placeholder="Repeat password"
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
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
            <Button variant="outlined">Зарегистрироваться</Button>
            <Button>Авторизироваться</Button>
          </div>
        </div>
      </Container>
    </>
  )

};

export default Registr;