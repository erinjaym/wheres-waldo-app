import React from "react";
import SamusHint from "./images/samus.png";
import VaultBoyHint from "./images/vault-boy.png";
import BobaHint from "./images/boba.png";
import Assignment from "./images/assignment.svg";
import { useState, useEffect } from "react";

const GameLegend = () => {

    const [legendDisplay, setLegendDisplay] = useState(false);

    useEffect(() => {
        const clipBoard = document.getElementById("legend-icon");
        clipBoard.addEventListener("click", showOrHideLegend);
        return function cleanup (){
            clipBoard.removeEventListener("click", showOrHideLegend);
        }
    });

        // need to change cursor when hovering above clipboard for gamelegend
    function showHints () {
        // let hints = document.getElementsById("hint-pic"); < ... change to a hook ??
        // hints.style.display = "inline-block";
      }

    const showOrHideLegend = () => {
        if (legendDisplay == true){
            document.getElementById("legendWrapper").className = "legend-hidden";
            document.getElementById("legendList").style.display = "none";
            setLegendDisplay(false);
        }else{
            document.getElementById("legendWrapper").className = "legend-shown";
            document.getElementById("legendList").style.display = "flex";
            setLegendDisplay(true);
        }
    }

return ( 
<div id="legend" >
    <img id="legend-icon" className="legend-icon" alt="clipboard" src={Assignment} />
    <div id="legendWrapper" className="legend-hidden">
    <div id="legendList" className="legendList" >
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
    </div>
    

</div>
);
}
export default GameLegend;