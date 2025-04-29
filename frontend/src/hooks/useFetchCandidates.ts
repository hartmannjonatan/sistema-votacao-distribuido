import { useState } from "react";
import { useVotingContract } from "./useVotingContract";
import { CandidatoModel } from "../features/votar/votar-model";

interface FetchCandidatesProps {
  candidates: CandidatoModel[];
  fetchCandidates: () => Promise<void>;
}

export function useFetchCandidates(): FetchCandidatesProps {
  const { contract } = useVotingContract();
  const [candidates, setCandidates] = useState<CandidatoModel[]>([]);

  const fetchCandidates = async () => {
    if (!contract) return;
    try {
      const candidatesCount: number = await contract?.candidatesCount();
      const loadedCandidates: CandidatoModel[] = [];

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

  return { candidates, fetchCandidates };
}
