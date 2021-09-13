import React from "react";
import { Link } from "react-router-dom";

const AlertWindow = (props) => {
  let windowText = props.alertWindowText;
  let windowDisplay = props.alertWindowDisplay;
  let gameOver = props.gameFinished;

  let button = (
    <button className="alert-button" onClick={() => props.dismiss()}>
      Sweet
    </button>
  );

  function setWindowDisplay() {
    if (windowDisplay) {
      return "flex";
    } else {
      return "none";
    }
  }

  if (gameOver) {
    button = (
      <Link to="/wheres-waldo-app/HighScores">
        {" "}
        <button className="alert-button">See Your Score!</button>
      </Link>
    );
  }

  let windowStyle = {
    alignItems: "center",
    backgroundColor: "rgba(38, 95, 60, 0.788)",
    border: "1px dotted white",
    borderTop: "solid 8px white",
    color: "white",
    display: setWindowDisplay(),
    fontSize: "2em",
    fontFamily: '"ArcadeRegular", "Times New Roman"',
    flexDirection: "column",
    height: "400px",
    justifyContent: "space-around",
    width: "600px",
    position: "fixed",
    top: "50%",
    left: "50%",
    zIndex: "4",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div id="alert-window" style={windowStyle}>
      {windowText}
      <br />
      <br />
      {button}
    </div>
  );
};
export default AlertWindow;
