import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TablaCalificaciones() {
  const [calificaciones, setCalificaciones] = useState([]);

  useEffect(() => {
    async function fetchCalificaciones() {
      try {
        const response = await fetch('http://localhost:8080/calificaciones');
        if (!response.ok) {
          throw new Error('Error al obtener las calificaciones');
        }
        const data = await response.json();
        setCalificaciones(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchCalificaciones();
  }, []);

  const groupCalificacionesByAlumno = () => {
    return calificaciones.reduce((acc, calificacion) => {
      const alumnoId = calificacion.alumnoInfo._id;
      if (!acc[alumnoId]) {
        acc[alumnoId] = [];
      }
      acc[alumnoId].push(calificacion);
      return acc;
    }, {});
  };

  return (
    <div className="tabla-calificaciones" style={{ margin: '10px auto' }}>
      <h2 className='titulo font-Ocean' style={{ textAlign: 'center', marginBottom: '10px', fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Tabla de Calificaciones</h2>
      <div className="table-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px' }}>
        {Object.keys(groupCalificacionesByAlumno()).map(alumnoId => (
          <div key={alumnoId} className="tabla-alumno" style={{ border: '1px solid #e2e8f0', borderRadius: '6px', boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease', backgroundColor: '#fff', overflow: 'hidden' }}>
            <div className="alumno-info" style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', borderRadius: '6px 6px 0 0', backgroundColor: '#f8fafc' }}>
              <h5 className="alumno-nombre" style={{ fontSize: '16px', fontWeight: 'bold', margin: '0' }}>
                {calificaciones.find(calificacion => calificacion.alumnoInfo._id === alumnoId).alumnoInfo.Nombre}
              </h5>
            </div>
            <div className="materias-container" style={{ padding: '10px' }}>
              {groupCalificacionesByAlumno()[alumnoId].map(calificacion => (
                <div key={calificacion._id} className="materia" style={{ marginBottom: '5px', padding: '5px', border: '1px solid #ccc', borderRadius: '6px', backgroundColor: '#f8fafc' }}>
                  <p style={{ margin: '0' }}>{calificacion.materiaInfo.nombre}: {calificacion.calificacion}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TablaCalificaciones;
