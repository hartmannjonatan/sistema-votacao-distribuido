# 🚀 dApp de Votação Distribuída com Blockchain

Este trabalho tem como objetivo explorar o conceito de **blockchain** na prática, criando um **dApp (Aplicativo Descentralizado)** de votação distribuída. A solução é composta por três partes principais: o frontend em **React**, o backend com **Solidity** e **Hardhat**, e a rede privada Ethereum usando **Hyperledger Besu**.

Abaixo está a descrição geral da organização do projeto, com destaque para as partes desacopladas, permitindo o uso do contrato e do script de deploy em outras redes blockchain além da rede local.

## 🎯 Objetivo do Projeto

Explorar o conceito de **blockchain** na prática, criando um dApp de **votação distribuída**. O objetivo é permitir que usuários possam votar em propostas de maneira segura, transparente e descentralizada, utilizando a tecnologia blockchain.

A arquitetura do sistema é composta por três componentes principais:

1. **Frontend**: Interface do usuário do dApp, feita em React, que se conecta ao contrato inteligente na blockchain através do MetaMask.
2. **Backend**: Contrato inteligente em **Solidity**, que gerencia a lógica da votação e o armazenamento dos votos. O deploy do contrato pode ser feito em uma rede privada ou pública usando **Hardhat**.
3. **Rede Ethereum Privada**: Uma rede blockchain privada simples, criada usando **Hyperledger Besu**, que pode ser utilizada para testar o dApp localmente.

## 🗂 Organização dos Arquivos

O projeto está estruturado da seguinte forma:

### 1. `frontend/` 💻

Contém o **frontend do dApp** feito em **React**. Este diretório é responsável por interagir com o contrato inteligente, usando o **MetaMask** para se conectar à blockchain.

* **README** dentro deste diretório fornece informações detalhadas sobre como rodar o frontend, configurar o MetaMask e interagir com o contrato inteligente.

### 2. `backend/` 🔧

Contém o **contrato inteligente em Solidity** e o **script de deploy** usando o **Hardhat**. O contrato gerencia a lógica da votação e possibilita que os votos sejam registrados na blockchain.

* **README** dentro deste diretório explica como compilar e implantar o contrato, como configurar o Hardhat e como fazer o deploy tanto na rede local (usando a rede privada criada no diretório `ethereum-private/`) quanto em uma rede pública como a **Sepolia**.

### 3. `ethereum-private/` 🌐

Contém o **Makefile** para criar uma **rede privada Ethereum** usando o **Hyperledger Besu**. 

* **README** dentro deste diretório oferece detalhes sobre como criar e configurar a rede privada, rodar os containers do Besu, e conectar os nós para criar uma rede funcional de blockchain local.

## 🔗 Integração Entre as Partes

* **Frontend**: O dApp React se conecta ao contrato inteligente usando a MetaMask, que interage com a blockchain.
* **Backend**: O contrato inteligente é implementado e implantado via **Hardhat**. O deploy pode ser feito tanto em uma rede local privada, criada com o Besu, quanto em uma rede pública, como a Sepolia.
* **Rede Ethereum Privada**: A rede local Ethereum pode ser criada facilmente utilizando o Makefile e o Besu, proporcionando um ambiente controlado para testes. A criação dessa rede é separada do backend e frontend, sendo opcional para quem deseja testar localmente.

## 📝 Como Rodar

Cada diretório contém um **README** explicando em detalhes como executar e configurar sua respectiva parte:

* **Frontend**: Instruções para configurar o projeto em React e conectar à MetaMask.
* **Backend**: Explicação sobre como compilar e fazer o deploy do contrato usando Hardhat.
* **Ethereum-Private**: Detalhes sobre como configurar e executar a rede privada Ethereum com Besu.

<hr>

## ✍️ Autores

Este projeto foi desenvolvido como parte da disciplina Computação Distribuída, do curso de Ciência da Computação - UFSC, com a colaboração dos seguintes alunos:
- Diego Meditsch
- Henrique Mateus Teodoro
- Jonatan Hartmann
- Victória Rodrigues