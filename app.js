import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const manager = new ProductManager("./productos.json");


app.get("/productos", async (req,res)=>{
    const {limit} = req.query;
    const productos = await manager.getProducts();
    if (limit){
        res.send(productos.slice(0,limit));
    }else{
        res.send(productos)
    }    
})



app.get("/productos/:id", async (req,res)=>{
    const {id} = req.params;
    const idProd = parseInt(id);
    const producto = await manager.getProductById(idProd);
    if (producto){
        res.send(producto);
    }else{
        res.send(`Producto con id: ${id} no encontrado`)
    }    
})

app.listen(8080,()=>{
    console.log("Servidor escuchando en el puerto 8080")
})