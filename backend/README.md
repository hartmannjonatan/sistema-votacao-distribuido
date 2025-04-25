# Rodando o backend

## instale as dependências
`npm install`

## Compile o contrato
`npx hardhat compile`

## Rodando localmente em rede hardhat
- Crie um arquivo .env com a informação `PRIVATE_KEY` referente à conta da MetaMask a ser usada no deploy
- Execute:
`npx hardhat node`
`npx hardhat deploy --network hardhat PATH_TO_CANDIDATES_JSON_FILE`
- Note que nesse caso, para votar é necessário utilizar alguma das contas criadas pelo hardhat (com ETH)

## Rodando na rede Ethereum Sepolia
- Crie um arquivo .env com as seguintes informações `SEPOLIA_RPC_URL` e `PRIVATE_KEY` referente à conta Sepolia criada (recomendamos usar Alchemy)
- É importante que a conta referente à `PRIVATE_KEY` tenha ETH na rede sepolia, pode ser obtido pelo Google Cloud: https://cloud.google.com/application/web3/faucet/ethereum/sepolia
- Execute: `npx hardhat deploy --network sepolia PATH_TO_CANDIDATES_JSON_FILE`
- Note que nesse caso, para votar é necessário utilizar alguma conta com ETH na rede Sepolia

## Para limpar arquivos gerados
`make clean`