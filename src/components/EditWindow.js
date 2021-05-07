import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const EditWidnow = (props) => {
  console.log(props)
  const { whatEdit, setOpenDialog, openDialog} = props;
  const {fio, doctor, date, complaint } = whatEdit;
  console.log(props)
  
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubscribe = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Изменить прием</DialogTitle>
        <DialogContent>
          <DialogContentText>ФИО:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            value={fio}
            variant="outlined"
            fullWidth
          />
          <DialogContentText>Доктор:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            value={doctor}
            variant="outlined"
            fullWidth
          />
          <DialogContentText>Дата:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="date"
            value={date}
            variant="outlined"
            fullWidth
          />
          <DialogContentText>Жалобы:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            value={complaint}
            variant="outlined"
            fullWidth
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