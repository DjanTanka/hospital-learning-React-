import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent, 
  DialogContentText,
  DialogTitle } from '@material-ui/core';


const EditWidnow = (props) => {
  const {
    whatEdit,
    setOpenDialogEdit,
    openDialogEdit,
    getAppoints,
    allDoctors
  } = props;

  const { 
    _id, 
    fio, 
    doctor, 
    date, 
    complaint 
  } = whatEdit;

  const [editFio, setEditFio] = useState(fio);
  const [editDoctor, setEditDoctor] = useState(doctor);
  const [editDate, setEditDate] = useState(date);
  const [editComplaint, setEditComplaint] = useState(complaint);

  const handleChangeAppoint = (e, type) => {
    if (type === 'editFio'){ setEditFio(e.target.value)}
    if (type === 'editDoctor') { setEditDoctor(e.target.value)}
    if (type === 'editDate') {setEditDate(e.target.value)}
    if (type === 'editComplaint') {setEditComplaint(e.target.value)}
  };

  const handleClose = () => {
    setOpenDialogEdit(false);
  };

  const handleSubscribe = async () => {
    await axios.put(`http://localhost:8000/editAppoint?_id=${_id}`, {
      fio: editFio,
      doctor: editDoctor,
      date: editDate,
      complaint: editComplaint
    }).then(res => { getAppoints() })
      .catch(err => console.log(err));
    setOpenDialogEdit(false);
  };

  return (
    <div>
      <Dialog open={openDialogEdit}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Изменить прием</DialogTitle>
        <DialogContent>
          <DialogContentText>ФИО:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="editFio"
            type="text"
            value={editFio}
            variant="outlined"
            fullWidth
            onChange={(e) => handleChangeAppoint(e, 'editFio')}
          />
          <DialogContentText>Доктор:</DialogContentText>
          <TextField
            select
            margin="dense"
            id="editDoctor"
            type="text"
            value={editDoctor}
            onChange={(e) => handleChangeAppoint(e, 'editDoctor')}
            variant="outlined"
            fullWidth
            SelectProps={{
              native: true,
            }}>
            {allDoctors.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <DialogContentText>Дата:</DialogContentText>
          <TextField
            margin="dense"
            id="editDate"
            type="date"
            value={editDate}
            variant="outlined"
            fullWidth
            onChange={(e) => handleChangeAppoint(e, 'editDate')}
          />
          <DialogContentText>Жалобы:</DialogContentText>
          <TextField
            margin="dense"
            id="editComplaint"
            type="text"
            value={editComplaint}
            variant="outlined"
            fullWidth
            onChange={(e) => handleChangeAppoint(e, 'editComplaint')}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose()}
            color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSubscribe()} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  )
}

export default EditWidnow;