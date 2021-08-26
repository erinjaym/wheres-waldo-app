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

    const [selectionMade, setSelectionMade] = useState(true);

    const [foundBobaFett, setFoundBobaFet] = useState(false);
    const [foundVaultBoy, setFoundVaultBoy] = useState(false);
    const [foundSamus, setFoundSamus] = useState(false);

      // will need to adjust when we change border sizes + add border diff here
    const characterArray = [
      {name: "Boba Fett", xStart: 477, xEnd: 519, yStart: 999, yEnd: 1051},
      {name: "Vault Boy", xStart: 165, xEnd: 201, yStart: 559, yEnd: 609},
      {name: "Samus", xStart: 1160, xEnd: 1219, yStart: 1303, yEnd: 1385},
    ]; 


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
        let xPos = e.clientX -50; // -50 to account for image border on left (only applicable before x scroll) 
        let yPos = e.clientY -50; // -50 to account for image border on top (only applicable before y scroll 
        xPos = ((xPos + xScrolled)); // center box on selection
        yPos = ((yPos + yScrolled));
        console.log("Y START IS: " + yPos);
        console.log("X START IS: " + xPos);
        return setXPosition(xPos), setYPosition(yPos), setSelectionMade(true);
      };
         document.addEventListener("click", handleClick);
        return function cleanup () {
        document.removeEventListener("click", handleClick);
    }
  });


  useEffect(() => {

  // should only be run on MOUNT! ... 
  function markCharacter (characterName) {
    let characterList = characterArray;
    for (let character = 0; character <= characterList.length; character ++){

      if(characterList[character].name === characterName){
        let characterInfo = characterList[character];
        //code when have idea of what image to use 
        return;
      }
    }

  }



    if(foundSamus){
      //markCharacter("Samus");
    }

    if(foundBobaFett){
      //markCharacter("Boba Fett");
    }

    if(foundVaultBoy){
      //markCharacter("Vault Boy");
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

  // change this to use image map?? 
    function checkForCharacter(characterName, tagBoxCenterX, tagBoxCenterY) {
      let character = getCharacterLocation(characterName);

      if ((checkXAxis()) && (checkYAxis())){
        alert('yeep found ' + character.name);
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

return (
    <div id="game-container" className="game-container">
        <GameLegend />
         <img id="game-image" className="game-image" alt="science fiction character collage" src={SF} useMap="#sfmap" /> 
          <div id="BobaFett" className="spotter-mark"/>
          <div id="VaultBoy" className="spotter-mark"/>
          <div id="Samus" className="spotter-mark"/>

<map name="sfmap">
<area shape="rect" coords="1160, 1303, 1219, 1385" alt="samus"/>
  <area shape="rect" coords="165, 559, 201, 609" alt="vaultBoy"/>
  <area shape="rect" coords="477, 999, 519, 1051" alt="bobaFett" />
  <area shape="rect" coords="50,50,1762,158" alt="tagging area"/>
</map>

<TagBox verticalPosition={yPosition} horizontalPosition={xPosition} selectionMade={selectionMade} tag={checkForCharacter}/>
    </div>

);
}

export default GameBoard;
