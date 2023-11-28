require("dotenv").config();
const { ethers, network } = require("hardhat");
const verifyContract = require("../utils/verifyContract");

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  try {
    const tokenFactory = await ethers.getContractFactory("Angel");
    console.log("Contract is being deployed...");
    const token = await tokenFactory.deploy();
    if (network.config.chainId === 11155111 && ETHERSCAN_API_KEY) {
      await token.waitForDeployment(6);
      console.log(`Contract is deployed at address: ${token.target}`);

      console.log("Waiting for 1 minute before verifying the contract...");
      await delay(60000); // 1 minute delay

      await verifyContract(token.target, "contracts/Angel.sol:Angel");
    }
  } catch (error) {
    console.log(error);
  }
};

main();

module.exports = main;
