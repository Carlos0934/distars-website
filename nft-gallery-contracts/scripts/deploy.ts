import { ethers } from "hardhat";

async function main() {



  const maxSupply = 10000;
  const Distars = await ethers.getContractFactory("Distars");
  const distars = await Distars.deploy(maxSupply);

  await distars.deployed();

  console.log("Distars deployed to:", distars.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
