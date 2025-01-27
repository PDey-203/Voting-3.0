import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import VotingContract from "./artifacts/contracts/DecentralizedVoting.sol/DecentralizedVoting.json";
import AddCandidate from "./components/AddCandidate.jsx";
import CandidateList from "./components/CandidateList";
import VotingControls from "./components/VotingControls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"

import { Box, Typography, Paper, Container} from "@mui/material";

const CONTRACT_ADDRESS = "0x09fE1D1DE1481E1F8BE22C91B028c0304910Fbf5";

function App() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [votingActive, setVotingActive] = useState(false);
    const [votes, setTotalVotes] = useState(0);

    useEffect(() => {
        const initBlockchain = async () => {
            if (window.ethereum) {
                try {
                    const web3Provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = web3Provider.getSigner();
                    const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingContract.abi, await signer);

                    setProvider(web3Provider);
                    setSigner(signer);
                    setContract(contract);

                    const address = await (await signer).getAddress();
                    setAccount(address);

                    const votingStatus = await contract.votingActive();
                    setVotingActive(votingStatus);

                    const votes = await contract.totalVotes();
                    setTotalVotes(votes.toNumber());

                    const candidateCount = await contract.candidatesCount();
                    const loadedCandidates = [];
                    for (let i = 1; i <= candidateCount; i++) {
                        const candidate = await contract.getCandidate(i);
                        loadedCandidates.push(candidate);
                    }
                    setCandidates(loadedCandidates);
                } catch (error) {
                    toast.error("Error connecting to contract: " + error.message);
                }
            } else {
                toast.error("MetaMask not detected. Please install MetaMask.");
            }
        };

        initBlockchain();
    }, []);

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: "24px", marginTop: "24px" }}>
                <Typography variant="h3" textAlign="center" gutterBottom>
                    Decentralized Voting System
                </Typography>
                <Typography variant="body1" textAlign="center" color="text.secondary" gutterBottom>
                    Connected Account: <strong>{account || "Not Connected"}</strong>
                </Typography>

                <Box sx={{ my: 4 }}>
                    <VotingControls
                        contract={contract}
                        votingActive={votingActive}
                        setVotingActive={setVotingActive}
                    />
                </Box>

                <Box sx={{ mb: 4 }}>
                    <AddCandidate contract={contract} />
                </Box>
                {candidates.length > 0 ? (
                    <CandidateList
                        contract={contract}
                        candidates={candidates}
                        votingActive={votingActive}
                    />
                ) : (
                    <Box textAlign="center" mt={2}>
                        No Candidates found!
                    </Box>
                )}

                <Box textAlign="center" mt={4}>
                    <Typography variant="h6" color="text.primary">
                        Total Votes Cast: {votes}
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default App;
