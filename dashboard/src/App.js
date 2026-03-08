import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Estoque from "./Estoque";
import Assistencia from "./Assistencia";
import Fornecedores from "./Fornecedores";



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

          

          <hr/>

          <p>Dashboard</p>
          <p>Estoque</p>
          <p>Vendas</p>
          <p>Assistência</p>
          <p>Fornecedores</p>
          <p>Relatórios</p>
          <p>Configurações</p>

        </div>

        {/* ÁREA PRINCIPAL */}
        <div style={{flex:1, padding:"30px"}}>

          <Routes>

            <Route path="/" element={<Estoque />} />

            <Route path="/assistencia" element={<Assistencia />} />

            <Route path="/fornecedores" element={<Fornecedores />} />

          </Routes>

        </div>

      </div>

    </Router>
  );
}

export default App;