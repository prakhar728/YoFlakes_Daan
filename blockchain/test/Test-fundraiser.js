const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Fundraiser Check", function () {
  it("Should contain the same TokenAddress Entered", async function () {
    const Fundraiser = await ethers.getContractFactory("FundRaiser");
    const fundraiser = await Fundraiser.deploy("0xB8C1BcCa0a31139054c4019B473F6E11fD001F27");
    await fundraiser.deployed();
    expect(await fundraiser.tokenAddress()).to.equal("0xB8C1BcCa0a31139054c4019B473F6E11fD001F27");
  });
});
