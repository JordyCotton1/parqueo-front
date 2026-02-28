import logo from "../Imagenes/logo.png";

function Header() {
  return (
    <div className="top-header">

      {/* LOGO A LA IZQUIERDA */}
      <img src={logo} alt="Logo" className="header-logo" />

      {/* TEXTO CENTRADO */}
      <h2 className="header-title">Sistema de Gestión de Autos</h2>

    </div>
  );
}

export default Header;
