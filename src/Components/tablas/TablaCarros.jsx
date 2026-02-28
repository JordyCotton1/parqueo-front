function TablaCarros({ carros, seleccionar, refrescar }) {
  const eliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este carro?")) return;

    await fetch(`https://parqueo-backend.onrender.com/carros-predio/${id}`, {
      method: "DELETE",
    });
    refrescar();
  };

  return (
    <table className="table-modern">
      <thead>
        <tr>
          <th>Id</th>
          <th>Foto</th>
          <th>Placa</th>
          <th>Modelo</th>
          <th>Año</th>
          <th>Color</th>
          <th>VIN</th>
          <th>Motor</th>
          <th>Chasis</th>
          <th>Vendedor</th>
          <th>Comprador</th>
          <th>Días Traspaso</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {carros.map((c) => (
          <tr key={c.Id_Predio}>
            
            {/* ID */}
            <td>{c.Id_Predio}</td>

            {/* FOTO */}
            <td>
              {c.FotoCarro ? (
                <img
                  src={c.FotoCarro}
                  alt="Foto del carro"
                  style={{
                    width: "80px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                  }}
                />
              ) : (
                "Sin foto"
              )}
            </td>

            {/* DATOS DEL CARRO */}
            <td>{c.Placa}</td>
            <td>{c.Modelo}</td>
            <td>{c.Anio}</td>
            <td>{c.Color}</td>
            <td>{c.Vin}</td>
            <td>{c.Num_Motor}</td>
            <td>{c.Num_Chasis}</td>

            {/* VENDEDOR */}
            <td>
              {c.Vendedor
                ? `${c.Vendedor.Nombre} (${c.Vendedor.Dpi})`
                : "No asignado"}
            </td>

            {/* COMPRADOR */}
            <td>
              {c.Comprador
                ? `${c.Comprador.Nombre} (${c.Comprador.DPI})`
                : "Sin comprador"}
            </td>
                
            <td>{c.Tiempo_Traspaso ?? "—"}</td>

            {/* ACCIONES */}
            <td>
              <button className="btn-edit" onClick={() => seleccionar(c)}>
                Editar
              </button>

              <button
                className="btn-delete"
                onClick={() => eliminar(c.Id_Predio)}
              >
                Eliminar
              </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaCarros;
