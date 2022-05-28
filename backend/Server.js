const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const PORT= process.env.PORT||5001;





app.use(express.json());
app.use(express.urlencoded({extended:false}));




app.get('/',(req,res)=>{
    console.log('Health Check Beep Beep Boop Boop');
    res.status(200).send('Health Check Beep Beep Boop Boop');
})







app.listen(PORT,()=>{
    console.log(`The Server is Active on PORT:${PORT}`);
})