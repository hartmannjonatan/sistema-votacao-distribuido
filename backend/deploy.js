const fs = require("fs");
const path = require("path");
const { ethers } = require("hardhat");

async function main() {
  // Obter o contrato
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Carregar os candidatos do arquivo JSON
  const candidatesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, process.argv[2]), "utf8") // Recebe o caminho do arquivo JSON como argumento
  );

  const names = candidatesData.map(candidate => candidate.name);
  const urls = candidatesData.map(candidate => candidate.urlImage);

  // Deploy do contrato com os candidatos
  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(names, urls);
  console.log("Voting contract deployed to:", voting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });