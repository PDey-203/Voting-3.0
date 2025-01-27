require("@nomicfoundation/hardhat-toolbox");
require('@oasisprotocol/sapphire-hardhat');
const dotenv = require('dotenv');
const {resolve} = require("node:path");
dotenv.config({path:resolve(__dirname, './.env')});

module.exports = {
  solidity: "0.8.18",
  networks: {
    sapphire: {
      url: "https://testnet.sapphire.oasis.io",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 0x5aff
    }
  },
  paths: {
    artifacts: "./src/artifacts"
  }
};
