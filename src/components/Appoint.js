import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  // Container,
  IconButton,
  } from '@material-ui/core';
  import Inputs from './Inputs'
  import logo from '../img/logo.png';

const Appoint = () => {
  return(
    <div>
       <AppBar position="static" className='my-app'>
        <Toolbar variant="dense">
          <IconButton edge="start" >
            <img src={logo} />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Приемы
          </Typography>
        </Toolbar>
      </AppBar>
      <Inputs />
      
    </div>
  )
};

export default Appoint;