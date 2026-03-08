const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())

/* CONEXÃO BANCO */

mongoose.connect("mongodb+srv://mrimportsof_db_user:Vaneilton27@cluster0.ukzvyc7.mongodb.net/mrimports")
.then(()=>{
 console.log("Banco conectado ONLINE")
})
.catch(err=>{
 console.log(err)
})
/* MODELO IPHONE */

const Iphone = mongoose.model("Iphone",{

 modelo:String,
 imei:String,
 cor:String,
 capacidade:String,
 fornecedor:String,
 compra:Number,
 venda:Number,
 status:{ type:String, default:"estoque" }

})

/* CADASTRAR IPHONE */

app.post("/iphone", async (req,res)=>{

 try{

  const iphone = new Iphone(req.body)

  await iphone.save()

  res.json(iphone)

 }catch(err){

  console.log(err)
  res.status(500).send("Erro ao salvar")

 }

})

/* LISTAR ESTOQUE */

app.get("/estoque", async (req,res)=>{

 try{

  const lista = await Iphone.find({status:"estoque"})

  res.json(lista)

 }catch(err){

  console.log(err)
  res.status(500).send("Erro ao buscar estoque")

 }

})

/* LISTAR VENDIDOS */

app.get("/vendidos", async (req,res)=>{

 try{

  const lista = await Iphone.find({status:"vendido"})

  res.json(lista)

 }catch(err){

  console.log(err)
  res.status(500).send("Erro ao buscar vendidos")

 }

})

/* VENDER */

app.put("/vender/:id", async (req,res)=>{

 try{

  const id = req.params.id

  const iphone = await Iphone.findByIdAndUpdate(
   id,
   {status:"vendido"},
   {new:true}
  )

  res.json(iphone)

 }catch(err){

  console.log(err)
  res.status(500).send("Erro ao vender")

 }

})

/* INICIAR SERVIDOR */

app.listen(3001, ()=>{

 console.log("Servidor rodando na porta 3001")

})