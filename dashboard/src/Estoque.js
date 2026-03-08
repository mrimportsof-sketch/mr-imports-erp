import { useState, useEffect } from "react";
import axios from "axios";

function Estoque(){

const [estoque,setEstoque] = useState([])
const [editando,setEditando] = useState(null)

/* CARREGAR ESTOQUE */

const carregarEstoque = async () => {

const resposta = await axios.get("https://mr-imports-api.onrender.com/estoque")

setEstoque(resposta.data)

}

useEffect(()=>{

carregarEstoque()

},[])

/* APAGAR */

const apagar = async (id) => {

if(!window.confirm("Deseja apagar este aparelho?")) return

await axios.delete("https://mr-imports-api.onrender.com/iphone/"+id)

alert("Aparelho removido")

carregarEstoque()

}

/* ABRIR EDIÇÃO */

const editar = (item) => {

setEditando({...item})

}

/* SALVAR EDIÇÃO */

const salvarEdicao = async () => {

await axios.put(
"https://mr-imports-api.onrender.com/iphone/"+editando._id,
editando
)

alert("Aparelho atualizado")

setEditando(null)

carregarEstoque()

}

return(

<div style={{padding:"30px"}}>

<h2>Estoque</h2>

{/* FORMULÁRIO DE EDIÇÃO */}

{editando && (

<div style={{
border:"2px solid #000",
padding:"20px",
marginBottom:"20px"
}}>

<h3>Editar aparelho</h3>

<input
value={editando.modelo}
onChange={e=>setEditando({...editando,modelo:e.target.value})}
/>

<br/><br/>

<input
value={editando.imei}
onChange={e=>setEditando({...editando,imei:e.target.value})}
/>

<br/><br/>

<input
value={editando.cor}
onChange={e=>setEditando({...editando,cor:e.target.value})}
/>

<br/><br/>

<input
value={editando.capacidade}
onChange={e=>setEditando({...editando,capacidade:e.target.value})}
/>

<br/><br/>

<input
value={editando.fornecedor}
onChange={e=>setEditando({...editando,fornecedor:e.target.value})}
/>

<br/><br/>

<input
value={editando.compra}
onChange={e=>setEditando({...editando,compra:e.target.value})}
/>

<br/><br/>

<input
value={editando.venda}
onChange={e=>setEditando({...editando,venda:e.target.value})}
/>

<br/><br/>

<button onClick={salvarEdicao}>Salvar</button>

<button onClick={()=>setEditando(null)}>Cancelar</button>

</div>

)}

{/* TABELA DE ESTOQUE */}

<table border="1">

<thead>

<tr>

<th>Modelo</th>

<th>IMEI</th>

<th>Fornecedor</th>

<th>Compra</th>

<th>Venda</th>

<th>Ações</th>

</tr>

</thead>

<tbody>

{estoque.map(item=>(

<tr key={item._id}>

<td>{item.modelo}</td>

<td>{item.imei}</td>

<td>{item.fornecedor}</td>

<td>{item.compra}</td>

<td>{item.venda}</td>

<td>

<button onClick={()=>editar(item)}>
Editar
</button>

<button onClick={()=>apagar(item._id)}>
Excluir
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default Estoque