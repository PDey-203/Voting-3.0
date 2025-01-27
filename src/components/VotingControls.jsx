import React from "react";
import { toast } from "react-toastify";
import "./VotingControls.css"

import { Box, Typography, Button } from "@mui/material";

function VotingControls({ contract, votingActive, setVotingActive }) {
    const startVoting = async () => {
        try {
            const tx = await contract.startVoting();
            await tx.wait();
            setVotingActive(true);
            toast.success("Voting started!");
        } catch (error) {
            toast.error("Error starting voting: " + error.message);
        }
    };

    const endVoting = async () => {
        try {
            const tx = await contract.endVoting();
            await tx.wait();
            setVotingActive(false);
            toast.success("Voting ended!");
        } catch (error) {
            toast.error("Error ending voting: " + error.message);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                padding: 3,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                marginTop: 4,
            }}
        >
            <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "center" }}
            >
                Voting Controls
            </Typography>
            {votingActive ? (
                <Button
                    variant="contained"
                    color="error"
                    onClick={endVoting}
                    sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        paddingX: 4,
                        fontSize: "1rem",
                    }}
                >
                    End Voting
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={startVoting}
                    sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        paddingX: 4,
                        fontSize: "1rem",
                    }}
                >
                    Start Voting
                </Button>
            )}
        </Box>
    );
}

export default VotingControls;
