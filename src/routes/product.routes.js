import { Router } from "express";
import { getP, getPS } from "../controllers/product.controller.js";

const router = Router();

router.get("/", getPS);
router.get("/search", getP);


export default router;
