import { useState, useEffect } from "react";
import axios from "axios";

function Estoque(){

const [modelo,setModelo] = useState("")
const [imei,setImei] = useState("")
const [cor,setCor] = useState("")
const [capacidade,setCapacidade] = useState("")
const [fornecedor,setFornecedor] = useState("")
const [compra,setCompra] = useState("")
const [venda,setVenda] = useState("")

const [estoque,setEstoque] = useState([])
const [vendidos,setVendidos] = useState([])

const [busca,setBusca] = useState("")
const [aba,setAba] = useState("dashboard")

/* BLOQUEAR LETRAS NO IMEI */

const handleImei = (valor) => {

const numeros = valor.replace(/\D/g,"")

if(numeros.length <= 15){
setImei(numeros)
}

}

/* CARREGAR ESTOQUE */

const carregarEstoque = async () => {

const resposta = await axios.get("https://mr-imports-api.onrender.com/estoque")
setEstoque(resposta.data)

}

const carregarVendidos = async () => {

const resposta = await axios.get("https://mr-imports-api.onrender.com/vendidos")
setVendidos(resposta.data)

}

useEffect(()=>{

carregarEstoque()
carregarVendidos()

},[])

/* SALVAR IPHONE */

const salvar = async () => {

if(imei.length !== 15){

alert("IMEI precisa ter 15 números")
return

}

await axios.post("https://mr-imports-api.onrender.com/iphone",{

modelo,
imei,
cor,
capacidade,
fornecedor,
compra:Number(compra),
venda:Number(venda)

})

alert("iPhone cadastrado")

setModelo("")
setImei("")
setCor("")
setCapacidade("")
setFornecedor("")
setCompra("")
setVenda("")

carregarEstoque()

}

/* VENDER */

const vender = async (id) => {

await axios.put("https://mr-imports-api.onrender.com/vender/"+id)

alert("Venda realizada")

carregarEstoque()
carregarVendidos()

}

/* APAGAR */

const apagar = async (id) => {

if(!window.confirm("Deseja apagar este aparelho?")) return

await axios.delete("https://mr-imports-api.onrender.com/iphone/"+id)

alert("Aparelho removido")

carregarEstoque()

}

/* EDITAR */

const editar = async (item) => {

const novoModelo = prompt("Novo modelo:",item.modelo)

if(!novoModelo) return

await axios.put("https://mr-imports-api.onrender.com/iphone/"+item._id,{

modelo:novoModelo

})

alert("Atualizado")

carregarEstoque()

}

return(

<div style={{display:"flex"}}>

{/* MENU LATERAL */}

<div style={{
width:"150px",
height:"50vh",
background:"#111",
color:"#fff",
padding:"10px"
}}>

<h2>DASHBOARD</h2>

<hr/>

<p onClick={()=>setAba("dashboard")}>Dashboard</p>
<p onClick={()=>setAba("cadastro")}>Cadastro</p>
<p onClick={()=>setAba("estoque")}>Estoque</p>
<p onClick={()=>setAba("vendas")}>Vendas</p>
<p onClick={()=>setAba("relatorio")}>Relatórios</p>

</div>

{/* ÁREA PRINCIPAL */}

<div style={{flex:1,padding:"30px"}}>

{/* DASHBOARD */}

{aba==="dashboard" && (

<div>

<h2>Dashboard da loja</h2>

<div style={{display:"flex",gap:"20px"}}>

<div style={{background:"#eee",padding:"20px",width:"200px"}}>
<h3>Aparelhos em estoque</h3>
<p>{estoque.length}</p>
</div>

<div style={{background:"#eee",padding:"20px",width:"200px"}}>
<h3>Vendas realizadas</h3>
<p>{vendidos.length}</p>
</div>

<div style={{background:"#eee",padding:"20px",width:"200px"}}>
<h3>Faturamento total</h3>
<p>R$ {vendidos.reduce((total,item)=> total + item.venda ,0)}</p>
</div>

<div style={{background:"#eee",padding:"20px",width:"200px"}}>
<h3>Lucro total</h3>
<p>R$ {vendidos.reduce((total,item)=> total + (item.venda - item.compra) ,0)}</p>
</div>

</div>

</div>

)}

{/* CADASTRO */}

{aba==="cadastro" && (

<div>

<h2>Cadastro</h2>

<input placeholder="Modelo" value={modelo} onChange={e=>setModelo(e.target.value)}/>
<br/><br/>

<input placeholder="IMEI (15 números)" value={imei} onChange={e=>handleImei(e.target.value)}/>
<br/><br/>

<input placeholder="Cor" value={cor} onChange={e=>setCor(e.target.value)}/>
<br/><br/>

<input placeholder="Capacidade" value={capacidade} onChange={e=>setCapacidade(e.target.value)}/>
<br/><br/>

<input placeholder="Fornecedor" value={fornecedor} onChange={e=>setFornecedor(e.target.value)}/>
<br/><br/>

<input placeholder="Preço compra" value={compra} onChange={e=>setCompra(e.target.value)}/>
<br/><br/>

<input placeholder="Preço venda" value={venda} onChange={e=>setVenda(e.target.value)}/>
<br/><br/>

<button onClick={salvar}>Salvar</button>

</div>

)}

{/* ESTOQUE */}

{aba==="estoque" && (

<div>

<h2>Estoque</h2>

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

<button onClick={()=>editar(item)}>Editar</button>

<button onClick={()=>apagar(item._id)}>Excluir</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)}

{/* VENDAS */}

{aba==="vendas" && (

<div>

<h2>Vendas</h2>

<input placeholder="Buscar" onChange={e=>setBusca(e.target.value)}/>

{estoque
.filter(item=> item.modelo.toLowerCase().includes(busca.toLowerCase()) || item.imei.includes(busca))
.map(item=>(

<div key={item._id} style={{border:"1px solid #ccc",padding:"10px",margin:"10px"}}>

<b>{item.modelo}</b>

<p>IMEI: {item.imei}</p>

<p>Preço: R$ {item.venda}</p>

<button onClick={()=>vender(item._id)}>Confirmar venda</button>

</div>

))}

</div>

)}

{/* RELATORIO */}

{aba==="relatorio" && (

<div>

<h2>Relatório</h2>

<table border="1">

<thead>
<tr>
<th>Modelo</th>
<th>IMEI</th>
<th>Compra</th>
<th>Venda</th>
<th>Lucro</th>
</tr>
</thead>

<tbody>

{vendidos.map(item=>(

<tr key={item._id}>
<td>{item.modelo}</td>
<td>{item.imei}</td>
<td>{item.compra}</td>
<td>{item.venda}</td>
<td>{item.venda-item.compra}</td>
</tr>

))}

</tbody>

</table>

</div>

)}

</div>

</div>

)

}

export default Estoque