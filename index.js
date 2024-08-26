const express = require('express')
const app = express();

require('dotenv').config();

const PORT = 5000 || process.env.PORT;

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('server is live')
})

const eventRoutes = require('./routes/eventRoutes');

app.use('/api/v3/app',eventRoutes);

//////////////////////database connection///////////////////////////////////
const { connectDb } = require('./config/connectDb');
connectDb();
//////////////////////database connection///////////////////////////////////

app.listen(PORT,()=>{
    console.log(`server is live on http://localhost:${PORT}`)
})