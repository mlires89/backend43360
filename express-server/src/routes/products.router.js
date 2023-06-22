import {Router,json} from "express";

const productsRouter = Router();
productsRouter.use(json());

import ProductManager from "../ProductManager.js";
const manager = new ProductManager("express-server/src/productos.json");


productsRouter.get("/", async (req,res)=>{
    const {limit} = req.query;
    const productos = await manager.getProducts();
    if (limit){
        res.send(productos.slice(0,limit));
    }else{
        res.send(productos)
    }    
})

productsRouter.get("/:id", async (req,res)=>{
    const idProd = Number(req.params.id);
    const producto = await manager.getProductById(idProd);
    if (producto){
        res.send(producto);
    }else{
        res.send(`Producto con id: ${idProd} no encontrado`)
    }    
})

productsRouter.post("/",  async (req,res)=>{
    const productData = {
        ...req.body,
        status:true,
        thumbnails:[],
    }
    
    if(!productData.title || !productData.description || !productData.code || !productData.price || !productData.category || !productData.stock){

        return res.status(400).send({error:"Missing parameters"});
    }

    await manager.addProduct(productData);
    res.status(201).send("producto agregado");
    const products = await manager.getProducts();
    req.io.emit("products-updated", products);
})


productsRouter.put("/:id", async (req,res)=>{
    const idProd = Number(req.params.id);
    const productData = {
        ...req.body,
        id:idProd,
    }
    await manager.updateProduct(productData);
    res.send(`producto id: ${idProd} actualizado`);
    const products = await manager.getProducts();
    req.io.emit("products-updated", products);
})

productsRouter.delete("/:id", async (req,res)=>{
    
    const idProd = Number(req.params.id);
    await manager.deleteProducto(idProd);
    res.send(`producto con id:${idProd} eliminado`);
    const products = await manager.getProducts();
    req.io.emit("products-updated", products);
})


export default productsRouter;