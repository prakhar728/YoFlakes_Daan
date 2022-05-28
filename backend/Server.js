const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const nodeHtmlToImage = require('node-html-to-image')
const {getFiles,storeFiles} = require('./IPFSHelper');
const init3 = require('./Web3Helper');

dotenv.config();
const PORT= process.env.PORT||5001;

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
        </head>
        <body>
            <h1>This is the NFT awared to ${Reciever} for donating  ${Amount} to Campaign  ${Campaign} </h1>
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
   init3(req.body.Name,ipfsURL);
   
    res.send('POST request Recieved');
})



app.listen(PORT,()=>{
    console.log(`The Server is Active on PORT:${PORT}`);
})