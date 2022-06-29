const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const nodeHtmlToImage = require('node-html-to-image')
const {getFiles,storeFiles} = require('./Web3/IPFSHelper');
const init3 = require('./Web3/Web3Helper');
const cors = require('cors');

dotenv.config();
const PORT= process.env.PORT||5001;




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


const createImage = async (Reciever,Amount,Campaign)=>{

    await nodeHtmlToImage({
        output: './image.png',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>NFTImage</title>
            <style>
            body{
                width:600px;
                height:700px;
                
            }
        .wrapper{
            width:600px;
            background-color: #feb3b3e3;
            border-radius: 16px;
            display:flex;
                flex-direction:column;
                align-items:center;
        }
        .wrapper img{
            width:400px;
        }
        .wrapper div{
            font-size:20px;
            text-align: center;
            padding:10px 0;
        }
    </style>
        </head>
        <body>
            <div  class="wrapper">
         <img src="https://ipfs.io/ipfs/bafybeicpi5ry5ugd54aevssv2rrh7dxmaxevmbgojadybtjh62hyeltgaa/DAAN_NFT.png" alt="Daan Nft"  />
         <div>
         Thank You ${Reciever} for donating ${Amount} to Campaign ${Campaign}
         </div>
     </div>
        </body>
        </html>`
      })
}


app.get('/',(req,res)=>{
    console.log('Health Check Beep Beep Boop Boop');
    res.status(200).send('Health Check Beep Beep Boop Boop');
})



app.post('/awardNFT',async (req,res)=>{
    console.log(req.body);
    await createImage(req.body.Name,req.body.amountDonated,req.body.campaignID);
    const files = await getFiles(path.join(__dirname,'image.png'));
   const cid =  await storeFiles(files);
   const ipfsURL = `https://${cid}.ipfs.dweb.link/image.png`;
   await init3(req.body.Name,ipfsURL);
    res.send('POST request Recieved');
})





app.listen(PORT,()=>{
    console.log(`The Server is Active on PORT:${PORT}`);
})