import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditWidnow = (props) => {
  const { whatEdit,
    setOpenDialogEdit,
    openDialogEdit,
    getAppoints,
    allDoctors
  } = props;

  const { _id, fio, doctor, date, complaint } = whatEdit;

  const [editFio, setEditFio] = useState(fio);
  const [editDoctor, setEditDoctor] = useState(doctor);
  const [editDate, setEditDate] = useState(date);
  const [editComplaint, setEditComplaint] = useState(complaint);

  const handleEditFioChange = (e) => {
    setEditFio(e.target.value);
  };

  const handleEditDoctorChange = (e) => {
    setEditDoctor(e.target.value)
  };

  const handleEditDateChange = (e) => {
    setEditDate(e.target.value)
  };

  const handleEditComplaintChange = (e) => {
    setEditComplaint(e.target.value)
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
      .catch(err => console.log('что-то пошло не так'));
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
            onChange={(e) => handleEditFioChange(e)}
          />
          <DialogContentText>Доктор:</DialogContentText>
          <TextField
            select
            margin="dense"
            id="editDoctor"
            type="text"
            value={editDoctor}
            onChange={(e) => handleEditDoctorChange(e)}
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
            onChange={(e) => handleEditDateChange(e)}
          />
          <DialogContentText>Жалобы:</DialogContentText>
          <TextField
            margin="dense"
            id="editComplaint"
            type="text"
            value={editComplaint}
            variant="outlined"
            fullWidth
            onChange={(e) => handleEditComplaintChange(e)}
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