import express from "express";
import productQ from "./routes/product.routes.js";

const app = express();

app.use("/api", productQ);
app.use((req, res, next) => {
    res.status(404).json({
        message: 'No se encontro la pagína :('
    })
})

export default app;