import BotonContrato from "../botones/BotonContrato";

function TablaVentas({ ventas, seleccionar, refrescar }) {

  const eliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta venta?")) return;

    await fetch(`https://parqueo-backend.onrender.com/ventas/${id}`, { method: "DELETE" });
    refrescar();
  };

  return (
    <table className="table-modern">
      <thead>
        <tr>
          <th>ID Venta</th>
          <th>Carro</th>
          <th>Comprador</th>
          <th>Fecha</th>
          <th>Precio Venta</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {ventas.map((v) => (
          <tr key={v.Id_Venta}>

            <td>{v.Id_Venta}</td>

            {/* Carro correcto --> v.Carro */}
            <td>
              {v.Carro
                ? `${v.Carro.Placa} - ${v.Carro.Modelo}`
                : "—"}
            </td>

            {/* Comprador correcto --> v.Comprador */}
            <td>
              {v.Comprador ? v.Comprador.Nombre : "—"}
            </td>

            <td>{v.Fecha}</td>
            <td>Q {v.PrecioVenta}</td>

            <td>
              <button 
                className="btn-edit" 
                onClick={() => seleccionar(v)}
              >
                Editar
              </button>

              <button 
                className="btn-delete" 
                onClick={() => eliminar(v.Id_Venta)}
              >
                Eliminar
              </button>

              {/* Botón contrato */}
              <BotonContrato idVenta={v.Id_Venta} />
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaVentas;
