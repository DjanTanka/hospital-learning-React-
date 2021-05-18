import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  } from '@material-ui/core';
import Inputs from '../Inputs/Inputs';
import Sort from '../Sort/Sort';
import Filter from '../Filter/Filter';
import TableMine from '../TableMine/TableMine';
import logo from '../../img/logo.png';

const Appoint = () => {
  const [appoints, setAppoints] = useState([]);
  const [appointsSort, setAppointsSort] = useState([]);
  const [openDateFilter, setOpenDateFilter] = useState(false)
 
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

  const getAppoints = () => {
    axios.get('http://localhost:8000/getAllAppoints')
      .then(res => {
        setAppoints(res.data.data)       
      })
      .catch(err => console.log('что-то пошло не так...'));
  }

  useEffect(() => {
        getAppoints();
  },[])

  useEffect(()=>{
    setAppointsSort(appoints)
  },[appoints])

  // useEffect(()=>{console.log("appointsSort",appointsSort);},[appointsSort

  // ])

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
      <Inputs getAppoints={getAppoints} allDoctors={allDoctors} appoints={appoints} setAppoints/>
      <Sort
        appointsSort={appointsSort}
        appoints={appoints}
        setAppointsSort={setAppointsSort}
        getAppoints={getAppoints} 
        setOpenDateFilter={setOpenDateFilter}
      />
      {openDateFilter &&
        <Filter
          appoints={appoints}
          setAppointsSort={setAppointsSort}
          setOpenDateFilter={setOpenDateFilter}
        />
      }
      <TableMine 
        appointsSort={appointsSort} 
        getAppoints={getAppoints} 
        allDoctors={allDoctors}
        setAppoints={setAppoints}
      />
    </div>
  )
};

export default Appoint;
