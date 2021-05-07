import React, { useState } from 'react';
import 'date-fns';
import { Container, 
  TextField,
  Button } from '@material-ui/core';
import './Inputs.scss';
import axios from 'axios';

const Inputs = (props) => {
  
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
  ];

  let dateTemp2 = null;
  let firstDate = null;
  let dateTemp = new Date().toLocaleDateString();
  dateTemp2 = dateTemp.split(".");
  dateTemp2 = dateTemp2[2] + "-" + dateTemp2[1] + "-" + dateTemp2[0];
  firstDate = dateTemp2;

  const [values, setValues] = useState({
    fio: '',
    doctor:'',
    date: firstDate,
    complaint: ''
  });

  const {
    fio,
    doctor,
    date,
    complaint
  } = values;

  const handleFioChange = (e) => {
    setValues({...values, fio: e.target.value});
  };
 
  const handleDateChange = (e) => {
    setValues({...values, date: e.target.value});
  };
  
  const handleDoctorChange = (e) => {
    setValues({...values, doctor: e.target.value});
  }

  const handleComplaintChange = (e) => {
    setValues({...values, complaint: e.target.value});
  }

  const handleClick = async () => {
    await axios.post('http://localhost:8000/addNewAppoint', {
      fio: fio,
      doctor: doctor,
      date: date,
      complaint: complaint
      }).then(res => { props.setAppoints()})
        .catch(err => console.log('что-то пошло не так'));
      setValues({...values, fio: '', doctor: '', date: firstDate, complaint: '' });
  }

  return(
    <div>
      <Container className='my-wrapper-inputs'>
        <div className="label-input-inputs">
          <label>ФИО:</label> 
          <TextField 
            className='input'
            type="text" 
            variant="outlined"
            value={fio}
            onChange={(e) => handleFioChange(e)}
          />
        </div>
        <div className="label-input-inputs">
          <label>Врач:</label> 
          <TextField
            select
            value={doctor}
            onChange={(e) => handleDoctorChange(e)}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            {allDoctors.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>
        <div className="label-input-inputs">
          <label>Дата:</label> 
          <TextField id="outlined-search" 
            type="date" 
            variant="outlined"
            value={date}
            onChange={(e) => handleDateChange(e)}
          />
        </div>
        <div className="label-input-inputs">
          <label>Жалобы:</label> 
          <TextField id="outlined-search" 
            type="text" 
            variant="outlined"
            value={complaint}
            onChange={(e) => handleComplaintChange(e)}
          />
        </div>
        <div className="button">
            <Button 
              variant="outlined"
              onClick={() => handleClick()} 
            >
              Записаться
            </Button>
          </div>
      </Container>
    </div>
  );
};

export default Inputs;