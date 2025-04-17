import { JsonRpcProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import * as fs from "fs";

// Caminho do ABI gerado pelo Hardhat
const abiPath = "./artifacts/contracts/Voting.sol/Voting.json";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main() {
  // Lê o JSON e extrai a ABI
  const contractJson = JSON.parse(fs.readFileSync(abiPath, "utf8"));
  const abi = contractJson.abi;

  // Conecta ao Hardhat node local
  const provider = new JsonRpcProvider("http://localhost:8545");

  // Cria instância do contrato
  const contract = new ethers.Contract(contractAddress, abi, provider);

  // Chama candidatesCount
  const count = await contract.candidatesCount;
  console.log("🧾 Total de candidatos:", count.toString());
}

main().catch((err) => {
  console.error("❌ Erro ao executar o script:", err);
});
