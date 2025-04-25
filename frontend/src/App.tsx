import { useEffect, useState } from "react";
import { BrowserProvider, Contract, Signer } from "ethers";
import votingAbi from "./VotingABI.json"; // <- coloque o ABI aqui
const contractAddress = "0x76dc748B9c8cbd763865DfF16Eb809208F319039"; // <-- substitua pelo endereço real

interface Candidate {
  id: number;
  name: string;
  urlImage: string;
  voteCount: number;
}

export default function App() {
  const [account, setAccount] = useState<string>("");
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [votingStatus, setVotingStatus] = useState<string>("");

  // Conecta à MetaMask
  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Usando BrowserProvider para conectar à MetaMask
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        
        // Salvar as informações de conta, provedor e signer
        setAccount(await signer.getAddress());
        setProvider(provider);
        setSigner(signer);
        setVotingStatus("Connected with MetaMask!");

        const contract = new Contract(contractAddress, votingAbi.abi, provider);

        // Chamada ao método candidatesCount() de forma assíncrona
        const candidatesCount = await contract.candidatesCount();
        console.log("Candidates Count:", candidatesCount.toString()); // Log do valor
  
      } catch (err) {
        console.error(err);
        if (err instanceof Error) {
          setVotingStatus("Error: " + err.message);
        } else {
          setVotingStatus("An unknown error occurred");
        }
      }
    } else {
      alert("MetaMask not detected");
    }
  };

  // Busca candidatos
  const fetchCandidates = async () => {
    if (!provider) return;
    try {
      const contract = new Contract(contractAddress, votingAbi.abi, provider);
      const candidatesCount: number = await contract.candidatesCount();
      console.log(candidatesCount)

      const loadedCandidates: Candidate[] = [];

      for (let i = 1; i <= candidatesCount; i++) {
        const c = await contract.candidates(i);
        loadedCandidates.push({
          id: Number(c.id),
          name: c.name,
          urlImage: c.urlImage,
          voteCount: Number(c.voteCount),
        });
      }
      console.log(loadedCandidates)
      setCandidates(loadedCandidates);
    } catch (err) {
      console.error("Failed to load candidates", err);
    }
  };

  // Votar
  const vote = async (candidateId: number) => {
    if (!signer) return;
    try {
      //await register()
      const contract = new Contract(contractAddress, votingAbi.abi, signer);
      const tx = await contract.vote(candidateId);
      setVotingStatus("Voting...");
      await tx.wait();
      setVotingStatus(`Voted for candidate ${candidateId}`);
      fetchCandidates(); // Atualiza contagem
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setVotingStatus("Error: " + err.message);
      } else {
        setVotingStatus("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    if (provider) {
      fetchCandidates();
    }
  }, [provider]);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>🗳️ Sistema de Votação com MetaMask</h1>

      <button onClick={connectMetaMask}>
        {account ? `Conectado: ${account.slice(0, 6)}...` : "Conectar com MetaMask"}
      </button>

      <p>Status: {votingStatus}</p>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 20 }}>
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 10,
              padding: 16,
              width: 220,
              textAlign: "center",
            }}
          >
            <img
              src={candidate.urlImage}
              alt={candidate.name}
              style={{ width: "100%", borderRadius: 8 }}
            />
            <h3>{candidate.name}</h3>
            <p>Votos: {candidate.voteCount}</p>
            <button onClick={() => vote(candidate.id)}>Votar</button>
          </div>
        ))}
      </div>
    </div>
  );
}