import express from "express";

import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Routes for the endpoints
router.get("/", getProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
