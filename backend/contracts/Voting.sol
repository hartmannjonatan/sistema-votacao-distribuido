// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Contrato inteligente de votação simples
contract Voting {

    // Estrutura que representa um candidato
    struct Candidate {
        uint id;
        string name;
        string urlImage;
        uint voteCount;
    }

    // Mapeamento de ID do candidato para a estrutura do candidato
    mapping(uint => Candidate) public candidates;

    // Mapeamento de endereço (wallet) para status de votação
    // Impede que um mesmo endereço vote mais de uma vez
    mapping(address => bool) public voters;

    uint public candidatesCount;
    uint public totalVotes;

    // Evento disparado sempre que um voto é registrado
    event votedEvent(uint indexed _candidateId);

    // Construtor do contrato, executado uma única vez no deploy
    // Recebe arrays com nomes e URLs das imagens dos candidatos
    constructor(string[] memory _names, string[] memory _urls){
        require(_names.length == _urls.length, "Dados inconsistentes");

        for (uint i = 0; i < _names.length; i++) {
            _addCandidate(_names[i], _urls[i]);
        }
    }

    // Função interna (privada) que adiciona um candidato ao mapeamento
    function _addCandidate(string memory _name, string memory _urlImage) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _urlImage, 0);
    }

    // Função pública que permite a um endereço votar em um candidato
    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate.");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        totalVotes++;

        emit votedEvent(_candidateId);
    }
}
