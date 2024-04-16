import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./TablaReprobados.css";

const TablaReprobados = () => {
  const [reprobados, setReprobados] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const obtenerReprobados = async () => {
      try {
        const response = await axios.get('http://localhost:8080/calificaciones');
        const reprobadosData = response.data.filter(calif => calif.calificacion < 6);
        setReprobados(reprobadosData);
      } catch (error) {
        console.error('Error al obtener reprobados:', error);
      }
    };

    obtenerReprobados();
  }, []);

  const handleInputChange = (event) => {
    setFiltro(event.target.value);
  };

  const reprobadosFiltrados = reprobados.filter(reprobado =>
    reprobado.alumnoInfo.Nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    reprobado.materiaInfo.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="table-card">
      <div className="button-container">
      <Link to="/tabla-alumnos" className="button">Volver a la tabla de alumnos</Link>
      </div>
      <div className="table-container">
      <h2 className="table-title font-Ocean">Tabla De Reprobados</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar"
        value={filtro}
        onChange={handleInputChange}
        style={{borderRadius: '20px'}}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Materia</th>
            <th>Calificación</th>
          </tr>
        </thead>
        <tbody>
          {reprobadosFiltrados.map(reprobado => (
            <tr key={reprobado._id}>
              <td>{reprobado.alumnoInfo.Nombre}</td>
              <td>{reprobado.materiaInfo.nombre}</td>
              <td>{reprobado.calificacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default TablaReprobados;
