import * as React from 'react';
import '../styles/App.css';
import  { useState } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import {deletee, get,post, patch} from "../actions/HttpUtil";
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Contact(props) {

  const obj = props.contact;
  const [open, setOpen] = useState(false);
  
  const [newName,setNewName]=useState(obj.nombre);
  const [newLastName,setNewLastName]=useState(obj.apellidos);
  const [newDirection,setNewDirection]=useState(obj.direccion);
  const [newEmail,setNewEmail]=useState(obj.correo);
  const [newPhone,setNewPhone]=useState(obj.celular);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

 



const onDeleteContact = async () => {
 
    const deleteConctact = await deletee("/contacts/delete",{
        id:obj.id
    });
    if (!deleteConctact.ok) {
        throw new Error(`Error! status: ${deleteConctact.status}`);
    } else {
        const backResponse = await deleteConctact.json();
        console.log(backResponse)
        props.onDelete();
    }
  };

  const onUpdateContact = async () => {
 
    const update = await patch("/contacts/update",{
      nombre: newName,
      apellidos:newLastName,
      correo: newEmail,
      celular: newPhone,
      direccion: newDirection,
      id:obj.id
    });
    if (!update.ok) {
        throw new Error(`Error! status: ${update.status}`);
    } else {
        props.onDelete();
        handleClose();
    }
  };






  return (
<div>
    <ListItem
    secondaryAction={
      <div>
      <IconButton edge="end" aria-label="update" onClick={handleClickOpen} >
        <EditIcon />
      </IconButton>
     
      <IconButton edge="end" aria-label="delete" onClick={()=>{onDeleteContact()} } >
        <DeleteIcon  />
      </IconButton>
      
      </div>
    }
    
  

  >
    <ListItemAvatar>
      <Avatar>
        <FolderIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={`${obj.nombre}  ${obj.apellidos}  ${obj.direccion}  ${obj.correo}`}
      secondary={ obj.celular}
    />
  </ListItem>

  <div>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>UpdateContact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Actualizar Contacto
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            value={newName}
            variant="standard"
            onChange={(e) => {
                  setNewName(e.target.value)
                }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Apellidos"
            fullWidth
            value={newLastName}
            variant="standard"
            onChange={(e) => {
                  setNewLastName(e.target.value)
                }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Direccion"
            fullWidth
            value={newDirection}
            variant="standard"
            onChange={(e) => {
                  setNewDirection(e.target.value)
                }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Correo"
            fullWidth
            type="email"
            value={newEmail}
            variant="standard"
            onChange={(e) => {
                  setNewEmail(e.target.value)
                }}
          />
            <TextField
            autoFocus
            margin="dense"
            label="Celular"
            fullWidth
            value={newPhone}
            variant="standard"
            onChange={(e) => {
                  setNewPhone(e.target.value)
                }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onUpdateContact}>Actualizar</Button>
        </DialogActions>
      </Dialog>
    </div>
  
  </div>
    
  );
}

export default Contact;
