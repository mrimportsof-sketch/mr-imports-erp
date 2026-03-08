import { useState } from "react"
import axios from "axios"

function Fornecedores(){

 const [nome,setNome] = useState("")
 const [telefone,setTelefone] = useState("")
 const [cidade,setCidade] = useState("")

 const salvar = async ()=>{

  const novo = {

   nome,
   telefone,
   cidade

  }

  await axios.post("http://localhost:3001/fornecedor",novo)

  alert("Fornecedor cadastrado")

 }

 return(

  <div style={{padding:"30px"}}>

   <h1>Fornecedores</h1>

   <p>Nome</p>

   <input
   value={nome}
   onChange={(e)=>setNome(e.target.value)}
   />

   <br/><br/>

   <p>Telefone</p>

   <input
   value={telefone}
   onChange={(e)=>setTelefone(e.target.value)}
   />

   <br/><br/>

   <p>Cidade</p>

   <input
   value={cidade}
   onChange={(e)=>setCidade(e.target.value)}
   />

   <br/><br/>

   <button onClick={salvar}>
   Cadastrar fornecedor
   </button>

  </div>

 )

}

export default Fornecedores
