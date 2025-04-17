const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.attach(contractAddress);

  try {
    const count = await voting.candidatesCount();
    console.log("Total de candidatos:", count.toString());
  } catch (error) {
    console.error("Erro ao acessar o método candidatesCount:", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
