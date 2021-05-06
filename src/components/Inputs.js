import React from 'react';
import 'date-fns';
import { Container, 
  TextField,
  Button } from '@material-ui/core';
import './Inputs.scss';

const Inputs = () => {
  const currencies = [
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
 
  const [currency, setCurrency] = React.useState('EUR');
  const [selectedDate, setSelectedDate] = React.useState(new Date(''));
 
   const handleChange = (event) => {
    setCurrency(event.target.value);
  };
 
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
    return(
    <div>
      <Container className='my-wrapper-inputs'>
        <div className="label-input-inputs">
          <label>Имя:</label> 
          <TextField 
            className='input'
            type="text" 
            variant="outlined"
          />
        </div>
        <div className="label-input-inputs">
          <label>Врач:</label> 
          <TextField
            select
            value={currency}
            onChange={(e) => handleChange(e)}
            SelectProps={{
              native: true,
            }}
            variant="outlined"
          >
            {currencies.map((option) => (
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
            value={selectedDate}
          />
        </div>
        <div className="label-input-inputs">
          <label>Жалобы:</label> 
          <TextField id="outlined-search" 
            type="text" 
            variant="outlined"
            value={""}
          />
        </div>
        <div className="button">
            <Button 
              variant="outlined" 
            >
              Записаться
            </Button>
            
          </div>
      </Container>
    </div>
  );
};

export default Inputs;