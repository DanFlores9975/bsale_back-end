import express from "express";
import productQ from "./routes/product.routes.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use("/api", productQ);
app.use((req, res, next) => {
    res.status(404).json({
        message: 'No se encontro la pagína :('
    })
})

export default app;