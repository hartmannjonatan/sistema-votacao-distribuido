# 🌐 Rede Local Blockchain com Besu

Este projeto configura e gerencia uma rede blockchain privada usando o **Hyperledger Besu** com o algoritmo de consenso **Clique**.

## Requisitos 📋

Antes de começar, verifique se você tem os seguintes requisitos:

* **Docker**: O projeto utiliza o Docker para criar e gerenciar os containers da rede. Se não tiver o Docker instalado, siga a [documentação oficial do Docker](https://docs.docker.com/get-docker/) para instalação.

## Como Funciona ⚙️

1. **Nó Gênesis**: O nó gerador é o primeiro nó da rede, responsável por criar a rede e permitir a adição de outros nós.
2. **Nó Validador**: Nós validadores são adicionados ao nó gênesis para validar transações e manter o consenso da rede.
3. **Proposta de Validador**: Um nó validador pode ser proposto e adicionado à lista de validadores do clique.

## 🚀 Como Usar

### 1. Inicializar o Docker

Se o serviço docker não tiver iniciado, inicialize-o com:

```bash
sudo systemctl start docker
```

### 2. Criar a Rede Blockchain com o Makefile

Use os alvos do Makefile para configurar os nós da rede.

#### Criar o Nó Gênesis

```bash
make genesis
```

Isso criará o nó gênesis da rede privada, incluindo a geração da chave privada.

#### Adicionar um Nó Validador

Se você quiser adicionar um nó validador, use o seguinte comando, passando o **enode** do nó gênesis:

```bash
make validator GENESIS_NODE_ADDRESS=<ENODE_DO_NÓ_GENESIS>
```

#### Propor um Validador

Se você deseja adicionar um nó validador à rede, execute:

```bash
make propose-validator GENESIS_IP=<IP_DO_NÓ_GENESIS> VALIDATOR_ADDRESS=<ENDEREÇO_DO_NÓ_VALIDADOR>
```

#### Limpar os Containers

Para remover os containers criados:

```bash
make clean-genesis
make clean-validator
```
