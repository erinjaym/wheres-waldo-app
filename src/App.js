import './App.css';
import './components/fonts/arcade-regular.ttf';
import StartScreen from "./components/StartScreen";
import GameBoard from './components/GameBoard';
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
