import { useVotingContract } from "./useVotingContract";

// Hook customizado responsável por executar a ação de voto em um candidato usando o contrato inteligente.
export function useVote() {
  const { contract } = useVotingContract(); // Obtém o contrato de votação da context API

  // Função para votar em um candidato específico
  const vote = async (candidateId: number) => {
    if (!contract) return; // Se o contrato não estiver disponível, interrompe a execução
    try {
      const tx = await contract?.vote(candidateId); // Envia a transação de voto para o contrato inteligente
      await tx.wait(); // Aguarda a confirmação da transação na blockchain
    } catch (err) {
      console.error("Failed to vote", err);
    }
  };

  // Retorna a função de votação para ser usada em componentes
  return { vote };
}
