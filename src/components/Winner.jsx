import React, { useState } from "react";
import { toast } from "react-toastify";

function Winner({ contract }) {
    const [winner, setWinner] = useState("");

    const fetchWinner = async () => {
        try {
            const [name, votes] = await contract.getWinner();
            setWinner(`${name} with ${votes.toString()} votes`);
        } catch (error) {
            toast.error("Error fetching winner: " + error.message);
        }
    };

    return (
        <div>
            <h3>Winner</h3>
            <button onClick={fetchWinner}>Get Winner</button>
            {winner && <p>{winner}</p>}
        </div>
    );
}

export default Winner;
