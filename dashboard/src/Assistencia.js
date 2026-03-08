import { useState } from "react"
import axios from "axios"

function Assistencia(){

 const [cliente,setCliente] = useState("")
 const [aparelho,setAparelho] = useState("")
 const [defeito,setDefeito] = useState("")
 const [valor,setValor] = useState("")

 const salvar = async ()=>{

  const novo = {

   cliente,
   aparelho,
   defeito,
   valor,
   status:"Recebido"

  }

  await axios.post("http://localhost:3001/assistencia",novo)

  alert("Assistência cadastrada")

 }

 return(

  <div style={{padding:"30px"}}>

   <h1>Assistência Técnica</h1>

   <h3>Cliente</h3>

   <input
   value={cliente}
   onChange={(e)=>setCliente(e.target.value)}
   placeholder="Nome do cliente"
   />

   <br/><br/>

   <h3>Aparelho</h3>

   <input
   value={aparelho}
   onChange={(e)=>setAparelho(e.target.value)}
   placeholder="Modelo do aparelho"
   />

   <br/><br/>

   <h3>Defeito</h3>

   <input
   value={defeito}
   onChange={(e)=>setDefeito(e.target.value)}
   placeholder="Descrição do defeito"
   />

   <br/><br/>

   <h3>Valor do serviço</h3>

   <input
   value={valor}
   onChange={(e)=>setValor(e.target.value)}
   placeholder="Valor do conserto"
   />

   <br/><br/>

   <button onClick={salvar}>
   Registrar conserto
   </button>

  </div>

 )

}

export default Assistencia