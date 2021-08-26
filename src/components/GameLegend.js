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


    useEffect(() => {
        const showHintsButton = document.getElementById("showHints");
        showHintsButton.addEventListener("click", showHints);
        return function cleanup(){
            showHintsButton.removeEventListener("click", showHints);
        }
    });

    useEffect(() => {
        const hideHintsButton = document.getElementById("hideHints");
        hideHintsButton.addEventListener("click", hideHints);
        return function cleanup(){
            hideHintsButton.removeEventListener("click", hideHints);
        }
    });

        // need to change cursor when hovering above clipboard for gamelegend
    function showHints () {
       document.getElementById("hints").style.display = "flex";
      }

      function hideHints () {
        document.getElementById("hints").style.display = "none";
      }

    const showOrHideLegend = () => {
        if (legendDisplay === true){
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
        </li>
        <li>
        Vault Boy <br />
        </li>
        <li>
        Boba Fett<br />
        </li><br />
        <li>
        <a id="showHints" href="#">SHOW HINTS</a> <a id="hideHints" href="#" >HIDE HINTS</a>
        </li>
    </div>
    </div>



    <div id="hints" className="hints-box">
        Samus Hint
        <img id="hint-pic1" className="hint-pic" src={SamusHint} />
        Vault Boy Hint
        <img id="hint-pic2" className="hint-pic" src={VaultBoyHint} /> 
        Boba Fett Hint
        <img id="hint-pic3" className="hint-pic" src={BobaHint} /> 
    </div>
    

</div>
);
}
export default GameLegend;