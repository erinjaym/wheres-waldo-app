import React from "react";
import { Link } from "react-router-dom";
import './fonts/arcade-regular.ttf';
import SF from './images/sfpic.png';
import { useState, useEffect } from "react";
import Assignment from "./images/assignment.svg";
import GameLegend from "./GameLegend";
import TagBox from "./TagBox";

const GameBoard = (props) => {

    const [xPosition, setXPosition ] = useState(0);
    const [yPosition, setYPosition ] = useState(0); 
    let picHeight = 1528;
    let picWidth = 1712; // adjusted for left border
    // adjust tagBox location .... show tagbox and then hide on unmount? 
    // there is a memory leak do to this that is killing the game!!

    function adjustHorizontal(horizStart){  // need to adjust for click along border as well 
        if ( horizStart < 0 ){ //adjust position to account for left border
          return 0;
        }else if(horizStart < 100){ // if selection point is near edge 
            return 0;
        }else if (horizStart >= picWidth){ // adjust position to account for right border and frame border pixels
          return (picWidth - 105);
        }else if (horizStart > (picWidth - 105)){ // adjust for clicks along right edge and frame border pixels
            console.log("ran this");
            return (picWidth - 105);
        }else{ //middle of board clicks
          return (horizStart - 50);
        }
      }
    
      function adjustVertical (vertStart) {
        if (vertStart < 0){ // if clicking on top border
            return 0;
        }else if (vertStart >= picHeight){ // if clicking on bottom border 
            return (picHeight - 100);
        }else if(vertStart < 100){ // if selected point is near an edge 
            return 0;
        }else{  // clicks in middle of gameboard
            return (vertStart - 50);
        }
    }

    // change name to setCoords  // need to remove listeners after use ... this keeps making them 
    function setTagLocation () {
        const setCoord = document.addEventListener("click", (e) => {
            console.log("settingCoord");
            let xPos = e.clientX -20; // -20 to account for image border on left
            let yPos = e.clientY -20; // -20 to account for image border on top
            xPos = adjustHorizontal(xPos); // center box on selection
            yPos = adjustVertical(yPos);
            setXPosition(xPos);
            setYPosition(yPos);
        });
    }

    //    add to code after image map implement<div id="legend-"><GameLegend /></div>
    // make a sticky legend. + a sticky zoom  
return (
    <div id="game-container" className="game-container">
         <img className="game-image" alt="science fiction character collage" src={SF} useMap="#sfmap" /> 
<map name="sfmap">
  <area shape="rect" coords="20,20,1732,1548" alt="tagging area" onClick={setTagLocation}/>
  <area shape="rect" coords="" alt="samus" alt=""></area>
</map>

<TagBox verticalPosition={yPosition} horizontalPosition={xPosition}/>
    </div>

);
}

export default GameBoard;
