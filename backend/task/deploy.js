const fs = require("fs");
const path = require("path");
const { task } = require("hardhat/config")

// Função principal para o deploy
async function createContract(ethers, args) {
  candidatesFilePath = args.candidatesFilePath
  if (!candidatesFilePath) {
    console.error("Erro: Por favor, forneça o caminho para o arquivo de candidatos.");
    process.exit(1);
  }

  console.log(candidatesFilePath)

  // Resolução do caminho completo do arquivo
  const fullPath = path.resolve(candidatesFilePath);
  if (!fs.existsSync(fullPath)) {
    console.error("Erro: O arquivo não foi encontrado:", fullPath);
    process.exit(1);
  }

  // Lê os dados do arquivo JSON
  const candidatesData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

  // Extrai os nomes e URLs das imagens dos candidatos
  const candidateNames = candidatesData.candidates.map(c => c.name);
  const candidateImages = candidatesData.candidates.map(c => c.urlImage);

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(candidateNames, candidateImages);
  console.log("Voting contract deployed to:", voting.address);

  // Obtém o primeiro signatário (conta) para fazer o deploy
  /* const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Obtemos a fábrica do contrato "Voting"
  const Voting = await ethers.getContractFactory("Voting");

  // Realiza o deploy do contrato
  const voting = await Voting.deploy(candidateNames, candidateImages);
  console.log("Voting contract deployed to:", voting.address); */

  /* const count = await voting.candidatesCount();
  console.log("Número de candidatos inicializados: "+count); */

}

async function main(){
  task("deploy", "Deploy with candidates JSON file")
    .addPositionalParam("candidatesFilePath")
    .setAction(async (taskArgs, hre) => {
      createContract(hre.ethers, taskArgs);
    });
}

// Executa a função principal e captura os erros
main().catch((error) => {
  console.error(error);
  process.exit(1);
});