import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

type Candidate = {
  id: bigint;
  name: string;
  urlImage: string;
  voteCount: bigint;
};

const CONTRACT_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678'; // RECEBER ISSO DO FRONT (USUÁRIO DIGITA O QUE FOR EXIBIDO NO DEPLOY)

const CONTRACT_ABI = [
  {
    inputs: [],
    name: 'getCandidates',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'string', name: 'name', type: 'string' },
          { internalType: 'string', name: 'urlImage', type: 'string' },
          { internalType: 'uint256', name: 'voteCount', type: 'uint256' },
        ],
        internalType: 'struct Voting.Candidate[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_candidateId', type: 'uint256' }],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const App: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<bigint | null>(null);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCandidates = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        try {
          const result: Candidate[] = await contract.getCandidates();
          setCandidates(result);
        } catch (err) {
          console.error("Erro ao carregar candidatos:", err);
        }

        setLoading(false);
      } else {
        alert("MetaMask não detectado.");
      }
    };

    loadCandidates();
  }, []);

  const handleVote = async () => {
    if (selectedCandidateId === null) return;

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask não está disponível.");
      }
      
      const provider = new ethers.BrowserProvider(window.ethereum!);
      
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.vote(selectedCandidateId);
      await tx.wait();
      alert("Voto realizado com sucesso!");
      setVoted(true);
    } catch (err) {
      console.error("Erro ao votar:", err);
    }
  };

  if (loading) return <p>Carregando candidatos...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sistema de Votação</h1>
      {voted ? (
        <p className="text-green-600 font-semibold">Você já votou!</p>
      ) : (
        <>
          {candidates.map((candidate) => (
            <div key={candidate.id.toString()} className="flex items-center gap-4 my-2">
              <img src={candidate.urlImage} alt={candidate.name} className="w-12 h-12 rounded-full" />
              <label>
                <input
                  type="radio"
                  name="candidate"
                  value={candidate.id.toString()}
                  onChange={() => setSelectedCandidateId(candidate.id)}
                  className="mr-2"
                />
                {candidate.name} — {candidate.voteCount.toString()} votos
              </label>
            </div>
          ))}
          <button
            onClick={handleVote}
            disabled={selectedCandidateId === null}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Votar
          </button>
        </>
      )}
    </div>
  );
};

export default App;