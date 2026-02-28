import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import VendedoresPage from "./pages/Vendedorespage";
import Inicio from "./pages/Inicio";
import CompradoresPage from "./pages/CompradoresPage";
import ColaboradoresPage from "./pages/ColaboradoresPage";
import CarroPredioPage from "./pages/CarrosPredioPage";
import GastosPage from "./pages/GastosPage";
import VentasPage from "./pages/VentasPage";
import LoginPage from "./pages/LoginPage";
import UsuariosPage from "./pages/UsuariosPage";
import CrearUsuarioPage from "./pages/CrearUsuarioPage";

import BuscadorPage from "./pages/BuscadorPage";

import ProtectedRoute from "./Protected";
import Unauthorized from "./pages/Unauthorized";

import "./global.css";
import "./Login.css";

import Sidebar from "./Components/paneles/Sidebar";
import Header from "./Components/paneles/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="layout">
        <Sidebar />

        <div className="content">
          <Routes>

            {/* RUTAS PÚBLICAS */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* INICIO (PROTEGIDO) */}
            <Route
              path="/"
              element={
                <ProtectedRoute roles={["gerente", "colaborador", "programador"]}>
                  <Inicio />
                </ProtectedRoute>
              }
            />

            {/* CREAR USUARIO */}
            <Route
              path="/crear-usuario"
              element={
                <ProtectedRoute roles={["gerente", "programador"]}>
                  <CrearUsuarioPage />
                </ProtectedRoute>
              }
            />

            {/* RUTAS PROTEGIDAS */}
            <Route
              path="/vendedores"
              element={
                <ProtectedRoute roles={["gerente", "programador"]}>
                  <VendedoresPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/compradores"
              element={
                <ProtectedRoute roles={["gerente", "colaborador", "programador"]}>
                  <CompradoresPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/colaboradores"
              element={
                <ProtectedRoute roles={["gerente", "programador"]}>
                  <ColaboradoresPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/carros-predio"
              element={
                <ProtectedRoute roles={["gerente", "colaborador", "programador"]}>
                  <CarroPredioPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/gastos"
              element={
                <ProtectedRoute roles={["gerente", "programador"]}>
                  <GastosPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ventas"
              element={
                <ProtectedRoute roles={["gerente", "colaborador", "programador"]}>
                  <VentasPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/buscar"
              element={
                <ProtectedRoute roles={["gerente", "colaborador", "programador"]}>
                  <BuscadorPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/usuarios"
              element={
                <ProtectedRoute roles={["gerente", "programador"]}>
                  <UsuariosPage />
                </ProtectedRoute>
              }
            />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
