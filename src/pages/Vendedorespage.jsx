import { useState, useEffect } from "react";
import TablaVendedores from "../Components/tablas/TablaVendedores";

function VendedoresPage() {
  const [vendedores, setVendedores] = useState([]);

  const [Id_Vendedor, setId] = useState(null);

  const [Nombre, setNombre] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Dpi, setDpi] = useState("");
  const [Foto_DPI, setFotoDPI] = useState("");
  const [Direccion, setDireccion] = useState("");
  const [Relacion_Dueño, setRelacion] = useState("");

    // Busqueda
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarVendedores();
  }, []);

  const cargarVendedores = () => {
    fetch("https://parqueo-backend.onrender.com/vendedores")
      .then((res) => res.json())
      .then((data) => setVendedores(data));
  };

  const limpiar = () => {
    setId(null);
    setNombre("");
    setTelefono("");
    setDpi("");
    setFotoDPI("");
    setDireccion("");
    setRelacion("");
  };

  const seleccionar = (v) => {
    setId(v.Id_Vendedor);
    setNombre(v.Nombre);
    setTelefono(v.Telefono);
    setDpi(v.Dpi);
    setFotoDPI(v.Foto_DPI);
    setDireccion(v.Direccion);
    setRelacion(v.Relacion_Dueño);
  };

  const convertirImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setFotoDPI(reader.result);
    reader.readAsDataURL(file);
  };

  const guardar = async () => {
    if (!Nombre.trim()) return alert("El nombre es obligatorio");
    if (!Telefono.trim()) return alert("El teléfono es obligatorio");
    if (!Dpi || Dpi.length !== 13) return alert("El DPI debe tener 13 dígitos");

    const body = {
      Nombre,
      Telefono,
      Dpi,
      Foto_DPI,
      Direccion,
      Relacion_Dueño,
    };

    const url = Id_Vendedor
      ? `https://parqueo-backend.onrender.com/vendedores/${Id_Vendedor}`
      : "https://parqueo-backend.onrender.com/vendedores";

    await fetch(url, {
      method: Id_Vendedor ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    limpiar();
    cargarVendedores();
  };

      // FILTRO EN TIEMPO REAL
const vendedoresFiltrados = vendedores.filter((v) => {
  const texto = busqueda.toLowerCase();

  return (
    (v.Nombre ? v.Nombre.toLowerCase().includes(texto) : false) ||
    (v.Telefono ? v.Telefono.toLowerCase().includes(texto) : false) ||
    (v.Dpi ? v.Dpi.toLowerCase().includes(texto) : false) ||
    (v.Direccion ? v.Direccion.toLowerCase().includes(texto) : false) ||
    (v.Relacion_Dueño ? v.Relacion_Dueño.toLowerCase().includes(texto) : false)
    );
});


  return (
    <div className="page-container">
      <h1>Gestión de Vendedores</h1>

      <div className="form-box">

        <input
          placeholder="Nombre"
          value={Nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          placeholder="Teléfono"
          value={Telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />

        <input
          placeholder="DPI (13 dígitos)"
          maxLength={13}
          value={Dpi}
          onChange={(e) => {
            const v = e.target.value;
            if (/^\d*$/.test(v)) setDpi(v);
          }}
        />

        <label>Foto DPI</label>
        <input type="file" accept="image/*" onChange={convertirImagen} />

        <input
          placeholder="Dirección"
          value={Direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <select value={Relacion_Dueño} onChange={(e) => setRelacion(e.target.value)}>
          <option value="">Seleccione relación</option>
          <option value="Hermano">Hermano</option>
          <option value="Padre">Padre</option>
          <option value="Madre">Madre</option>
          <option value="Amigo">Amigo</option>
        </select>


        <button className="btn-primary" onClick={guardar}>
          {Id_Vendedor ? "Actualizar" : "Agregar"}
        </button>
      </div>
              {/* 🔍 BUSCADOR ARRIBA DEL FORM */}          
          <div className="search-row">
            <input
              className="search-input-inside"
              type="text"
              placeholder="Buscar Vendedor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

      <TablaVendedores
        vendedores={vendedoresFiltrados}
        seleccionar={seleccionar}
        refrescar={cargarVendedores}
      />
    </div>
  );
}

export default VendedoresPage;
