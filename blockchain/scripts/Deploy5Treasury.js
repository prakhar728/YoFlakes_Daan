// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const governanceToken = require('../contractsData/Token-address.json');
const timeLock = require('../contractsData/TimeLock-address.json');
const saveFiles = require('./helperFunction');
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Treasury = await hre.ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy();

  await treasury.deployed();
  saveFiles(treasury,"Treasury");
  console.log("\nTreasury Contract deployed to:", treasury.address);
  await treasury.transferOwnership(timeLock.address);
  console.log('\nOwnership changed\n');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
