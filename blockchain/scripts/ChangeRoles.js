// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const governance = require('../contractsData/Governance-address.json');
const timeLockAddress = require('../contractsData/TimeLock-address.json');
const TimeLockContract = require('../contractsData/TimeLock.json');


async function main() {
  const [deployer] = await ethers.getSigners();
const  timelock = new ethers.Contract(timeLockAddress.address,TimeLockContract.abi,deployer);
const proposerRole = await timelock.PROPOSER_ROLE()
    const executorRole = await timelock.EXECUTOR_ROLE()

    await timelock.grantRole(proposerRole, governance.address)
    await timelock.grantRole(executorRole, governance.address)
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
