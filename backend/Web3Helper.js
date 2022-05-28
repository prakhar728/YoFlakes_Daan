const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('./DaanNFT.json');
const dotenv = require('dotenv');

dotenv.config();

const address = process.env.address;
const privateKey = process.env.privateKey;

//Easy way (Web3 + @truffle/hdwallet-provider)
const init3 = async (addressR,URI) => {
  const provider = new Provider(privateKey, 'HTTP://127.0.0.1:8545'); 
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  const myContract = new web3.eth.Contract(
    MyContract.abi,
    '0xEfD0c65f43B08b0F2aFfBe983eE4a726BcCC3Ffa'
  );

  console.log(`The Balance of the address ${addressR} is`,await myContract.methods.balanceOf(addressR).call());
  
  console.log(await myContract.methods.name().call());
  console.log(`Contract in USE NAME ${await myContract.methods.name().call()}`);
  const awardingNFT = await myContract.methods.awardNFT(addressR,URI).send({from:address})
  console.log(`Transaction Hash:${awardingNFT.transactionHash}`);
  console.log(`The Balance of the address ${addressR} is`,await myContract.methods.balanceOf(addressR).call());

}

module.exports= init3;

