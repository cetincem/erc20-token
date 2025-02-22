import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyToken", function () {
  let MyToken: any;
  let token: any;
  let owner: any, addr1: any, addr2: any;

  beforeEach(async function () {
    // Get signers (test accounts)
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the token contract
    MyToken = await ethers.getContractFactory("MyToken");
    token = await MyToken.deploy("MyToken", "MTK", 1000);
    await token.waitForDeployment();
  });

  it("Should deploy with correct initial supply", async function () {
    const totalSupply = await token.totalSupply();
    expect(totalSupply).to.equal(1000);
    expect(await token.balanceOf(owner.address)).to.equal(1000);
  });

  it("Should transfer tokens between accounts", async function () {
    await token.transfer(addr1.address, 100);
    expect(await token.balanceOf(owner.address)).to.equal(900);
    expect(await token.balanceOf(addr1.address)).to.equal(100);
  });

  it("Should allow approved spender to transfer tokens", async function () {
    await token.approve(addr1.address, 200);
    expect(await token.allowance(owner.address, addr1.address)).to.equal(200);

    await token.connect(addr1).transferFrom(owner.address, addr2.address, 200);
    expect(await token.balanceOf(owner.address)).to.equal(800);
    expect(await token.balanceOf(addr2.address)).to.equal(200);
  });

  it("Should only allow the owner to mint tokens", async function () {
    await token.mint(500);
    expect(await token.totalSupply()).to.equal(1500);
    expect(await token.balanceOf(owner.address)).to.equal(1500);

    await expect(token.connect(addr1).mint(500)).to.be.reverted;
  });

  it("Should allow users to burn their own tokens", async function () {
    await token.burn(200);
    expect(await token.totalSupply()).to.equal(800);
    expect(await token.balanceOf(owner.address)).to.equal(800);
  });

  it("Should not allow burning more than balance", async function () {
    await expect(token.connect(addr1).burn(50)).to.be.reverted;
  });
});
