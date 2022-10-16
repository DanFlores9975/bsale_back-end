import { Router } from "express";
import { getP, getPS, getPC } from "../controllers/product.controller.js";

const router = Router();

router.get("/", getPS);
router.get("/search", getP);
router.get("/category", getPC);


export default router;
