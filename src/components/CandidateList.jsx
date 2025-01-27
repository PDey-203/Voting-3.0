import React from "react";
import { toast } from "react-toastify";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
} from "@mui/material";
import "./CandidateList.css"

function CandidateList({ candidates, contract, votingActive }) {
    const handleVote = async (candidateId) => {
        try {
            const tx = await contract.vote(candidateId);
            await tx.wait();
            toast.success("Vote cast successfully!");
        } catch (error) {
            toast.error("Error voting: " + error.message);
        }
    };

    return (
        <Box sx={{ marginTop: 4 }}>
            <Typography
                variant="h5"
                component="h3"
                gutterBottom
                textAlign="center"
                sx={{ fontWeight: "bold" }}
            >
                Candidate List
            </Typography>
            <Grid container spacing={3}>
                {candidates.map((candidate, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    component="h4"
                                    sx={{ fontWeight: "bold", mb: 1 }}
                                >
                                    {candidate.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                </Typography>
                            </CardContent>
                            {votingActive && (
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                            handleVote(candidate.id)
                                        }
                                        fullWidth
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Vote
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default CandidateList;
