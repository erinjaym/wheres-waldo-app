import React from "react";
import { Link } from "react-router-dom";

const HighScores = () => {

    let highScores = "Import data from firebase server";

return (
    <div className="high-scores-page">
        <div>High Scores!</div>
        <li>{highScores}</li>
       <Link to="/"> <button className="alert-button">Return to Start Screen</button> </Link>
        <Link to="/GameBoard"><button className="alert-button">Play Again</button></Link>
    </div>
);

}

export default HighScores;