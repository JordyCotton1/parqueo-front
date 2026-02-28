import { useState, useEffect } from "react";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);

  const [Nombre, setNombre] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Contrasena, setContrasena] = useState("");
  const [Rol, setRol] = useState("");

  const API = "https://parqueo-backend.onrender.com/usuarios";

  // ============================
  // CARGAR USUARIOS
  // ============================

  const cargarUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error al cargar usuarios");
        return;
      }

      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // ============================
  // VALIDACIONES
  // ============================

  const validar = () => {
    if (!Nombre.trim()) return "Debe ingresar un nombre.";
    if (!Correo.trim()) return "Debe ingresar un correo.";
    if (!Correo.includes("@") || !Correo.includes(".")) return "Correo inválido.";
    if (!Contrasena.trim()) return "Debe ingresar una contraseña.";
    if (!Rol) return "Debe seleccionar un rol.";
    return null;
  };

  // ============================
  // CREAR USUARIO
  // ============================

  const crearUsuario = async () => {
    const error = validar();
    if (error) return alert(error);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ Nombre, Correo, Contrasena, Rol }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert("Usuario creado correctamente ✔");

      setNombre("");
      setCorreo("");
      setContrasena("");
      setRol("");

      cargarUsuarios();
    } catch (error) {
      console.error("Error creando usuario", error);
    }
  };

  // ============================
  // ELIMINAR USUARIO
  // ============================

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "No se pudo eliminar el usuario");
        return;
      }

      alert("Usuario eliminado ✔");
      cargarUsuarios();
    } catch (error) {
      console.error("Error eliminando usuario", error);
    }
  };

  return (
    <div className="page-container">
      <h1>Gestión de Usuarios</h1>

      <div className="form-box">

        <input
          placeholder="Nombre"
          value={Nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          placeholder="Correo"
          value={Correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <input
          placeholder="Contraseña"
          type="password"
          value={Contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />

        <select value={Rol} onChange={(e) => setRol(e.target.value)}>
          <option value="">Seleccione Rol</option>
          <option value="gerente">Gerente</option>
          <option value="colaborador">Colaborador</option>
          <option value="cliente">Cliente</option>
        </select>

        <button className="btn-primary" onClick={crearUsuario}>
          Crear Usuario
        </button>
      </div>

      {/* TABLA USUARIOS */}
      <table className="table-modern">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios
            .filter((u) => u.Rol !== "programador") // Ocultar programador
            .map((u) => (
              <tr key={u.Id_Usuario}>
                <td>{u.Id_Usuario}</td>
                <td>{u.Nombre}</td>
                <td>{u.Correo}</td>
                <td>{u.Rol}</td>

                <td>
                  <button
                    className="btn-eliminar-usuario"
                    onClick={() => eliminarUsuario(u.Id_Usuario)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosPage;
