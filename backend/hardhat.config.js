
require("@nomiclabs/hardhat-ethers")
require("./task/deploy.js")

const config = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};

module.exports = config;