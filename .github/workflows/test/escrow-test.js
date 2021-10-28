const { expect } = require("chai");
const { ethers } = require("hardhat");
const {loadFixture, deployContract} = require('ethereum-waffle');

//console.log('Hello')

describe("Escrow", async function () {

  async function fixture([], provider) {
    const Escrow = await hre.ethers.getContractFactory("Escrow");
    const escrow = await Escrow.deploy();
    const [payer, payee, releaser, acc1] = await ethers.getSigners();
    await escrow.deployed();
    return {escrow, payer, payee, releaser, acc1};
  }

  it('Deposit', async () => {    
    const {escrow, payer, payee, releaser, acc1} = await loadFixture(fixture);    
    expect(
     await escrow.connect(payer).depositFor(payee.address,releaser.address,{
          value: 100
      })
    ).to.changeEtherBalances([payer, escrow], [-100, 100]);
  });

  /*

  it('Using wrong account to release', async () => {    
    const {escrow, payer, payee, releaser, acc1} = await loadFixture(fixture);    
    expect(
     await escrow.connect(acc1).release(payer.address,payee.address)
    ).to.changeEtherBalances([escrow, payee], [-100, 100]);  
  });

  it('Using wrong payee to release', async () => {    
    const {escrow, payer, payee, releaser, acc1} = await loadFixture(fixture);    
    expect(
     await escrow.connect(releaser).release(payer.address,acc1.address)
    ).to.changeEtherBalances([escrow, payee], [-100, 100]);
  });

  */

  it('Release normally', async () => {    
    const {escrow, payer, payee, releaser, acc1} = await loadFixture(fixture);    
    expect(
     await escrow.connect(releaser).release(payer.address,payee.address)
    ).to.changeEtherBalances([escrow, payee], [-100, 100]);
  });

  it('Deposit again', async () => {    
    const {escrow, payer, payee, releaser, acc1} = await loadFixture(fixture);    
    expect(
     await escrow.connect(payer).depositFor(payee.address,releaser.address,{
          value: 100
      })
    ).to.changeEtherBalances([payer, escrow], [-100, 100]);
  });  

  it('Refund normally', async () => {    
    const {escrow, payer, payee, releaser, acc1} = await loadFixture(fixture);    
    expect(
     await escrow.connect(releaser).refund(payer.address,payee.address)
    ).to.changeEtherBalances([escrow, payer], [-100, 100]);
  });     


});
