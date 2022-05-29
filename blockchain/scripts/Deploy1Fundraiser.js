// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const saveFiles = require("./helperFunction");
const treasuryAddress = require('../contractsData/Treasury-address.json');
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  console.log(treasuryAddress.address);
  const Fundraiser = await hre.ethers.getContractFactory("FundRaiser");
  const fundraiser = await Fundraiser.deploy(treasuryAddress.address);

  const tx = await fundraiser.deployed();
  console.log(tx);
  saveFiles(fundraiser,"FundRaiser");
  console.log("Fundraiser deployed to:", fundraiser.address);
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
