const fs = require("fs");
const path = require("path");
const { task } = require("hardhat/config")
const { startRelayer } = require('./relayer');

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

  const privateKey = "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113b37b2c5e7c33dcb1622f0193";
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const deployer = new ethers.Wallet(privateKey, provider);
  console.log("Deploying contracts with the account:", deployer.address);

  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(candidateNames, candidateImages);
  console.log("Voting contract deployed to:", voting.address);

  const tx = await deployer.sendTransaction({
    to: voting.address,  // Endereço do contrato
    value: ethers.utils.parseEther("500000.0"),
  });
  await tx.wait();

  const info = {
      address: voting.address,
      privateKey: deployer.privateKey,
  };

  fs.writeFileSync("./task/deploy-info.json", JSON.stringify(info, null, 2));

  await startRelayer();

}

async function main(){
  task("deploy", "Deploy with candidates JSON file")
    .addPositionalParam("candidatesFilePath")
    .setAction(async (taskArgs, hre) => {
      await createContract(hre.ethers, taskArgs);
    });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });