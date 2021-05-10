import React, { useState } from 'react';
import 'date-fns';
import {
  Container,
  TextField,
  Button
} from '@material-ui/core';
import './Table.scss';
import EditWidnow from './EditWindow'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteImg from '../img/delete.svg'
import DoneImg from '../img/done.svg'
import EditImg from '../img/edit.svg'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Inputs = ({ appoints, getAppoints }) => {
  const [whatEdit, setWhatEdit] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickEditAppoint = (index) => {
    setWhatEdit(appoints[index]); 
    setOpenDialog(true);
  }

  // handleClickDoneImg
  // handleClickDeletImg
  const classes = useStyles();
  return (
    <div >
      <Container className='my-wrapper-table'>
        <TableContainer component={Paper} className='my-table'>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ФИО:</StyledTableCell>
                <StyledTableCell align="right">Врач</StyledTableCell>
                <StyledTableCell align="right">Дата</StyledTableCell>
                <StyledTableCell align="right">Жалобы</StyledTableCell>
                <StyledTableCell align="right"> </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appoints.map((value, index) => (
                <StyledTableRow key = {`row-${index}`}>
                  <StyledTableCell component="th" scope="row">
                    {value.fio}
                  </StyledTableCell>
                  <StyledTableCell align="right">{value.doctor}</StyledTableCell>
                  <StyledTableCell align="right">{value.date}</StyledTableCell>
                  <StyledTableCell align="right">{value.complaint}</StyledTableCell>
                  <StyledTableCell align="right">
                    <div className='conteiner-for-img'>
                      <img src ={EditImg}
                        onClick = {() => handleClickEditAppoint(index)}
                      /> 
                      <img src ={DoneImg}
                        // onClick = {() => handleClickDoneImg()}
                      />
                      <img src ={DeleteImg}
                        // onClick = {() => handleClickDeletImg()}
                      />
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {openDialog && <EditWidnow whatEdit = {whatEdit} setWhatEdit={setWhatEdit} setOpenDialog={setOpenDialog} openDialog={openDialog} getAppoints={getAppoints}/>}
      </Container>
    </div>
  );
};

export default Inputs;