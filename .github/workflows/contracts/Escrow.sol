//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Escrow {

	mapping(bytes32 => uint) Accounts;

	function depositFor(address payee, address releaser) public payable {
		bytes32 hash = keccak256(abi.encodePacked(msg.sender, payee, releaser));
		Accounts[hash] += msg.value;
	}

	function release(address payer, address payee) public payable {
		bytes32 hash = keccak256(abi.encodePacked(payer, payee, msg.sender));
		uint amount = Accounts[hash];
		Accounts[hash] = 0;
		payable(payee).transfer(amount);	
	}

	function refund(address payer, address payee) public payable {
		bytes32 hash = keccak256(abi.encodePacked(payer, payee, msg.sender));
		uint amount = Accounts[hash];
		Accounts[hash] = 0;
		payable(payer).transfer(amount);			
	}
}