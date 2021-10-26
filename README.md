# First Solidity Task

## Instructions
* You should work on a private GitHub copy of this task
* Clone the repository for local development
* Setup your dev environment. It's recommended you use `yarn` as a package manager and `hardhat` as your Blockchain framework. It's ok to use truffle if you prefer it here.
* Complete the escrow smart contract described below
* Write Javascript unit tests for each function
* Push your work to your private GitHub repository copy when done
* Confirm that the [GitHub test workflow action](./.github/workflows/test.yml) runs your unit tests and they pass
* This should probably take you less than 2 hours to complete

## Acceptance Criteria
- The Escrow smart contract has the `depositFor()` and `release()` functions specified below and they work
- There's 100% code coverage
- All smart contract tests are run by GitHub actions CI on each push to GitHub and they are all passing
- Code shouuld be readable and maintainable

## Escrow Smart Contract Functionality

### Has a `depositFor(...)` function
1. When the function is called it takes the deposited amount of ETH from the `payer` account that called `depositFor()`.
2. Sets the `payee` address.
3. The ETH is held by the smart contract in "escrow" for the `payee`.
4. Sets a separate releaser account that will release the transfer to the receiver. This third account will be a different account than the depositing account or the receiver.
5. This function can be called by anyone to create their own escrow. The contract can manage multiple escrows for different `payer`, `payee` and `releaser` accounts with separate ETH deposit amounts.
6. Write tests for each of thes conditions.

### Has an `release(...)` function
1. Transfers the tokens to the receiver address that was specified when the escrow was created with the `depositFor` function call
2. `release` can only be called by the releaser account that was specified when the escrow was created with the `depositFor` function call
3. Write tests for each of thes conditions.

### `refund()` [don't write this yet]

Don't write any refund functionality. If the initial task is followed by pair programming we will work on this while pair programming.
