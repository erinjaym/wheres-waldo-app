import React from "react";
import SamusHint from "./images/samus.png";
import VaultBoyHint from "./images/vault-boy.png";
import BobaHint from "./images/boba.png";
import Assignment from "./images/assignment.svg";
import { useState, useEffect } from "react";

const GameLegend = () => {

    function showHints () {
        // let hints = document.getElementsById("hint-pic"); < ... change to a hook ??
        // hints.style.display = "inline-block";
      }

return ( 
<div id="legend" className="legend">
    <img src={Assignment} />

    <p style={ {textAlign: "center"} }> Who you need to hunt!</p>
    <li>
    Samus   <br /> 
   <div id="hint1"><img id="hint-pic" className="hint-pic" src={SamusHint} /> </div>
    </li>
    <li>
    Vault Boy <br />
    <div id="hint2"><img id="hint-pic" className="hint-pic" src={VaultBoyHint} /> </div>
    </li>
    <li>
    Boba Fett<br />
    <div id="hint3"><img id="hint-pic" className="hint-pic" src={BobaHint} /> </div>
    </li><br />
    <li>
    <a href="#" onClick={() => showHints()}>SHOW HINTS</a> <a href="#" >HIDE HINTS</a>
    </li>
</div>
);
}
export default GameLegend;