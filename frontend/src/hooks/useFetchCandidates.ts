import { useState } from "react";
import { useVotingContract } from "./useVotingContract";
import { CandidatoModel } from "../features/votar/votar-model";

interface FetchCandidatesProps {
  candidates: CandidatoModel[];
  fetchCandidates: () => Promise<void>;
}

// Hook customizado responsável por buscar os candidatos da blockchain e fornecer seus dados.
// Ele utiliza o contrato de votação (de `useVotingContract`) para interagir com os candidatos e
// obter as informações necessárias, como nome, imagem e contagem de votos.
export function useFetchCandidates(): FetchCandidatesProps {
  const { contract } = useVotingContract(); // Obtém o contrato de votação
  const [candidates, setCandidates] = useState<CandidatoModel[]>([]);

  // Função para buscar os candidatos da blockchain
  const fetchCandidates = async () => {
    if (!contract) return; // Se o contrato não existir, não faz nada
    try {
      // Obtém a quantidade total de candidatos
      const candidatesCount: number = await contract?.candidatesCount();
      const loadedCandidates: CandidatoModel[] = [];

      // Itera sobre todos os candidatos e busca suas informações
      for (let i = 1; i <= candidatesCount; i++) {
        const c = await contract?.candidates(i);
        loadedCandidates.push({
          id: Number(c.id),
          name: c.name,
          urlImage: c.urlImage,
          voteCount: Number(c.voteCount),
        });
      }
      setCandidates(loadedCandidates);
    } catch (err) {
      console.error("Failed to fetch candidates", err);
    }
  };

  return { candidates, fetchCandidates }; // Retorna os candidatos e a função para buscar os candidatos
}
