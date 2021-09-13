import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import  Firebase  from "../firebaseConfig";
import { getFirestore, doc, updateDoc} from 'firebase/firestore/lite';

const HighScores = (props) => {

  let playerTime = props.searchTime;
  let highScorePlacement = "pending";

  const [scoreBoard, setScoreBoard] = useState(props.scoreBoard);
  const [scoreBoardUpdate, setScoreBoardUpdate] = useState(false);

  let highScoreEligibility = false;

  if(!scoreBoardUpdate){ //ensure enter name entry only loads once
    checkEligibility();
  };

  function checkEligibility (){
      for (let playerSlot = 0; playerSlot < scoreBoard.length; playerSlot++){ 
        if(playerTime < (scoreBoard[playerSlot].time)){  
          highScorePlacement = playerSlot;
          highScoreEligibility = (true); 
          return;
        }
      }
  }

function addToScoreBoard (){
  let playerName = document.getElementById("name-input").value;
  addNewEntry(playerName); 
}

async function saveHighScoresToCloud(placement){

  const db = getFirestore(Firebase);
  //establish all database placeholder references
  let docRef1 = doc(db, 'highScores/1');
  let docRef2 = doc(db, 'highScores/2');
  let docRef3 = doc(db, 'highScores/3');
  let docRef4 = doc(db, 'highScores/4');
  let docRef5 = doc(db, 'highScores/5');

  let firstPlaceName = scoreBoard[0].name;
  let firstPlaceTime = scoreBoard[0].time;

  let secondPlaceName = scoreBoard[1].name;
  let secondPlaceTime = scoreBoard[1].time;

  let thirdPlaceName = scoreBoard[2].name;
  let thirdPlaceTime = scoreBoard[2].time;

  let fourthPlaceName = scoreBoard[3].name;
  let fourthPlaceTime = scoreBoard[3].time;

  let fifthPlaceName = scoreBoard[4].name;
  let fifthPlaceTime = scoreBoard[4].time;

switch( placement ) {  // update cloud with least amount of writes

  case 0:
        await updateDoc( docRef1, {name: firstPlaceName, time: firstPlaceTime});
        await updateDoc( docRef2, {name: secondPlaceName, time: secondPlaceTime});
        await updateDoc( docRef3, {name: thirdPlaceName, time: thirdPlaceTime});
        await updateDoc( docRef4, {name: fourthPlaceName, time: fourthPlaceTime});
        await updateDoc( docRef5, {name: fifthPlaceName, time: fifthPlaceTime});
        break;
  case 1:
        await updateDoc( docRef2, {name: secondPlaceName, time: secondPlaceTime});
        await updateDoc( docRef3, {name: thirdPlaceName, time: thirdPlaceTime});
        await updateDoc( docRef4, {name: fourthPlaceName, time: fourthPlaceTime});
        await updateDoc( docRef5, {name: fifthPlaceName, time: fifthPlaceTime});
        break;
  case 2:
        await updateDoc( docRef3, {name: thirdPlaceName, time: thirdPlaceTime});
        await updateDoc( docRef4, {name: fourthPlaceName, time: fourthPlaceTime});
        await updateDoc( docRef5, {name: fifthPlaceName, time: fifthPlaceTime});
        break;
  case 3:
        await updateDoc( docRef4, {name: fourthPlaceName, time: fourthPlaceTime});
        await updateDoc( docRef5, {name: fifthPlaceName, time: fifthPlaceTime});
        break;
  case 4: 
        await updateDoc( docRef5, {name: fifthPlaceName, time: fifthPlaceTime});
        break;
  default: 
}
}

function addNewEntry (name){
      let time = playerTime;
      let newScoreBoard = scoreBoard;
      let playerInfo = { time, name}; 
      let placement = highScorePlacement;
      newScoreBoard.splice(highScorePlacement, 0, playerInfo);
      newScoreBoard.pop(); 

      setScoreBoardUpdate(true); // tell highscores that an update was made
      highScoreEligibility = false; // change Eligibility back to original state to hide popup
      setScoreBoard(newScoreBoard);
      saveHighScoresToCloud(placement);
}

  function ifEligible () {
    if (highScoreEligibility === true){
      return "flex";
    }else{
      return "none";
    }
  }

  let scorePopup = {
    alignItems: "center",
    backgroundColor: "rgba(38, 95, 60)",
    border: "1px dotted white",
    borderTop: "solid 8px white",
    color: "white",
    display: ifEligible(),
    fontSize: "1em",
    fontFamily: '"ArcadeRegular", "Times New Roman"',
    flexDirection: "column",
    height: "600px",
    justifyContent: "space-around",
    left: "50%",
    position: "fixed",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    zIndex: "4",
  }

  return (
    <div className="high-scores-page">
      <div><u>High Scores!</u></div>
      <div>Your Score was: { playerTime } Seconds!</div>

      <div id="score-popup" style={scorePopup}>
       <div><u> Congratulations</u></div>
        <div>You got a high score!</div>
        <div>Your Score was: { playerTime } Seconds!</div>
          <form >
            <input id="name-input" className="highscore-input" type="text" name="player" placeholder="Enter your name!"/>
          </form>
        <button className="alert-button" onClick={() => addToScoreBoard()}>Submit</button>
      </div>

      <div id="top-scores" className="top-scores">
        <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1st </td>
                <td>{scoreBoard[0].name }</td>
                <td>{scoreBoard[0].time} sec</td>
              </tr>
              <tr>
                <td>2nd </td>
                <td>{scoreBoard[1].name}</td>
                <td>{scoreBoard[1].time} sec</td>
              </tr>
              <tr>
                <td>3rd </td>
                <td>{scoreBoard[2].name }</td>
                <td>{scoreBoard[2].time} sec</td>
              </tr>
              <tr>
                <td>4th </td>
                <td>{scoreBoard[3].name }</td>
                <td>{scoreBoard[3].time} sec</td>
              </tr>
              <tr>
                <td>5th </td>
                <td>{scoreBoard[4].name }</td>
                <td>{scoreBoard[4].time} sec</td>
              </tr>
            </tbody>
        </table>
      </div>
      <Link to="/wheres-waldo-app">
        {" "}
        <button className="alert-button">Return to Start Screen</button>{" "}
      </Link>
      <Link to="/wheres-waldo-app/GameBoard">
        <button className="alert-button" onClick={() => props.initializeGame()}>Play Again</button>
      </Link>
    </div>
  );
};

export default HighScores;