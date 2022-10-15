import express from 'express';
import productQ from './routes/product.routes.js'

const app = express()



app.use('/api',productQ);


app.listen(3000)
console.log("Server on port 3000")

