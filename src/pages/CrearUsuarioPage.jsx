import { useState } from "react";
import { registrarUsuario } from "../services/usuarioApi";

function CrearUsuarioPage() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    Nombre: "",
    Correo: "",
    Contrasena: "",
    Rol: "colaborador",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    const data = await registrarUsuario(form, token);

    if (data.error) return alert(data.error);

    alert("Usuario creado ✔");
    window.location.href = "/usuarios";
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Crear Usuario</h2>

        <input name="Nombre" placeholder="Nombre" onChange={handleChange} />
        <input name="Correo" placeholder="Correo" onChange={handleChange} />
        <input
          name="Contrasena"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />

        <select name="Rol" onChange={handleChange}>
          <option value="colaborador">Colaborador</option>
          <option value="gerente">Gerente</option>
          <option value="cliente">Cliente</option>
        </select>

        <button className="btn-primary" onClick={submit}>
          Registrar
        </button>
      </div>
    </div>
  );
}

export default CrearUsuarioPage;
