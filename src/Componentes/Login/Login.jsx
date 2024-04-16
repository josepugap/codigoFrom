import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correo = event.target.elements.correo.value;
    const contraseña = event.target.elements.contraseña.value;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/IniciarSesion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Correo: correo, Contraseña: contraseña })
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(data.message);
        if (data.message === "Usuario Bienvenido") {
          window.location.href = "/tabla-calificaciones";
        }
      } else {
        setMensaje(data.message || "Error de inicio de sesión");
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
          <p>¿No tienes una cuenta? <a href="/registro">Regístrate</a></p> 
        </div>
      </div>
    </div>
  );
}

export default Login;
