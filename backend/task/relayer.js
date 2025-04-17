const express = require("express");
const { ethers } = require("ethers");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

function startRelayer() {
  return new Promise((resolve, reject) => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    const ABI = [
      "function register(address user) public",
    ];

    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    const deployInfoPath = path.resolve(__dirname, "../task/deploy-info.json");
    if (!fs.existsSync(deployInfoPath)) {
      return reject(new Error("Arquivo deploy-info.json não encontrado"));
    }

    const deployInfo = require(deployInfoPath);
    const PRIVATE_KEY = deployInfo.privateKey;

    if (!PRIVATE_KEY) {
      return reject(new Error("Chave privada ausente em deploy-info.json"));
    }

    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(deployInfo.address, ABI, signer);

    app.post("/register", async (req, res) => {
      const { address, signature } = req.body;
      const message = `Registrar ${address}`;
      const recovered = ethers.utils.verifyMessage(message, signature);

      if (recovered.toLowerCase() !== address.toLowerCase()) {
        return res.status(400).json({ error: "Assinatura inválida" });
      }

      try {
        const tx = await contract.register(address);
        await tx.wait();
        res.json({ success: true, tx: tx.hash });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao registrar" });
      }
    });

    const PORT = 8546;

    const server = app.listen(PORT, () => {
      console.log(`Relayer rodando em http://localhost:${PORT}`);
    });
  });
}

module.exports = { startRelayer };
