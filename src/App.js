import "./App.css";
import "./components/fonts/arcade-regular.ttf";
import StartScreen from "./components/StartScreen";
import GameBoard from "./components/GameBoard";
import HighScores from "./components/HighScores";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { getFirestore, collection, getDocs, Timestamp } from 'firebase/firestore/lite';
import  Firebase  from "./firebaseConfig";

function App() {

  let searchTime = "pending";
  let highScores = [];
  let startTime = "pending";

const db = getFirestore(Firebase);

function initializeGame () {

setStartTime();
getHighScores(db); 

  function setStartTime () {
    let theTime = Timestamp.now();
    startTime = theTime.seconds;
  }

async function getHighScores(db) {
  let scoresRef = collection(db, 'highScores');
  let scoresSnapshot = await getDocs(scoresRef);
  let scoresList = scoresSnapshot.docs.map(doc => doc.data())
  await assignHighScores(scoresList); 

  function assignHighScores (scoresList) { 
  highScores = scoresList;
  };
}

}

function calcTime (endTime) {
let totalTime = endTime - startTime; 
searchTime = totalTime;
}

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route 
          exact path="/wheres-waldo-app"
          render={(props) => <StartScreen initializeGame={initializeGame} />} 
          />
          <Route 
          exact path="/wheres-waldo-app/GameBoard" 
          render={(props) => <GameBoard calcTime={calcTime} />}
          />
          <Route exact 
          path="/wheres-waldo-app/HighScores" 
          render={(props) => 
          <HighScores 
          scoreBoard={highScores} 
          searchTime={searchTime} 
          initializeGame={initializeGame} 
          />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;