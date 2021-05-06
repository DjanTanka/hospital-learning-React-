import React from 'react';
import 'date-fns';
import { Container, 
  TextField,
  Button } from '@material-ui/core';
import './Table.scss';

const Inputs = (props) => {
  const {appoints} = props
  console.log(appoints.data[4].fio)
  return(
  <div>
    <Container className='my-wrapper-table'>
      {
        appoints.data.map((value) => (
          <p>
            {value.fio}
          </p>
        ))
      }
    </Container>
  </div>
  );
};

export default Inputs;