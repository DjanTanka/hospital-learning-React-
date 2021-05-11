import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  const allDoctors = [
    {
      value: '',
      label: '',
    },
    {
      value: 'Петр Петрович',
      label: 'Петр Петрович',
    },
    {
      value: 'Александр Александрович',
      label: 'Александр Александрович',
    },
    {
      value: 'Юрий Юрьевич',
      label: 'Юрий Юрьевич',
    },
    {
      value: 'Сергей Петрович',
      label: 'Сергей Петрович',
    },
  ];

  const getAppoints = async () => {
    await axios.get('http://localhost:8000/getAllAppoints')
      .then(res => {
        setAppoints(res.data.data);
      })
      .catch(err => console.log('что-то пошло не так...'));
  }

  useEffect(() => {
    if (!appoints.length) getAppoints();
  })

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
      <Inputs getAppoints={getAppoints} allDoctors={allDoctors}/>
      <Table 
        appoints={appoints} 
        getAppoints={getAppoints} 
        allDoctors={allDoctors}
      />
    </div>
  )
};

export default Appoint;