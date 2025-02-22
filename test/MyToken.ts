import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyToken", function () {
  /**
   * This test suite ensures that the ERC-20 token contract (MyToken)
   * behaves correctly by verifying its core functionalities, including:
   * - Deployment with the correct initial supply
   * - Token transfers between accounts
   * - Approval and allowance mechanics
   * - Transfer of tokens on behalf of another account
   * - Minting restrictions (only owner can mint)
   * - Burning tokens (reducing supply)
   */
  let MyToken: any;
  let token: any;
  let owner: any, addr1: any, addr2: any;

  beforeEach(async function () {
    // Get test accounts (signers)
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the MyToken contract with an initial supply of 1000 tokens
    MyToken = await ethers.getContractFactory("MyToken");
    token = await MyToken.deploy("MyToken", "MTK", 1000);
    await token.waitForDeployment();
  });

  // Test if the contract is deployed with the correct initial supply
  /**
   * This test checks if the contract initializes correctly:
   * - Ensures that the total supply matches the expected value.
   * - Verifies that the deployer (owner) receives the full initial supply.
   */
  it("Should deploy with correct initial supply", async function () {
    const totalSupply = await token.totalSupply();
    expect(totalSupply).to.equal(1000); // Ensure total supply is correct
    expect(await token.balanceOf(owner.address)).to.equal(1000); // Owner should receive initial supply
  });

  // Test if tokens can be transferred between accounts
  /**
   * This test verifies that token transfers work as expected:
   * - Ensures that sending tokens reduces the sender's balance.
   * - Confirms that the recipient receives the correct token amount.
   */
  it("Should transfer tokens between accounts", async function () {
    await token.transfer(addr1.address, 100); // Transfer 100 tokens from owner to addr1
    expect(await token.balanceOf(owner.address)).to.equal(900); // Owner should now have 900
    expect(await token.balanceOf(addr1.address)).to.equal(100); // addr1 should receive 100
  });

  // Test if an approved spender can transfer tokens on behalf of the owner
  /**
   * This test checks if the ERC-20 approval and allowance mechanism works:
   * - The owner grants permission to another account to spend tokens on their behalf.
   * - The approved account successfully transfers tokens from the owner.
   * - The token balance updates accordingly.
   */
  it("Should allow approved spender to transfer tokens", async function () {
    await token.approve(addr1.address, 200); // Owner approves addr1 to spend 200 tokens
    expect(await token.allowance(owner.address, addr1.address)).to.equal(200); // Check allowance

    // addr1 transfers 200 tokens from owner to addr2 using transferFrom
    await token.connect(addr1).transferFrom(owner.address, addr2.address, 200);
    expect(await token.balanceOf(owner.address)).to.equal(800); // Owner should now have 800
    expect(await token.balanceOf(addr2.address)).to.equal(200); // addr2 should receive 200
  });

  // Test that only the contract owner can mint new tokens
  /**
   * This test ensures that only the contract owner can mint new tokens:
   * - Verifies that the owner can successfully mint new tokens.
   * - Ensures that non-owner accounts cannot mint tokens (should revert).
   */
  it("Should only allow the owner to mint tokens", async function () {
    await token.mint(500); // Owner mints 500 new tokens
    expect(await token.totalSupply()).to.equal(1500); // Total supply should increase to 1500
    expect(await token.balanceOf(owner.address)).to.equal(1500); // Owner should have 1500

    // Ensure that non-owners cannot mint tokens
    await expect(token.connect(addr1).mint(500)).to.be.reverted; // Should fail
  });

  // Test if users can burn their own tokens
  /**
   * This test checks if users can burn their own tokens:
   * - The user should be able to reduce their balance by burning tokens.
   * - The total supply should decrease accordingly.
   */
  it("Should allow users to burn their own tokens", async function () {
    await token.burn(200); // Owner burns 200 tokens
    expect(await token.totalSupply()).to.equal(800); // Total supply should decrease to 800
    expect(await token.balanceOf(owner.address)).to.equal(800); // Owner should have 800
  });

  // Test that users cannot burn more tokens than they have
  /**
   * This test ensures that users cannot burn more tokens than they own:
   * - Trying to burn more than the available balance should cause a transaction failure.
   */
  it("Should not allow burning more than balance", async function () {
    // addr1 has no tokens, so burning should fail
    await expect(token.connect(addr1).burn(50)).to.be.reverted;
  });
});
