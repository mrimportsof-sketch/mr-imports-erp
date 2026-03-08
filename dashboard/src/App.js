import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Estoque from "./Estoque";
import Assistencia from "./Assistencia";
import Fornecedores from "./Fornecedores";
import "./App.css";
import logo from "./assets/logo.png";

function App() {
  return (
    <Router>

      <div style={{display:"flex", fontFamily:"Arial"}}>

        {/* MENU LATERAL */}
        <div style={{
          width:"220px",
          height:"100vh",
          background:"#111",
          color:"#fff",
          padding:"20px"
        }}>

          <img 
            src={logo} 
            alt="MR Imports"
            style={{width:"160px", marginBottom:"20px"}}
          />

          <hr/>

          <Link className="menuItem" to="/">Dashboard</Link>

          <Link className="menuItem" to="/">Estoque</Link>

          <Link className="menuItem" to="/">Vendas</Link>

          <Link className="menuItem" to="/assistencia">Assistência</Link>

          <Link className="menuItem" to="/fornecedores">Fornecedores</Link>

          <p className="menuItem">Relatórios</p>

          <p className="menuItem">Configurações</p>

        </div>

        {/* ÁREA PRINCIPAL */}
        <div style={{flex:1, padding:"30px"}}>

          <Routes>

            <Route path="/" element={<Estoque />} />

            <Route path="/assistencia" element={<Assistencia />} />

            <Route path="/fornecedores" element={<Fornecedores />} />
console.log("teste deploy");
          </Routes>

        </div>

      </div>

    </Router>
  );
}

export default App;