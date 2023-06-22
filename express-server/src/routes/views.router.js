import { Router } from "express";

const router = Router();

import ProductManager from "../ProductManager.js";
const manager = new ProductManager("express-server/src/productos.json");


router.get("/", async (req, res) => {
  const productos = await manager.getProducts();
  res.render("home", {productos});
});

router.get("/real-time-products", async (req, res) => {
  const productos = await manager.getProducts();
  res.render("real_time_products", {productos});
});

export default router;
