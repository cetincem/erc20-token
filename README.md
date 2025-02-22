# ERC-20 Token Project

This project demonstrates how to create a **custom ERC-20 token** using Solidity and Hardhat. The goal is to teach the fundamentals of ERC-20 tokens while leveraging OpenZeppelin's secure and optimized implementation.

## What is ERC-20?

ERC-20 is a token standard on Ethereum that defines how fungible tokens behave. It ensures that all ERC-20 tokens follow the same rules, making them compatible with wallets, exchanges, and other smart contracts.

### Essential ERC-20 Functions:

1️⃣ **totalSupply()** → Returns the total supply of the token.  
2️⃣ **balanceOf(address owner)** → Checks how many tokens an address holds.  
3️⃣ **transfer(to, amount)** → Sends tokens from one address to another.  
4️⃣ **approve(spender, amount)** → Allows another address (like a contract) to spend tokens on behalf of the owner.  
5️⃣ **allowance(owner, spender)** → Checks how much a spender is allowed to use.  
6️⃣ **transferFrom(from, to, amount)** → Moves tokens on behalf of an owner after approval.

These functions allow ERC-20 tokens to be **transferred, approved, and managed securely** within the Ethereum ecosystem.

## Why OpenZeppelin?

Instead of writing the ERC-20 functions from scratch, we use OpenZeppelin’s audited contracts. This ensures:

✅ **Security** – Avoids common vulnerabilities in token contracts.  
✅ **Efficiency** – Reuses well-tested code, reducing bugs and saving development time.  
✅ **Interoperability** – Follows the ERC-20 standard exactly, ensuring compatibility with wallets, exchanges, and other smart contracts.

By using OpenZeppelin, we focus on **learning ERC-20 concepts** rather than reinventing existing standards.
The ERC-20 standard requires several functions like `transfer()`, `approve()`, and `allowance()`. Instead of writing these from scratch, we use OpenZeppelin’s implementation, which is already secure and widely used. This prevents security vulnerabilities and ensures compatibility with the broader Ethereum ecosystem.

### How to View ERC-20 Implementation in OpenZeppelin

To see how these functions work, you can explore OpenZeppelin’s source code:

- **ERC-20 Contract**: [OpenZeppelin ERC-20.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- **ERC-20 Interface**: [IERC20.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)

By using OpenZeppelin, we focus on **learning ERC-20 concepts** rather than reinventing existing standards.

## What’s Included?

- **Minting & Burning Functions** – Allows token creation and destruction.
- **Deployment Script** – Automates the deployment process.
- **Testing Setup** – Ensures the token works correctly with Hardhat.

## Getting Started

1. Install dependencies:

   ```sh
   npm install
   ```

2. Compile the contract:

   ```sh
   npx hardhat compile
   ```

3. Deploy the contract locally:

   ```sh
   npx hardhat run scripts/deploy.ts --network localhost
   ```

4. Run tests:
   ```sh
   npx hardhat test
   ```
