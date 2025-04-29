import { useVotingContract } from "./useVotingContract";

export function useVote() {
  const { contract } = useVotingContract();

  const vote = async (candidateId: number) => {
    if (!contract) return;
    try {
      const tx = await contract?.vote(candidateId);
      await tx.wait();
    } catch (err) {
      console.error("Failed to vote", err);
    }
  };

  return { vote };
}
