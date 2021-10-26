const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow", function () {
  it("Do everything", async function () {
    const Escrow = await hre.ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy();

    await escrow.deployed();

    const [payer, payee, releaser, acc1] = await ethers.getSigners();

    expect(
     await escrow.connect(payer).depositFor(payee.address,releaser.address,{
          value: 100
      })
    ).to.changeEtherBalances([payer, escrow], [-100, 100]);      

    expect(
     await escrow.connect(acc1).release(payer.address,payee.address)
    ).to.changeEtherBalances([escrow, payee], [-100, 100]);  

    expect(
     await escrow.connect(releaser).release(acc1.address,payee.address)
    ).to.changeEtherBalances([escrow, payee], [-100, 100]);

    expect(
     await escrow.connect(releaser).release(payer.address,acc1.address)
    ).to.changeEtherBalances([escrow, payee], [-100, 100]);

    expect(
     await escrow.connect(releaser).release(payer.address,payee.address)
    ).to.changeEtherBalances([escrow, payee], [-100, 100]);    

  });
});
