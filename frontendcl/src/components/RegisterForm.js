import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import  { useState } from 'react';
import { post} from '../actions/HttpUtil';

export default function RegisterForm(props) {

  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const accept = async () => {
    
    const createUser = await post("/login/create", {
        username: username,
        password:password
    }); 
    if (!createUser.ok) {
      throw new Error(`Error! status: ${createUser.status}`);
    } else {
      const backResponse = await createUser.json();
      console.log(backResponse);
      setOpen(false);
      props.setOpen(false);
      props.message("Registro Exitoso");
      
    }
    
   
  };

  const handleClose = () => {
    setOpen(false);
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Registar Usuario
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            variant="standard"
            onChange={(e) => {
                  setUsername(e.target.value)
                }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => {
                  setPassword(e.target.value)
                }}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={accept}>Registar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
