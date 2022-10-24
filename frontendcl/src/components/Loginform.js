
import * as React from 'react';
import '../styles/App.css';
import  { useState } from 'react';
import { post} from '../actions/HttpUtil';
import { Box, Button, TextField,Typography} from "@mui/material";
import RegisterForm from '../components/RegisterForm'

import { useNavigate } from "react-router-dom";

function LoginForm(props) {
    const [username,setUsername]= useState("");
    const [password,setPassword]= useState("");
    const [message,setMessage]= useState("");

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  

    const navigate = useNavigate();

    const navigateApproved = () => {
        navigate("/contactlist" , { replace: true });
      };
        

    const login = async () => {
        const login = await post("/login/access", {
            username: username,
            password:password
        }); 
        if (!login.ok) {
          throw new Error(`Error! status: ${login.status}`);
        } else {
          const backResponse = await login.json();
          props.account(backResponse[0])
            try{
                if(backResponse[0].username===username){
                   
                    navigateApproved();
                    
                    setMessage("ingresa")
                  }
            }catch(error){
                setMessage("Credenciales incorrectos")
               
            }
          
          
        }
       
      };
   


  return (

      <div className="cover">
          <h1>Login</h1>
          <Box>
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
            </Box>
            <Box>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </Box>
            <Button variant="contained" disableElevation onClick={login} >
           Login
          </Button>
          <Button variant="contained" disableElevation  onClick={handleClickOpen}>
           Registrarse
          </Button>
          {open&& <RegisterForm  setOpen={setOpen} message={setMessage}   /> }
          <Typography variant="subtitle1" color={"#BA0606"}>
          {message}
        </Typography>
      </div>

    
   
   
  );
}

export default LoginForm;
