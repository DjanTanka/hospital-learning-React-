import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  } from '@material-ui/core';
import Inputs from './Inputs';
import Table from './Table'
import logo from '../img/logo.png';

const Appoint = () => {
  const [appoints, setAppoints] = useState([]);
  return(
    <div>
       <AppBar position="static" className='my-app'>
        <Toolbar variant="dense">
          <IconButton edge="start" >
            <img src={logo} alt='smallLogo'/>
          </IconButton>
          <Typography variant="h6" color="inherit">
            Приемы
          </Typography>
        </Toolbar>
      </AppBar>
      <Inputs setAppoints={setAppoints}/>
      {/* <Inputs/> */}
      <Table appoints={appoints}/>
      
    </div>
  )
};

export default Appoint;