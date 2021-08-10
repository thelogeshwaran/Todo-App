import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import DonePage from "./Pages/DonePage/DonePage";
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/done">
          <DonePage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
