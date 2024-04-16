import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className='font-Ocean'>BIENVENIDO A Consulta De Calificaciones</h1>
      <div className="buttons-container">
        <Link to="/login-admin" className="btn">Maestros</Link>
        <Link to="/login" className="btn">Alumnos</Link>
      </div>
    </div>
  );
}

export default Home;
