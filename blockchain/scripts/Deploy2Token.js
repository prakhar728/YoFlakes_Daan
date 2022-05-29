// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const saveFiles = require("./helperFunction");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  // We get the contract to deploy
  const GovernanceToken = await hre.ethers.getContractFactory("Token");
  const governanceToken = await GovernanceToken.deploy("GovernanceToken","GT",1000);

  await governanceToken.deployed();
  saveFiles(governanceToken,"Token");
  console.log("\nGovernance Token deployed to:", governanceToken.address);
  // await delegate(governanceToken.address,deployer.address);
  // console.log('Delegated');
}

// const delegate = async(governanceTokenAddress,delegatedAccount)=>{
//     const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
//     const transactionResponse = await governanceToken.delegate(delegatedAccount)
//     await transactionResponse.wait(1)
//     console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`)
// }
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
