const { ethers } = require("hardhat");

async function main() {
  const DecentralizedVoting = await ethers.getContractFactory("DecentralizedVoting");
  const decentralizedVoting = await DecentralizedVoting.deploy();

  await decentralizedVoting.waitForDeployment();

  console.log("Contract deployed to:", decentralizedVoting.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
