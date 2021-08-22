import './App.css';
import './fonts/arcade-regular.ttf';
import StartScreen from "./StartScreen";
import SF from './images/sfpic.png';
import GameBoard from './GameBoard';
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter >    
    <div>
      <Switch>
      <Route 
          exact
          path="/" 
          component={StartScreen}
          /> 
      <Route
            exact
            path="/GameBoard"
            render={(props) => <GameBoard {...props} />}
          />
      </Switch>
    </div>
    </BrowserRouter>

  );
}

export default App;
