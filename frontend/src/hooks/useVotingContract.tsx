import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { BrowserProvider, Contract, JsonRpcSigner } from "ethers";
import votingAbi from "../VotingABI.json";

// Tipagem do contexto para fornecer o contrato e funcionalidades relacionadas à votação
interface VotingContractContextType {
  contract: Contract | null; // Instância do contrato conectado
  provider: BrowserProvider | null; // Provedor que conecta ao Ethereum via MetaMask
  signer: JsonRpcSigner | null; // Assinador, necessário para transações que alteram o estado
  account: string | null; // Endereço da conta conectada
  isAuthenticated: boolean; // Se o usuário está autenticado (baseado em localStorage)
  isVoted: boolean; // Se o usuário já votou
  connectMetaMask: (contractAddress: string) => Promise<void>; // Função para conectar MetaMask e o contrato
}

// Criação do contexto para o contrato de votação
const VotingContractContext = createContext<
  VotingContractContextType | undefined
>(undefined);

interface VotingContractProviderProps {
  children: ReactNode;
}

// Provedor que encapsula o estado e a lógica de conexão com o contrato inteligente
export const VotingContractProvider = ({
  children,
}: VotingContractProviderProps) => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isVoted, setIsVoted] = useState<boolean>(false);

  // Função para conectar o usuário ao MetaMask e ao contrato inteligente
  const connectMetaMask = async (contractAddress: string) => {
    // Verifica se tem a extensão instalada
    if (typeof window.ethereum !== "undefined") {
      try {
        const browserProvider = new BrowserProvider(window.ethereum); // Cria um provider baseado na extensão MetaMask
        await browserProvider.send("eth_requestAccounts", []); // Solicita ao usuário permissão para conectar contas
        const signer = await browserProvider.getSigner(); // Obtém o signer (usuário conectado)
        const address = await signer.getAddress(); // Obtém o endereço da conta conectada

        // Verifica se o endereço realmente possui um contrato
        const code = await browserProvider.getCode(contractAddress);
        if (code === "0x" || code === "0x0") {
          throw new Error("Contract does not exist at the specified address.");
        }

        // Cria uma nova instância do contrato com ABI e signer (para ler e escrever no contrato)
        const contractInstance = new Contract(
          contractAddress,
          // Arquivo gerado quando o contrato é compilado, definindo sua interface e possíveis transações
          votingAbi.abi,
          signer
        );

        // Verifica se o usuário já votou — lê diretamente do contrato
        const isVoted = await contract?.voters(account);

        // Atualiza estados locais
        setProvider(browserProvider);
        setSigner(signer);
        setAccount(address);
        setContract(contractInstance);
        setIsVoted(isVoted);

        // Salva o endereço do contrato em cache
        localStorage.setItem("contractAddress", contractAddress);
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Executado uma vez para tentar reconectar automaticamente com MetaMask (ao recarregar a página, por exemplo)
  useEffect(() => {
    const autoConnect = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const browserProvider = new BrowserProvider(window.ethereum); // Cria um provider baseado na MetaMask
          const accounts = await browserProvider.send("eth_accounts", []); // Pega as contas já conectadas
          if (accounts.length > 0) {
            const signer = await browserProvider.getSigner(); // Obtém o signer da conta conectada

            // Cria uma nova instância do contrato com o endereço salvo anteriormente em cache
            const contractInstance = new Contract(
              localStorage.getItem("contractAddress")!!,
              votingAbi.abi,
              signer
            );

            // Verifica se o usuário já votou, mesmo após reconexão
            const isVoted = await contract?.voters(account);

            setProvider(browserProvider);
            setSigner(signer);
            setContract(contractInstance);
            setAccount(accounts[0]);
            setIsVoted(isVoted);
          }
        } catch (err) {
          console.error("Erro ao tentar reconectar automaticamente:", err);
        }
      }
    };

    autoConnect();
  });

  // Provider disponibiliza o contexto para os componentes filhos
  return (
    <VotingContractContext.Provider
      value={{
        contract,
        provider,
        signer,
        account,
        isAuthenticated: !!localStorage.getItem("contractAddress"),
        isVoted,
        connectMetaMask,
      }}
    >
      {children}
    </VotingContractContext.Provider>
  );
};

// Hook personalizado que fornece acesso fácil ao contexto de votação
export const useVotingContract = (): VotingContractContextType => {
  const context = useContext(VotingContractContext);
  if (!context) {
    throw new Error(
      "useVotingContract must be used within a VotingContractProvider"
    );
  }
  return context;
};
