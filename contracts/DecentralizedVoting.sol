// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract DecentralizedVoting
{
    struct Candidate
    {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) internal voters;

    uint256 public candidatesCount;
    uint256 public totalVotes;
    address internal owner;
    bool public votingActive;

    event CandidateAdded(uint256 indexed id, string name);
    event Voted(uint256 indexed candidateId, address indexed voter);
    event VotingStarted();
    event VotingEnded();

    constructor()
    {
        owner = msg.sender;
        votingActive = false;
    }

    modifier onlyOwner()
    {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    modifier onlyWhileVotingActive()
    {
        require(votingActive, "Voting is not active.");
        _;
    }

    function addCandidate(string memory _name) public onlyOwner
    {
        candidates[candidatesCount++] = Candidate(candidatesCount, _name, 0);
        emit CandidateAdded(candidatesCount, _name);
    }

    function startVoting() public onlyOwner
    {
        require(!votingActive, "Voting is already active.");
        votingActive = true;
        emit VotingStarted();
    }

    function endVoting() public onlyOwner
    {
        require(votingActive, "Voting is not active.");
        votingActive = false;
        emit VotingEnded();
    }

    function vote(uint256 _candidateId) public onlyWhileVotingActive
    {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");

        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        totalVotes++;

        emit Voted(_candidateId, msg.sender);
    }

    function getCandidate(uint256 _candidateId) public view returns (Candidate memory) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");
        return candidates[_candidateId];
    }

    function getWinner() public onlyOwner view returns (string memory winnerName, uint256 winnerVoteCount) {
        require(totalVotes > 0, "No votes cast yet.");

        uint256 winningVoteCount = 0;
        uint256 winnerId;

        for (uint256 i = 1; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winnerId = i;
            }
        }

        winnerName = candidates[winnerId].name;
        winnerVoteCount = winningVoteCount;
    }
}
