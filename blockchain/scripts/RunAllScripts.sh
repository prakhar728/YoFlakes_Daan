#!/bin/bash


npx hardhat run "Deploy2Token.js" --network matic

npx hardhat run "Deploy3TimeLock.js" --network matic

npx hardhat run "Deploy4Governor.js" --network matic

npx hardhat run "Deploy5Treasury.js" --network matic

npx hardhat run "Deploy6NFT.js" --network matic

npx hardhat run "ChangeRoles.js" --network matic

npx hardhat run "Deploy1Fundraiser.js" --network matic 
