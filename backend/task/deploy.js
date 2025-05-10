require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { task } = require("hardhat/config");

// Função principal responsável por realizar o deploy do contrato 
async function createContract(ethers, args, network) {
  // Caminho do arquivo de candidatos extraído dos args na chamada do deploy
  const candidatesFilePath = args.candidatesFilePath;

  if (!candidatesFilePath) {
    console.error("Erro: Por favor, forneça o caminho para o arquivo de candidatos.");
    process.exit(1);
  }

  // Verifica se o arquivo de candidatos existe
  const fullPath = path.resolve(candidatesFilePath);
  if (!fs.existsSync(fullPath)) {
    console.error("Erro: O arquivo não foi encontrado:", fullPath);
    process.exit(1);
  }

  // Faz o parse do json de candidatos
  const candidatesData = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
  const candidateNames = candidatesData.candidates.map(c => c.name);
  const candidateImages = candidatesData.candidates.map(c => c.urlImage);

  // Define o provider com base na rede selecionada
  let provider;
  if (network.name === "sepolia") {
    provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  } else {
    if (network.name === "private") {
      provider = new ethers.providers.JsonRpcProvider(process.env.PRIVATE_NETWORK_URL);
    } else {
      provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
    }
  }

   // Configura o deployer a partir da chave privada de .env
  const privateKey = process.env.PRIVATE_KEY;
  const deployer = new ethers.Wallet(privateKey, provider);
  console.log("Deploying contracts with the account:", deployer.address);

  const gasPrice = network.name === "sepolia" ? ethers.utils.parseUnits("20", "gwei") : undefined;
  // Obtém a fábrica do contrato "Voting" e faz o deploy com os dados dos candidatos
  const Voting = await ethers.getContractFactory("Voting", deployer);
  const voting = await Voting.deploy(candidateNames, candidateImages, {
    gasLimit: 500000,
    gasPrice: gasPrice
  });

  await voting.deployed();
  console.log("Voting contract deployed to:", voting.address);

  // Salva as informações relevantes do contrato em um arquivo JSON
  const info = {
    address: voting.address,
    privateKey: deployer.privateKey,
    network: network.name
  };

  fs.writeFileSync("./task/deploy-info.json", JSON.stringify(info, null, 2));
}

// Cria uma nova task no Hardhat chamada "deploy"
// A task aceita um parâmetro posicional com o caminho do arquivo de candidatos
task("deploy", "Deploy with candidates JSON file")
  .addPositionalParam("candidatesFilePath")
  .setAction(async (taskArgs, hre) => {
    await createContract(hre.ethers, taskArgs, hre.network);
  });

module.exports = {};