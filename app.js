const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const ErrorHandler = require('./Middlewares/errorHandler');
const userRoutes = require('./Routes/userRoutes');
const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(cors({
    origin:['http://localhost:5173'],    //if frontend is added  
    credentials: true,
    exposedHeaders: 'Access-Control-Allow-Private-Network',
  }));
app.use(express.json());

app.use('/api/users/',userRoutes);
app.use(ErrorHandler);



app.get('/',(req,res)=>{
    res.json('Wroking, Hello From Ricoz-Assignment backend');
    });
  
module.exports = app;