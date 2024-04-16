import React, { useState } from "react";
import "./Admin.css";

function Admin() {
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correo = event.target.elements.correo.value;
    const contraseña = event.target.elements.contraseña.value;

    setIsLoading(true);

    try {
      if (correo === "admin@gmail.com" && contraseña === "admin") {
        
        setMensaje("Admin Bienvenido");
        window.location.href = "/tabla-alumnos";
      } else {
        setMensaje("Datos Incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMensaje("Error interno del servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="login-title font-Ocean">Iniciar Sesión:</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row">
              <img src="public/sobre.svg" alt="" className="pr-1" />
              <label htmlFor="correo"></label>
              <input type="text" id="correo" name="correo" placeholder="Correo" />
            </div>
            <br />
            <div className="flex flex-row">
              <img src="public/cerrar.svg" alt="" className="pr-1" />
              <label htmlFor="contraseña"></label>
              <input type="password" id="contraseña" name="contraseña" placeholder="Contraseña" />
            </div>
            <br />
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Entrar"}
            </button>
          </form>
          {mensaje && <p>{mensaje}</p>}
        </div>
      </div>
    </div>
  );
}

export default Admin;
