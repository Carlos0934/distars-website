import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import { expect } from "chai";
import { ethers } from "hardhat";

describe("Distars", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployDistars() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Distars = await ethers.getContractFactory("Distars");
    const distars = await Distars.deploy(10);
    const maxSupply = (await distars.maxSupply()).toNumber();

    return { distars, owner, otherAccount, maxSupply };
  }

  it("Should mint 1 Distar", async function () {
    const { distars, owner } = await loadFixture(deployDistars);
    await distars.mint();
    expect(await distars.balanceOf(owner.address)).to.equal(1);
  });

  it("Should mint up to maxSupply", async function () {
    const { distars, owner, maxSupply } = await loadFixture(deployDistars);
    for (let i = 0; i < maxSupply; i++) {
      await distars.mint();
    }
    expect(await distars.balanceOf(owner.address)).to.equal(maxSupply);
  });

  it("Should fail to mint more than maxSupply", async function () {
    const { distars, owner, maxSupply } = await loadFixture(deployDistars);
    for (let i = 0; i < maxSupply; i++) {
      await distars.mint();
    }
    expect(await distars.balanceOf(owner.address)).to.equal(maxSupply);
    await expect(distars.mint()).to.be.revertedWith(
      "All tokens have been minted"
    );
  });

  it("Should return a valid tokenURI", async function () {
    const { distars } = await loadFixture(deployDistars);
    await distars.mint();

    const tokenURI = await distars.tokenURI(1);

    expect(tokenURI.startsWith("https://avatars.dicebear.com/api/avataaars/"))
      .to.be.true;
    expect(tokenURI.endsWith(".svg")).to.be.true;
  });

  it("Should two Distars have different tokenURI", async function () {
    const { distars } = await loadFixture(deployDistars);
    await distars.mint();
    await distars.mint();

    const tokenURI1 = await distars.tokenURI(1);
    const tokenURI2 = await distars.tokenURI(2);

    expect(tokenURI1).to.not.equal(tokenURI2);
  });
});
