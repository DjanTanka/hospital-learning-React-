import React, { useState } from 'react';
import {
  Container,
  withStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import 'date-fns';
import EditWidnow from '../EditWindow/EditWindow';
import DeleteWindow from '../DeleteWindow/DeleteWindow';
import './TableMine.scss';
import DeleteImg from '../../img/delete.svg';
import EditImg from '../../img/edit.svg';

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

const TableMine = (props) => {
  
  const {appointsSort, allDoctors } = props;
  // console.log('в TableMine', appointsSort)
  const [whatEdit, setWhatEdit] = useState([]);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  // const [openDateFilter, setOpenDateFilter] = useState(false);
  
  const handleClickEditAppoint = (index) => {
    setWhatEdit(appointsSort[index]);
    setOpenDialogEdit(true);
  };

  const handleClickDeleteAppoint = async (index) => {
    setWhatEdit(appointsSort[index]);
    setOpenDialogDelete(true);
  };

  const classes = useStyles();

  return (
    <div>
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
              {appointsSort.map((value, index) => (
                <StyledTableRow key={`row-${index}`}>
                  <StyledTableCell component="th" scope="row">
                    {value.fio}
                  </StyledTableCell>
                  <StyledTableCell align="right">{value.doctor}</StyledTableCell>
                  <StyledTableCell align="right">{value.date}</StyledTableCell>
                  <StyledTableCell align="right">{value.complaint}</StyledTableCell>
                  <StyledTableCell align="right">
                    <div className='conteiner-for-img'>
                      <img src={EditImg}
                        onClick={() => handleClickEditAppoint(index)}
                        alt='editImg'
                      />
                      <img src={DeleteImg}
                        onClick={() => handleClickDeleteAppoint(index)}
                        alt='deleteImg'
                      />
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {openDialogEdit &&
          <EditWidnow
            whatEdit={whatEdit}
            setOpenDialogEdit={setOpenDialogEdit}
            openDialogEdit={openDialogEdit}
            // getAppointsSort={getAppoints}
            allDoctors={allDoctors}
          />
        }
        {openDialogDelete &&
          <DeleteWindow
            whatEdit={whatEdit}
            openDialogDelete={openDialogDelete}
            setOpenDialogDelete={setOpenDialogDelete}
          //   getAppoints={getAppoints}
          />
        }
      </Container>
    </div>
  );
};

export default TableMine;