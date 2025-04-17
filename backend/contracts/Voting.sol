// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        string urlImage;
        uint voteCount;
    }

    receive() external payable {}

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    mapping(address => bool) public registered;

    uint public candidatesCount;
    uint public totalVotes;
    address public owner;

    event votedEvent(uint indexed _candidateId);

    constructor(string[] memory _names, string[] memory _urls) payable {
        require(_names.length == _urls.length, "Dados inconsistentes");

        owner = payable(msg.sender);

        for (uint i = 0; i < _names.length; i++) {
            _addCandidate(_names[i], _urls[i]);
        }
    }

     function register(address user) public {
        require(!registered[user], "Ja registrado");

        registered[user] = true;

        // Certifique-se de que o contrato tem ether antes de transferir
        require(address(this).balance >= 0.001 ether, "Contrato sem saldo suficiente");
        
        payable(user).transfer(0.001 ether);
    }

    function _addCandidate(string memory _name, string memory _urlImage) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _urlImage, 0);
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate.");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        totalVotes++;

        emit votedEvent(_candidateId);
    }
}
