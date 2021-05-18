import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import 'date-fns';
import AddFilter from '../../img/addFilter.svg';
// import { ContactlessOutlined } from '@material-ui/icons';

const Sort = ({appoints, setAppointsSort, setOpenDateFilter }) => {
  
  const menuSort = [
    {
      value: '',
      label: '',
    },
    {
      value: 'fio',
      label: 'ФИО',
    },
    {
      value: 'doctor',
      label: 'Врач',
    },
    {
      value: 'date',
      label: 'Дата',
    },
    {
      value: 'complaint',
      label: 'Жалобы',
    },
  ];
  const directSort = [
    {
      value: 'asc',
      label: 'По возрастанию',
    },
    {
      value: 'desc',
      label: 'По убыванию',
    },
  ];

  const [itemMenuSort, setItemMenuSort] = useState(menuSort[0].label);
  const [openDirectSort, setOpenDirectSort] = useState(false);
  const [chosenDirectSort, setChosenDirectSort] = useState('')
  const [direct, setDirect] = useState('asc');
     
  const handleMenuSortChange = (e) => {  
    setOpenDirectSort(true);
    setItemMenuSort(e.target.value);
    sortAppoints(e.target.value);
    sortAppoints(direct)
    if (e.target.value === '') {
      setOpenDirectSort(false);
      setOpenDateFilter(false);
    }
  };

  const handleDirectChange = (e) => {
    setChosenDirectSort(e.target.value);
    setDirect(e.target.value);
    sortAppoints(direct);
  };

  const sortAppoints = (field) => {
    if (direct === 'asc') {
      let appointsAsc = appoints.sort((a, b) => a[field] < b[field] ? 1 : -1);
      setAppointsSort([...appointsAsc])
    }
    if (direct === 'desc') {
      let appointsDesc = appoints.sort((a, b) => a[field] > b[field] ? 1 : -1);
      setAppointsSort([...appointsDesc])
    }
  };

  const handleDateFilterOpen = () => {
    setOpenDateFilter(true);
    //   if (type === 'close') {
    //     // getAppoints()
    //     sortAppoints(direct)
    //     console.log(' в handleDateFilter', appoints)
    // }
  };
 
  return (
    <div className='sort-filter-div'>
      <h3>Сортировать по: </h3>
      <TextField
        select
        value={itemMenuSort}
        SelectProps={{
          native: true,
        }}
        variant="outlined"
        onChange={(e) => handleMenuSortChange(e)}
      >
        {menuSort.map((option) => (
          <option key={option.value} value={option.value} >
            {option.label}
          </option>
        ))}
      </TextField>
      {openDirectSort &&
        <div className='div-sort'>
          <TextField
            select
            value={chosenDirectSort}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
            onChange={(e) => handleDirectChange(e)}
          >
            {directSort.map((option) => (
              <option key={option.value} value={option.value} >
                {option.label}
              </option>
            ))}
          </TextField>
          <div className='div-add-date-filter'>
        <p>Добавить фильтр по дате: </p>
        <img src={AddFilter}
          alt='addFilter'
          onClick={() => handleDateFilterOpen()}
        />
      </div>
        </div>
      }
    </div>
    
  )
}

export default Sort;