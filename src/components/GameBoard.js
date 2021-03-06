import React from "react";
import "./fonts/arcade-regular.ttf";
import SF from "./images/sfpic.png";
import { useState, useEffect } from "react";
import GameLegend from "./GameLegend";
import TagBox from "./TagBox";
import AlertWindow from "./AlertWindow";
import Timer from "./Timer";
import { Timestamp } from 'firebase/firestore/lite';

const GameBoard = (props) => {
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);

  const [yScrolled, setYScrolled] = useState(0);
  const [xScrolled, setXScrolled] = useState(0);

  const [foundBobaFett, setFoundBobaFet] = useState(false);
  const [foundVaultBoy, setFoundVaultBoy] = useState(false);
  const [foundSamus, setFoundSamus] = useState(false);

  const [tagBoxDisplay, setTagBoxDisplay] = useState(false);

  const [alertWindowDisplay, setAlertWindowDisplay] = useState(false);
  const [alertWindowText, setAlertWindowText] = useState("Alert Dialog");

  const [gameFinished, setGameFinished] = useState(false);

  const characterArray = [
    { name: "Boba Fett", xStart: 477, xEnd: 519, yStart: 999, yEnd: 1051 },
    { name: "Vault Boy", xStart: 165, xEnd: 201, yStart: 559, yEnd: 609 },
    { name: "Samus", xStart: 1160, xEnd: 1219, yStart: 1303, yEnd: 1385 },
  ];

  const hideTimer = () => {
    let timer = document.getElementById('timer-display');
    timer.style.display = "none";
  };

  const showTagBox = () => {
    setTagBoxDisplay(true);
  };

  const hideTagBox = () => {
    setTagBoxDisplay(false);
  };

  const hideAlert = () => {
    setAlertWindowDisplay(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const yOffset = window.scrollY;
      const xOffset = window.scrollX;
      if (yOffset >= 0) {
        setYScrolled(yOffset);
      }
      if (xOffset >= 0) {
        setXScrolled(xOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      showTagBox();
      let xPos = e.clientX - 50; // -50 to account for image border on left
      let yPos = e.clientY - 50; // -50 to account for image border on top
      xPos = xPos + xScrolled; // center box on selection
      yPos = yPos + yScrolled;
      setXPosition(xPos);
      setYPosition(yPos);
      return;
    };

    if (!gameFinished) {
      document
        .getElementById("image-area")
        .addEventListener("click", handleClick);
      return function cleanup() {
        document
          .getElementById("image-area")
          .removeEventListener("click", handleClick);
      };
    } else {
    }
  });

  useEffect(() => {
    if (foundVaultBoy) {
      const tagHim = () => {
        document.getElementById("vb").style = "block";
      };
      tagHim();
      setAlertWindowText("Good Job! You found Vault Boy! ");
      setAlertWindowDisplay(true);
    }
  }, [foundVaultBoy]);

  useEffect(() => {
    if (foundBobaFett) {
      const tagHim = () => {
        document.getElementById("bf").style = "block";
      };
      tagHim();
      setAlertWindowText("Good Job! You found Boba Fett! ");
      setAlertWindowDisplay(true);
    }
  }, [foundBobaFett]);

  useEffect(() => {
    if (foundSamus) {
      const tagHim = () => {
        document.getElementById("s").style = "block";
      };
      tagHim();
      setAlertWindowText("Good Job! You found Samus! ");
      setAlertWindowDisplay(true);
    }
  }, [foundSamus]);

  useEffect(() => {
    function gameEnd() {
      setAlertWindowText("Good Job! You found everyone!");
      hideTimer();
      setAlertWindowDisplay(true);
      setGameFinished(true);
    }

    if (foundVaultBoy && foundBobaFett && foundSamus) {
      gameEnd();
    }
  }, [foundVaultBoy, foundBobaFett, foundSamus]);

    if (gameFinished){
      let endTime = Timestamp.now();
      let theEndTime = endTime.seconds;
        props.calcTime(theEndTime);
      }
  
  function getCharacterLocation(characterName) {
    let characterList = characterArray;
    for (let character = 0; character <= characterList.length; character++) {
      if (characterList[character].name === characterName) {
        let characterInfo = characterList[character];
        return characterInfo;
      }
    }
  }

  function checkForCharacter(characterName, tagBoxCenterX, tagBoxCenterY) {
    let character = getCharacterLocation(characterName);

    if (checkXAxis() && checkYAxis()) {
      hideTagBox();
      if (character.name === "Samus") {
        setFoundSamus(true);
      } else if (character.name === "Boba Fett") {
        setFoundBobaFet(true);
      } else if (character.name === "Vault Boy") {
        setFoundVaultBoy(true);
      }
    } else {
      setAlertWindowText("Nope! Try Again!");
      setAlertWindowDisplay(true);
    }

    function checkXAxis() {
      if (
        tagBoxCenterX >= character.xStart &&
        tagBoxCenterX <= character.xEnd
      ) {
        return true;
      } else {
        return false;
      }
    }

    function checkYAxis() {
      if (
        tagBoxCenterY >= character.yStart &&
        tagBoxCenterY <= character.yEnd
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  return (
    <div id="game-container" className="game-container">
      <Timer 
      gameFinished={gameFinished}
      /> 
      <GameLegend
        bobaFettStatus={foundBobaFett}
        vaultBoyStatus={foundVaultBoy}
        samusStatus={foundSamus}
      />

      <div id="image-area">
        <img
          id="game-image"
          className="game-image"
          alt="science fiction character collage"
          src={SF}
        />

        <div id="bf" style={{ display: "none" }}>
          <div id="bfm" className="found-boba-mark" />
          <div id="bf-circle" className="found-boba-circle" />
        </div>

        <div id="vb" style={{ display: "none" }}>
          <div id="vbm" className="found-vaultboy-mark" />
          <div id="vb-circle" className="found-vaultboy-circle" />
        </div>

        <div id="s" style={{ display: "none" }}>
          <div id="sm" className="found-samus-mark" />
          <div id="s-circle" className="found-samus-circle" />
        </div>
      </div>

      <TagBox
        verticalPosition={yPosition}
        horizontalPosition={xPosition}
        tagBoxDisplay={tagBoxDisplay}
        tag={checkForCharacter}
      />
      <AlertWindow
        alertWindowText={alertWindowText}
        alertWindowDisplay={alertWindowDisplay}
        dismiss={hideAlert}
        gameFinished={gameFinished}

      />
      <div id="credits" className="image-credit">
        Image borrowed from the amazing creators @ <a href="http://pixeljoint.com/forum/forum_posts.asp?TID=23697">Pixel Joint</a>
      </div>
      
    </div>
  );
};

export default GameBoard;