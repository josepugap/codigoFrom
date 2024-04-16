import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./TablaAlumnos.css"

function TablaAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [calificacionesModalOpen, setCalificacionesModalOpen] = useState(false); 
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [nuevaEdad, setNuevaEdad] = useState('');
  const [calificaciones, setCalificaciones] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function fetchAlumnos() {
      try {
        const response = await fetch('http://localhost:8080/ObtenerAlumnos'); 
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchAlumnos();
  }, []);

  const handleUpdateButtonClick = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setNuevoNombre(alumno.Nombre);
    setNuevoCorreo(alumno.Correo);
    setNuevaContraseña(alumno.Contraseña);
    setNuevaEdad(alumno.Edad);
    setModalOpen(true);
    setConfirmModalOpen(false); 
    setCalificacionesModalOpen(false); 
  };

  const handleDeleteButtonClick = (alumnoId) => {
    setAlumnoSeleccionado(alumnoId);
    setConfirmModalOpen(true);
    setModalOpen(false); 
    setCalificacionesModalOpen(false); 
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/EliminarAlumnos/${alumnoSeleccionado}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el alumno');
      }

      const updatedAlumnos = alumnos.filter(alumno => alumno._id !== alumnoSeleccionado);
      setAlumnos(updatedAlumnos);
    } catch (error) {
      console.error('Error:', error);
    }
    setConfirmModalOpen(false);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setConfirmModalOpen(false);
    setCalificacionesModalOpen(false);
    setAlumnoSeleccionado(null);
    setNuevoNombre('');
    setNuevoCorreo('');
    setNuevaContraseña('');
    setNuevaEdad('');
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/ActualizarAlumnos/${alumnoSeleccionado._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Nombre: nuevoNombre,
          Correo: nuevoCorreo,
          Contraseña: nuevaContraseña,
          Edad: nuevaEdad
        })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el alumno');
      }

      const updatedAlumnos = await response.json();
      setAlumnos(updatedAlumnos);
      setModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleVerCalificaciones = async (alumno) => {
    try {
      const response = await fetch(`http://localhost:8080/calificaciones/${alumno._id}`);
      if (!response.ok) {
        throw new Error('Error al obtener las calificaciones');
      }
      const data = await response.json();
      setCalificaciones(data);
      setAlumnoSeleccionado(alumno);
      setCalificacionesModalOpen(true); 
      setModalOpen(false); 
      setConfirmModalOpen(false); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCalificacionesModalClose = () => {
    setCalificacionesModalOpen(false);
    setAlumnoSeleccionado(null);
    setCalificaciones([]);
  };

  const filteredAlumnos = alumnos.filter(alumno => {
    return alumno.Nombre.toLowerCase().includes(searchText.toLowerCase()) || alumno._id.toLowerCase().includes(searchText.toLowerCase());
  });

return (
  <div className="table-card">
 <div className="button-container">
  <Link to="/tabla-reprobados" className="button">Ir a la tabla de reprobados</Link>
  <span style={{ margin: '0 10px' }}></span> 
  <Link to="/calificaciones" className="button">Ir a Agregar Calificaciones</Link>
  <span style={{ margin: '0 10px' }}></span> 
  <Link to="/tabla-calificaciones" className="button">Ir a ver Tabla Calificaciones</Link>
</div>

    <div className="table-container">
      <h2 className="table-title font-Ocean">Lista De Alumnos</h2>
      <input 
        type="text"
        placeholder="Buscar"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
        style={{borderRadius: '20px'}}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Edad</th>
            <th>Acciones</th>
            <th>Calificaciones</th>
          </tr>
        </thead>
          <tbody>
            {filteredAlumnos.map(alumno => (
              <tr key={alumno._id}>
                <td>{alumno.Nombre}</td>
                <td>{alumno.Correo}</td>
                <td>*****</td>
                <td>{alumno.Edad}</td>
                <td>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => handleUpdateButtonClick(alumno)}
                  >
                    Actualizar
                  </button>
                  <button
                    className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => handleDeleteButtonClick(alumno._id)}
                  >
                    Eliminar
                  </button>
                </td>
                <td>
                  <button
                    className="text-white bg-gradient-to-br from-purple-500 to-indigo-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={() => handleVerCalificaciones(alumno)}
                  >
                    Ver Calificaciones
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(modalOpen || confirmModalOpen || calificacionesModalOpen) && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalOpen && (
              <>
                <h2 className='font-Ocean'>Actualizar Alumno</h2>
                <input type="text" value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} placeholder="Nombre" />
                <input type="text" value={nuevoCorreo} onChange={(e) => setNuevoCorreo(e.target.value)} placeholder="Correo" />
                <input type="text" value={nuevaContraseña} onChange={(e) => setNuevaContraseña(e.target.value)} placeholder="Contraseña" />
                <input type="number" value={nuevaEdad} onChange={(e) => setNuevaEdad(e.target.value)} placeholder="Edad" />
                <button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleUpdate}>Actualizar</button>
                <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleModalClose}>Cerrar</button>
              </>
            )}
            {confirmModalOpen && (
              <>
                <h2 className='font-Ocean'>¿Estás seguro de eliminar este alumno?</h2>
                <button className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={confirmDelete}>Sí</button>
                <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => setConfirmModalOpen(false)}>No</button>
              </>
            )}
            {calificacionesModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content table-card">
                  <h2 className="table-title font-Ocean">Calificaciones De {alumnoSeleccionado.Nombre}</h2>
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Materia</th>
                          <th>Calificación</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calificaciones.map((calificacion, index) => (
                          <tr key={index}>
                            <td>{calificacion.materiaInfo.nombre}</td>
                            <td>{calificacion.calificacion}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button className="btn-cancel" onClick={handleCalificacionesModalClose}>Cerrar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TablaAlumnos;
