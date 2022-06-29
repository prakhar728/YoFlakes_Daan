const express = require('express');
const app = express();
const dotenv = require('dotenv');
const {getFiles,storeFiles} = require('./Web3/IPFSHelper');
const init3 = require('./Web3/Web3Helper');
const cors = require('cors');
//Importing Routes
const HealthCheck = require('./Routes/HealthCheck');
const AwardNft = require('./Routes/AwardNft');

dotenv.config();

//Basic Server Setup
const PORT= process.env.PORT||5001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));



//Setting Routes
app.use('/',HealthCheck);
app.use('/awardnft',AwardNft);






//Start the Server
app.listen(PORT,()=>{
    console.log(`The Server is Active on PORT:${PORT}`);
})