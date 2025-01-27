import React, { useState } from "react";
import { toast } from "react-toastify";
import "./AddCandidate.css"

import { Box, TextField, Button, Typography } from "@mui/material";

function AddCandidate({ contract }) {
    const [name, setName] = useState("");

    const addCandidate = async () => {
        try {
            const tx = await contract.addCandidate(name);
            await tx.wait();
            toast.success(`Candidate "${name}" added successfully!`);
            setName("");
        } catch (error) {
            toast.error("Error adding candidate: " + error.message);
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
            }}
        >
            <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ fontWeight: "bold", textAlign: "center" }}
            >
                Add Candidate
            </Typography>
            <TextField
                label="Candidate Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{
                    maxWidth: 500,
                }}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={addCandidate}
                disabled={!name.trim()}
                sx={{
                    paddingX: 4,
                    textTransform: "none",
                }}
            >
                Add Candidate
            </Button>
        </Box>
    );
}

export default AddCandidate;
