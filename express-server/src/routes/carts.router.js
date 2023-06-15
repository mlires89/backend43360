import {Router,json} from "express";
import CartManager from "../cartManager.js";
import ProductManager from "../ProductManager.js";
const cartsRouter = Router();
cartsRouter.use(json());

const cartManager = new CartManager("express-server/src/carts.json");
const prodManager = new ProductManager("express-server/src/productos.json");

cartsRouter.post("/", async (req,res)=>{
    await cartManager.addCart();
    res.send({status:"Carrito agregado"})
})



cartsRouter.get("/:cid",async (req,res)=>{
    const cid = Number(req.params.cid);
    const cart = await cartManager.getCartById(cid);
    if (!cart){
        return res.status(400).send({error:"No se encontró el carrito"})
    }
    res.send({carrito: cart})
})


cartsRouter.post("/:cid/product/:pid",async (req,res)=>{
    const cartID = Number(req.params.cid);
    const prodID = Number(req.params.pid);
    const producto = await prodManager.getProductById(prodID)
    if (producto){
        await cartManager.addProdToCart(cartID,prodID);
        res.send({status:"producto agregado"})
    }else{
        res.send(`Producto con id: ${prodID} no encontrado`)
    } 
  
})

export default cartsRouter;