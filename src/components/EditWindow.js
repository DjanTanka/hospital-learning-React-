import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';


const EditWidnow = (props) => {
  const { whatEdit, setWhatEdit, setOpenDialog, openDialog, getAppoints} = props;
  const {_id, fio, doctor, date, complaint } = whatEdit;

  const [editFio, setEditFio] = useState(fio)
 
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleFioEditChange = (e) => {
    setEditFio(e.target.value);   
  }

  const handleSubscribe = async() => {
    console.log('handleSubscribe')
    await axios.put(`http://localhost:8000/editAppoint?_id=${_id}`, {
      fio: editFio,
      doctor: doctor,
      date: date,
      complaint: complaint
      }).then(res => {getAppoints()})
        .catch(err => console.log('что-то пошло не так'));
    setOpenDialog(false);
  }
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
            value={editFio}
            variant="outlined"
            fullWidth
            onChange={(e) => handleFioEditChange(e)}
          />
          <DialogContentText>Доктор:</DialogContentText>
          <TextField
            margin="dense"
            id="name"
            type="text"
            value={doctor}
            variant="outlined"
            fullWidth
          />
          <DialogContentText>Дата:</DialogContentText>
          <TextField
            margin="dense"
            id="name"
            type="date"
            value={date}
            variant="outlined"
            fullWidth
          />
          <DialogContentText>Жалобы:</DialogContentText>
          <TextField
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