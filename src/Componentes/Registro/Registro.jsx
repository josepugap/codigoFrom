import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; 

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [edad, setEdad] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    
    if (nombre.length>6 && email.length>10 && contraseña.length>4 && edad.length>1){
      const synth = window.speechSynthesis;
      let text = "Bienvenido" + nombre + "a la pagina de calificaciones";
      const robot = new SpeechSynthesisUtterance(text);
      robot.lang = "es-ES";
      synth.speak(robot);
    } else {
      const synth =window.speechSynthesis;
      let text = "Tienes que completar todos tus Datos.";
      const utterThis = new SpeechSynthesisUtterance(text);
      utterThis.lang = "es-ES";
      synth.speak(utterThis)
    }
    
    if (!nombre || !email || !contraseña || !edad) {
      setError("Por favor, completa todos los campos.");
    } else {
      try {
        await axios.post("http://localhost:8080/CrearAlumnos", {
          Nombre: nombre,
          Correo: email,
          Contraseña: contraseña,
          Edad: edad
        });
        console.log("Usuario registrado correctamente");
        window.location.href = "/login";
      } catch (error) {
        console.error("Error al registrar usuario:", error);
      }
    }

  };
  
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="register-title font-Ocean">Registro:</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="flex flex-row">
            <img src="public/persona.svg" alt="" className="pr-2"/> 
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <br />
          <div className="flex flex-row">
            <img src="public/sobre.svg" alt="" className="pr-2"/> 
            <input
              type="text"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <br />
          <div className="flex flex-row">
            <img src="public/cerrar.svg" alt="" className="pr-1"/>
            <input
              type="password"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>

          <br />
          <div className="flex flex-row">
            <img src="public/numero.svg" alt="" className="pr-1"/>
            <select value={edad} onChange={(e) => setEdad(e.target.value)}>
              <option value="">Selecciona tu edad</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="20">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
            </select>
          </div>
          
          <br />
          <button className="register-button" onClick={handleRegister}>
            Registrar
          </button>
          <p>¿Ya tienes cuenta? <a href="/login">Entra</a></p>
        </div>
      </div>
    </div>
  );
}

export default Registro;
