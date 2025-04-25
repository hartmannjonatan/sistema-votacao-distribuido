require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { task } = require("hardhat/config");

async function createContract(ethers, args, network) {
  const candidatesFilePath = args.candidatesFilePath;

  if (!candidatesFilePath) {
    console.error("Erro: Por favor, forneça o caminho para o arquivo de candidatos.");
    process.exit(1);
  }

  const fullPath = path.resolve(candidatesFilePath);
  if (!fs.existsSync(fullPath)) {
    console.error("Erro: O arquivo não foi encontrado:", fullPath);
    process.exit(1);
  }

  const candidatesData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
  const candidateNames = candidatesData.candidates.map(c => c.name);
  const candidateImages = candidatesData.candidates.map(c => c.urlImage);

  // Provider dinâmico conforme rede
  let provider;
  if (network.name === "sepolia") {
    provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  } else {
    provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  }

  const privateKey = process.env.PRIVATE_KEY;
  const deployer = new ethers.Wallet(privateKey, provider);
  console.log("Deploying contracts with the account:", deployer.address);

  const Voting = await ethers.getContractFactory("Voting", deployer);
  const voting = await Voting.deploy(candidateNames, candidateImages);

  await voting.deployed();
  console.log("Voting contract deployed to:", voting.address);

  const info = {
    address: voting.address,
    privateKey: deployer.privateKey,
    network: network.name
  };

  fs.writeFileSync("./task/deploy-info.json", JSON.stringify(info, null, 2));
}

task("deploy", "Deploy with candidates JSON file")
  .addPositionalParam("candidatesFilePath")
  .setAction(async (taskArgs, hre) => {
    await createContract(hre.ethers, taskArgs, hre.network);
  });

module.exports = {};