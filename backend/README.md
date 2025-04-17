# Rodando o backend

## instale as dependências
`npm install`

## crie um nodo local com hardhat
`npx hardhat compile`
`npx hardhat node`

## faça o deploy do contrato e do relayer
`npx hardhat deploy --network localhost PATH_TO_CANDIDATES_JSON_FILE`

## console para debug
`npx hardat console --network localhost`