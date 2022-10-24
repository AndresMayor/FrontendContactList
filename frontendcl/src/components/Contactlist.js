
import '../styles/App.css';
import * as React from "react";
import List from "@mui/material/List";
import {get,post} from "../actions/HttpUtil";
import  { useState, useEffect } from 'react';
import Contact from './Contact';
import { Box,Button, TextField,Typography} from "@mui/material";


function ContactList(props) {

  const [listContacts, setListContacts] = useState([]);

  const [profile,setProfile] = useState(props.accountC.username);

  const [nombre,setNombre] =useState("");
  const [apellidos,setApellidos] =useState("");
  const [correo,setCorreo] =useState("");
  const [celular,setCelular] =useState("");
  const [direccion,setDireccion] =useState("");

  const [message,setMessage] = useState("");

  useEffect(() => {
    listContact();
  }, []);
 

  const listContact = async () => {
    const list = await post("/contacts/getList",{
      userId:props.accountC.id
    });
    if (!list.ok) {
        throw new Error(`Error! status: ${list.status}`);
    } else {
        const backResponse = await list.json();
        setListContacts(backResponse);
    }
};

const closeSesion = async () => {
  window.location.href = "/";
};

const addConctact = async () => {
  setMessage("");
  const addCont = await post("/contacts/addContact",{
    nombre:nombre,
    apellidos:apellidos,
    correo:correo,
    celular:celular,
    direccion:direccion,
    userId:props.accountC.id

  });
  if (!addCont.ok) {
      throw new Error(`Error! status: ${addCont.status}`);
  } else {
   
      const backResponse = await addCont.json();
   
      if(backResponse===true){
          setMessage("Contacto Agregado Exitosamente")

          listContact();
          setNombre("");
          setApellidos("");
          setCorreo("");
          setCelular("");
          setDireccion("");
      }else{
            setMessage(backResponse.errors[0].message)
      }
      
  }
};


  return (
   
    <Box sx={{ width:"100%" , height:"100%",}}>
  
        <Typography  color={'#0a4ae8'} > Hola: {profile} estos son tus contactos  </Typography>
          <Box>
          <br></br>
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                size="small"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value)
                }}
              />
          
        
              <TextField
                id="outlined-basic"
                label="Apellidos"
                variant="outlined"
                size="small"
                value={apellidos}
                onChange={(e) => {
                  setApellidos(e.target.value)
                }}
              />
              <TextField
                id="outlined-basic"
                label="Direccion"
                variant="outlined"
                size="small"
                value={direccion}
                onChange={(e) => {
                  setDireccion(e.target.value)
                }}
              />
               <TextField
                id="outlined-basic"
                label="Correo"
                variant="outlined"
                size="small"
                value={correo}
                onChange={(e) => {
                  setCorreo(e.target.value)
                }}
              />
            <TextField
                id="outlined-basic"
                label="Celular"
                variant="outlined"
                size="small"
                value={celular}
                onChange={(e) => {
                  setCelular(e.target.value)
                }}
              />
           
              <Button variant="contained" disableElevation onClick={addConctact} >
              Aregar
              </Button>
             </Box>
             <br></br>
             <Typography variant="subtitle1" color={"#BA0606"}>
          {message}
        </Typography>
      <Box sx={{ width:"100%" , height:"60%",overflow: 'auto'}}>
    
      <List dense={false}  >
      {listContacts.map((obj)=>{
      return <Contact contact={obj} key={obj.id} onDelete={()=>{listContact()}}/>;
        })}
      </List>
    </Box>
    <Button variant="contained" disableElevation onClick={closeSesion} >
          Cerrar Sesion
      </Button>
    </Box>
    

   
  );
}

export default ContactList;
