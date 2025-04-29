import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { BrowserProvider, Contract, JsonRpcSigner } from "ethers";
import votingAbi from "../VotingABI.json";

interface VotingContractContextType {
  contract: Contract | null;
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  account: string | null;
  isAuthenticated: boolean;
  isVoted: boolean;
  connectMetaMask: (contractAddress: string) => Promise<void>;
}

const VotingContractContext = createContext<
  VotingContractContextType | undefined
>(undefined);

interface VotingContractProviderProps {
  children: ReactNode;
}

export const VotingContractProvider = ({
  children,
}: VotingContractProviderProps) => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isVoted, setIsVoted] = useState<boolean>(false);

  const connectMetaMask = async (contractAddress: string) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const browserProvider = new BrowserProvider(window.ethereum);
        await browserProvider.send("eth_requestAccounts", []);
        const signer = await browserProvider.getSigner();
        const address = await signer.getAddress();

        const code = await browserProvider.getCode(contractAddress);
        if (code === "0x" || code === "0x0") {
          throw new Error("Contract does not exist at the specified address.");
        }

        const contractInstance = new Contract(
          contractAddress,
          votingAbi.abi,
          signer
        );

        const isVoted = await contract?.voters(account);

        setProvider(browserProvider);
        setSigner(signer);
        setAccount(address);
        setContract(contractInstance);
        setIsVoted(isVoted);

        localStorage.setItem("contractAddress", contractAddress);
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    const autoConnect = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const browserProvider = new BrowserProvider(window.ethereum);
          const accounts = await browserProvider.send("eth_accounts", []);
          if (accounts.length > 0) {
            const signer = await browserProvider.getSigner();
            const contractInstance = new Contract(
              localStorage.getItem("contractAddress")!!,
              votingAbi.abi,
              signer
            );

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

export const useVotingContract = (): VotingContractContextType => {
  const context = useContext(VotingContractContext);
  if (!context) {
    throw new Error(
      "useVotingContract must be used within a VotingContractProvider"
    );
  }
  return context;
};
