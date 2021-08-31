import React from "react";
import { Link } from "react-router-dom";
import "./fonts/arcade-regular.ttf";
import Boba from "./images/boba-wanted.jpg";
import VaultBoy from "./images/vault-boy-wanted.jpg";
import Samus from "./images/samus-wanted.jpg";

const StartScreen = () => {
  return (
    <div id="start-screen" className="start-screen">
      <div id="instructions" className="instructions">
        <p>
          Track down these dangerous individuals so our teams can take them out!{" "}
        </p>
      </div>

      <div id="vault-boy" className="wanted-items">
        <img alt="vault boy" className="mugshot" src={VaultBoy} />
        <img alt="samus from metroid" className="mugshot" src={Samus} />
        <img alt="boba fett" className="mugshot" src={Boba} />
      </div>

      <Link to="/GameBoard">
        <button id="game-start" className="start-button">
          START GAME
        </button>
      </Link>
    </div>
  );
};
export default StartScreen;
