const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const MyContract = require('../contractsData/DaanNFT.json');
const myContractAddress = require('../contractsData/DaanNFT-address.json');
const dotenv = require('dotenv');

dotenv.config();

const address = process.env.address;
const privateKey = process.env.privateKey;

//Easy way (Web3 + @truffle/hdwallet-provider)
const init3 = async (addressR,URI) => {
  const provider = new Provider(privateKey, 'https://rpc-mumbai.maticvigil.com/v1/8672801189d10b2b2b6d4a3fae5c9e166a94c96f'); 
  const web3 = new Web3(provider);
  const myContract = new web3.eth.Contract(
    MyContract.abi,
    myContractAddress.address
  );

  try {
  console.log(`The Balance of the address ${addressR} is`,await myContract.methods.balanceOf(addressR).call());
    const awardingNFT = await myContract.methods.awardNFT(addressR,URI).send({from:address})
  console.log(`Transaction Hash:${awardingNFT.transactionHash}`);
  console.log(`The Balance of the address ${addressR} is`,await myContract.methods.balanceOf(addressR).call());
  } catch (error) {
    console.log(error);
  }
  

}

module.exports= init3;

