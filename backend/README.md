# Backend - Voting DApp

Este diretório contém o código backend para o contrato inteligente de votação. Aqui você encontrará instruções para compilar e fazer o deploy do contrato em uma rede local ou na rede Ethereum Sepolia.

---
## 📁 Estrutura de Arquivos
Abaixo está a estrutura de diretórios do projeto e a função de cada item:

```
├── candidates.json              # Arquivo JSON de exemplo com a lista de candidatos (nome e URL da imagem)
├── contracts/
│   └── Voting.sol              # Contrato inteligente de votação escrito em Solidity
├── hardhat.config.js           # Configuração principal do Hardhat (rede, plugins, paths, etc.)
├── Makefile                    # Script utilitário com comandos prontos (como `make clean`)
├── package.json                # Gerenciador de dependências e scripts do projeto Node.js
├── README.md                   # Documentação e instruções de uso do backend
├── task/
│   ├── deploy-info.json        # Arquivo gerado com informações do último deploy (endereço, rede, etc.)
│   └── deploy.js               # Script de deploy customizado via Hardhat Task
└── tsconfig_pass.json          # Configuração do TypeScript para compatibilidade com Hardhat
```

## 📦 Instalação de dependências

Instale as dependências com o seguinte comando:

```bash
npm install
```

## 🔨 Compilando o contrato

Compile o contrato com

```bash
npx hardhat compile
```

## 🧪 Executando localmente (rede Hardhat)
1. Crie um arquivo `.env` na raiz do projeto com a seguinte variável:
- `PRIVATE_KEY`: chave privada para o deploy do contrato.
2. Inicie um nó local da Hardhat:
```bash
npx hardhat node
```
3. Em outro terminal, faça o deploy:
```bash
npx hardhat deploy --network hardhat PATH_PARA_O_ARQUIVO_JSON_DE_CANDIDATOS
```
> ⚠️ Importante: para interagir com o contrato (votar), utilize uma das contas geradas automaticamente pelo Hardhat, pois elas possuem ETH fictício.

## 🌐 Executando na rede Ethereum Sepolia
1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
- `PRIVATE_KEY`: chave privada para o deploy do contrato.
- `SEPOLIA_RPC_URL`: seu endpoint na rede sepolia.
> 💡 Recomendamos usar o [Alchemy](https://alchemy.com) para obter o RPC da Sepolia.

2. Certifique-se de que a conta (relacionada à `PRIVATE_KEY`) possui ETH na rede Sepolia. Você pode obter ETH gratuito usando o [faucet oficial do Google Cloud](https://cloud.google.com/application/web3/faucet/ethereum/).
3. Faça o deploy do contrato:
```bash
npx hardhat deploy --network spolia PATH_PARA_O_ARQUIVO_JSON_DE_CANDIDATOS
```
> ⚠️ Atenção: para interagir com o contrato na Sepolia, use uma conta que possua ETH real na rede de testes.

## 🧹 Limpando arquivos gerados
Para remover arquivos gerados (como `artifacts`, `cache`, etc), execute:
```bash
make clean
```