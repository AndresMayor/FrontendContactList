import * as React from 'react';
import '../styles/App.css';
import LoginForm from '../components/Loginform';
import { Routes, Route } from "react-router-dom";
import  { useState } from 'react';

import ContactList from  "../components/Contactlist";


function App() {

const [account,setAccount]=useState("");

  return (

    <div className="page">
    
      <Routes>
        <Route  index element={<LoginForm account={setAccount} /> } />
        <Route exact={true} path="/contactlist" element={<ContactList accountC={account} />} />
      </Routes>
  
    </div>
    
  );
}

export default App;
