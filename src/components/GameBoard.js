import React from "react";
import { Link } from "react-router-dom";
import './fonts/arcade-regular.ttf';
import SF from './images/sfpic.png';
import { useState, useEffect } from "react";
import GameLegend from "./GameLegend";
import TagBox from "./TagBox";

const GameBoard = (props) => {

    const [xPosition, setXPosition ] = useState(0);
    const [yPosition, setYPosition ] = useState(0); 

    const [yScrolled, setYScrolled] = useState(0);
    const [xScrolled, setXScrolled] = useState(0);

    const [scrolled, setScrolled] = useState(false); // to be used with legend implementation with

    const [selectionMade, setSelectionMade] = useState(true);


    const handleScroll = () => { 
        const yOffset = window.scrollY;
        const xOffset = window.scrollX;
        if( yOffset >=0 ){
            setYScrolled(yOffset);
        }
        if( xOffset >= 0){
            setXScrolled( xOffset );
        }
    }

      useEffect(() => {
        window.addEventListener("scroll", handleScroll); 
        return function cleanup () {
            window.removeEventListener("scroll", handleScroll);
            }
      });

      useEffect(() => {
      const handleClick = (e) => {
        let xPos = e.clientX -20; // -20 to account for image border on left (only applicable before x scroll) 
        let yPos = e.clientY -20; // -20 to account for image border on top (only applicable before y scroll 
        xPos = ((xPos + xScrolled)); // center box on selection
        yPos = ((yPos + yScrolled));
        return setXPosition(xPos), setYPosition(yPos), setSelectionMade(true);
      };
         document.addEventListener("click", handleClick);
        return function cleanup () {
        document.removeEventListener("click", handleClick);
    }
  });


    // make a sticky legend. + a sticky zoom  
return (
    <div id="game-container" className="game-container">
        <GameLegend />
         <img className="game-image" alt="science fiction character collage" src={SF} useMap="#sfmap" /> 
<map name="sfmap">
  <area shape="rect" coords="20,20,1732,1548" alt="tagging area"/>
  <area shape="rect" coords="" alt="samus" alt=""></area>
</map>

<TagBox verticalPosition={yPosition} horizontalPosition={xPosition} selectionMade={selectionMade}/>
    </div>

);
}

export default GameBoard;
