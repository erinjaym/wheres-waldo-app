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

    <p><center>Who you need to hunt!</center></p>
    <li>
    Samus   <br /> 
   <hint><img id="hint-pic" className="hint-pic" src={SamusHint} /> </hint>
    </li>
    <li>
    Vault Boy <br />
    <hint><img id="hint-pic" className="hint-pic" src={VaultBoyHint} /> </hint>
    </li>
    <li>
    Boba Fett<br />
    <hint><img id="hint-pic" className="hint-pic" src={BobaHint} /> </hint>
    </li><br />
    <li>
    <a href="#" onClick={() => showHints()}>SHOW HINTS</a> <a href="#" >HIDE HINTS</a>
    </li>
</div>
);
}
export default GameLegend;