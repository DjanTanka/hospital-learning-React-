import React, { useState } from 'react';
import {
  TextField,
  Button
} from '@material-ui/core';
import DeleteImg from '../../img/delete.svg'
import '../Filter/Filter.scss'

const Filter = ({appoints, setAppointsSort, setOpenDateFilter }) => {
  
  const [datefilterFrom, setDatefilterFrom] = useState('')
  const [datefilterTo, setDatefilterTo] = useState('')
 
  const filterAppoints = () => {
    let fillterAppoints = appoints.filter( val => {
      return val.date >= datefilterFrom && val.date <= datefilterTo 
    });
    setAppointsSort(fillterAppoints);
  };

  const handleDateRange = (e, type) => {
    if (type === 'from') {
      setDatefilterFrom(e.target.value)
    }
    if (type === 'to') {
      setDatefilterTo(e.target.value)
    }
  };

  const handleDateFilterClose = () => {
    setOpenDateFilter(false)
  }

  return (
    <div>
      <div className='div-input-date-filter'>
        <label>c:</label>
        <TextField
          type='date'
          value={datefilterFrom}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
          onChange={(e) => handleDateRange(e, 'from')}
        >
        </TextField>
        <label>по:</label>
        <TextField
          type='date'
          value={datefilterTo}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
          onChange={(e) => handleDateRange(e, 'to')}
        >
        </TextField>
        <Button
          variant="outlined"
          onClick={() => filterAppoints()}
        >
          Фильтровать
          </Button>
        <img 
          src={DeleteImg} 
          alt='deleteImg' 
          onClick={() => handleDateFilterClose()} />
      </div>
      
    </div>
  )
}

export default Filter;
