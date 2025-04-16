// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        string urlImage;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;

    uint public candidatesCount;
    uint public totalVotes;

    event votedEvent(uint indexed _candidateId);

    // Modificador para garantir que a função só possa ser chamada pelo deployer
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the contract owner!");
        _;
    }

    constructor(string[] memory _names, string[] memory _urls) {
        owner = msg.sender;  // Define o proprietário como o deployer do contrato
        for (uint i = 0; i < _names.length; i++) {
            addCandidate(_names[i], _urls[i]);
        }
    }

    function addCandidate(string memory _name, string memory _urlImage) private {
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

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory candidateList = new Candidate[](candidatesCount);
        
        for (uint i = 1; i <= candidatesCount; i++) {
            candidateList[i - 1] = candidates[i];
        }

        return candidateList;
    }
}