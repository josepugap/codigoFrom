import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Calificaciones.css';

const Calificaciones = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [alumnoId, setAlumnoId] = useState('');
  const [materiaId, setMateriaId] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    obtenerAlumnos();
    obtenerMaterias();
  }, []);

  const obtenerAlumnos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/ObtenerAlumnos');
      setAlumnos(response.data);
    } catch (error) {
      console.error('Error al obtener alumnos:', error);
    }
  };

  const obtenerMaterias = async () => {
    try {
      const response = await axios.get('http://localhost:8080/materias');
      setMaterias(response.data);
    } catch (error) {
      console.error('Error al obtener materias:', error);
    }
  };

  const agregarCalificacion = async () => {
    try {
      await axios.post('http://localhost:8080/calificaciones', {
        alumnoId,
        materiaid: materiaId,
        calificacion
      });
      setAlumnoId('');
      setMateriaId('');
      setCalificacion('');
      setMensaje('Calificación agregada con éxito');
      window.location.href = '/tabla-alumnos';
    } catch (error) {
      console.error('Error al agregar calificación:', error);
    }
  };

  return (
    <div className="calificaciones-container">
      <div>
        <label>Alumno:</label>
        <select value={alumnoId} onChange={(e) => setAlumnoId(e.target.value)}>
          <option value="">Seleccionar alumno...</option>
          {alumnos.map(alumno => (
            <option key={alumno._id} value={alumno._id}>{alumno.Nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Materia:</label>
        <select value={materiaId} onChange={(e) => setMateriaId(e.target.value)}>
          <option value="">Seleccionar materia...</option>
          {materias.map(materia => (
            <option key={materia._id} value={materia._id}>{materia.nombre}</option>
          ))}
        </select>
      </div>
      <div>
  <label>Calificación:</label>
  <input 
    type="number" 
    value={calificacion} 
    min="5" 
    max="10" 
    onChange={(e) => {
      const newValue = Math.min(Math.max(e.target.value, 5), 10);
      setCalificacion(newValue);
    }} 
  />
</div>
      <button onClick={agregarCalificacion}>Agregar Calificación</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Calificaciones;
