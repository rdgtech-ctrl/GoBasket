import { Router } from "express";
import { getCategories, getProductBySlug, listProducts } from "../controllers/productController";

const router = Router();

router.get("/", listProducts);
router.get("/categories", getCategories);
router.get("/:slug", getProductBySlug);
//dynamic site
// :slug is a dynamic parameter (placeholder)
// The actual value replaces :slug

export default router;