import React from "react";
import { Link } from "react-router-dom";

const HighScores = () => {
  let highScores =
    "Import data from firebase server ...Check back for time run and firebase integration";

  return (
    <div className="high-scores-page">
      <div>High Scores!</div>
      <li>{highScores}</li>
      <Link to="/">
        {" "}
        <button className="alert-button">Return to Start Screen</button>{" "}
      </Link>
      <Link to="/GameBoard">
        <button className="alert-button">Play Again</button>
      </Link>
    </div>
  );
};

export default HighScores;
