
require("@nomiclabs/hardhat-ethers")
require("./task/deploy.js")

const config = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: [
        {
          privateKey: '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113b37b2c5e7c33dcb1622f0193',
          balance: '1000000000000000000000000'
        },
      ]
    },
  },
};

module.exports = config;