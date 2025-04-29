require("@nomiclabs/hardhat-ethers")
require("./task/deploy.js")
require("dotenv").config();

// Configura as redes no hardhat para utilizar no deploy (rede local e sepolia)
const config = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: [
        {
          privateKey: process.env.PRIVATE_KEY,
          balance: '1000000000000000000000000'
        },
      ]
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
    },
  },
};

module.exports = config;