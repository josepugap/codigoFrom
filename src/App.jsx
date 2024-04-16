import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Componentes/Home/Home';
import Login from './Componentes/Login/Login';
import Admin from './Componentes/Admin/Admin';
import Registro from './Componentes/Registro/Registro';
import TablaAlumnos from './Componentes/TablaAlumnos/TablaAlumnos';
import TablaReprobados from './Componentes/TablaReprobados/TablaReprobados';
import Calificaciones from './Componentes/Calificaciones/Calificaciones';
import TablaCalificaciones from './Componentes/TablaCalificaciones/TablaCalificaciones';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/login-admin" element={<Admin/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/tabla-alumnos" element={<TablaAlumnos/>} />
        <Route path="/tabla-calificaciones" element={<TablaCalificaciones/>} />
        <Route path="/calificaciones" element={<Calificaciones/>} />
        <Route path="/tabla-reprobados" element={<TablaReprobados/>} />
      </Routes>
    </Router>
  );
}

export default App;
