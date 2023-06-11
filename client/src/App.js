import React from 'react';
import { Navbar } from './components/Navbar';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { Home } from "./pages/Home";
import { AddContact } from "./pages/AddContact";
import { ViewContact } from "./pages/ViewContact";
import { EditContact } from "./pages/EditContact";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import './App.css';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/:accountID/contacts' element={<Home />} />
        <Route exact path='/:accountID/contacts/addContact' element={<AddContact />} />
        <Route exact path='/:accountID/contacts/:contactID' element={<ViewContact />} />
        <Route exact path='/:accountID/contacts/:contactID/edit' element={<EditContact />} />
      </Routes>
    </div>
  );
}

export default App;
