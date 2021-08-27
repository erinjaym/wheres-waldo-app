import React from "react";
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

    const [foundBobaFett, setFoundBobaFet] = useState(false);
    const [foundVaultBoy, setFoundVaultBoy] = useState(false);
    const [foundSamus, setFoundSamus] = useState(false);

    const [tagBoxDisplay, setTagBoxDisplay] = useState(false);

      // will need to adjust when we change border sizes + add border diff here
    const characterArray = [
      {name: "Boba Fett", xStart: 477, xEnd: 519, yStart: 999, yEnd: 1051},
      {name: "Vault Boy", xStart: 165, xEnd: 201, yStart: 559, yEnd: 609},
      {name: "Samus", xStart: 1160, xEnd: 1219, yStart: 1303, yEnd: 1385},
    ]; 

    //let tagBoxDisplay = false;

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
        showTagBox();
        let xPos = e.clientX -50; // -50 to account for image border on left (only applicable before x scroll) 
        let yPos = e.clientY -50; // -50 to account for image border on top (only applicable before y scroll 
        xPos = ((xPos + xScrolled)); // center box on selection
        yPos = ((yPos + yScrolled));
        console.log("Y START IS: " + yPos);
        console.log("X START IS: " + xPos);
        return setXPosition(xPos), setYPosition(yPos);
      };
        // document.addEventListener("click", handleClick); old
        document.getElementById('image-area').addEventListener("click", handleClick);
        return function cleanup () {
        document.getElementById('image-area').removeEventListener("click", handleClick);
    }
  });


  useEffect(() => {

    function gameEnd(){
        alert("congrats you found everyone!");
        // reset game or return to start page box prompt?
    }



    if(foundSamus){
      const tagHim = () => { document.getElementById("s").style = "block"; }
      tagHim();
    }

    if(foundBobaFett){
      const tagHim = () => { document.getElementById("bf").style = "block"; }
      tagHim();
    }

    if(foundVaultBoy){
      const tagHim = () => { document.getElementById("vb").style = "block"; }
      tagHim();
    }


    if(foundVaultBoy && foundBobaFett && foundSamus){
      gameEnd();
    }

  }, [foundSamus, foundVaultBoy, foundBobaFett ]);



  function getCharacterLocation(characterName) {
    let characterList = characterArray;
    for (let character = 0; character <= characterList.length; character ++){
      if(characterList[character].name === characterName){
        let characterInfo = characterList[character];
        return characterInfo;
      }
    }
  }

  // hide task box on check for character click 
    function checkForCharacter(characterName, tagBoxCenterX, tagBoxCenterY) {
      let character = getCharacterLocation(characterName);

      if ((checkXAxis()) && (checkYAxis())){
        alert('yeep found ' + character.name);
        hideTagBox(); // may need to change this location
          if (character.name === "Samus"){
            setFoundSamus(true);
          }else if(character.name === "Boba Fett"){
            setFoundBobaFet(true);
          }else if (character.name === "Vault Boy"){
            setFoundVaultBoy(true);
          }
      }else{
        alert('Naw son!');
      }

      function checkXAxis (){
      if ( (tagBoxCenterX >= character.xStart) && (tagBoxCenterX <= character.xEnd)){
        return true;
      }else{
        return false;
      }
    }
               
      function checkYAxis () {
      if (tagBoxCenterY >= character.yStart && tagBoxCenterY <= character.yEnd){
        return true;
      }else{
        return false;
      }
    }

    }

    const showTagBox = () => {
      setTagBoxDisplay(true);
      console.log("Ran show tag box: " + tagBoxDisplay);
    }

    const hideTagBox = () => {
      setTagBoxDisplay(false);
      console.log("Rand hide tag box: " + tagBoxDisplay);
    }

    /*<map id="game-map" name="sfmap">
      <area id="tagging-area" shape="rect" coords="50,50,1762,158" alt="tagging area"/>
      </map>*/

return (
    <div id="game-container" className="game-container">
        <GameLegend 
              bobaFettStatus={foundBobaFett}
              vaultBoyStatus={foundVaultBoy}
              samusStatus= {foundSamus}
        />
        <div id="image-area">
          <img id="game-image" className="game-image" alt="science fiction character collage" src={SF} /> 
          
          <div id="bf" style={ {display: "none"} }>
            <div id="bfm" className="found-boba-mark"/>
            <div id="bf-circle" className="bf-circle "/>
          </div>

          <div id="vb" style={ {display: "none"} }>
            <div id="vbm" className="found-vaultboy-mark"/>
            <div id="vb-circle" className="vb-circle "/>
          </div>

          <div id="s" style={ {display: "none"} }>
            <div id="sm" className="found-samus-mark"/>
            <div id="s-circle" className="samus-circle "/>
          </div>

        </div>
      <TagBox 
      verticalPosition={yPosition} 
      horizontalPosition={xPosition} 
      tagBoxDisplay={tagBoxDisplay} 
      tag={checkForCharacter}
      />
    </div>

);
}

export default GameBoard;
