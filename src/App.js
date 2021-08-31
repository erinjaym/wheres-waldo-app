import "./App.css";
import "./components/fonts/arcade-regular.ttf";
import StartScreen from "./components/StartScreen";
import GameBoard from "./components/GameBoard";
import HighScores from "./components/HighScores";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/wheres-waldo-app" component={StartScreen} />
          <Route exact path="/wheres-waldo-app/GameBoard" component={GameBoard} />
          <Route exact path="/wheres-waldo-app/HighScores" component={HighScores} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
