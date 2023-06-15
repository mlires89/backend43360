import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./util.js"; 

const app = express();

app.use(express.static(__dirname+"../public"));
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);

app.listen(8080,()=>{
    console.log("Servidor escuchando en el puerto 8080")
});