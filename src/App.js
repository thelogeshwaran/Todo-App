import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import DonePage from "./Pages/DonePage/DonePage";
import Navbar from './Components/Navbar/Navbar';
import DetailPage from "./Pages/DetailPage/DetailPage";


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
        <Route path="/todo/:todoId">
          <DetailPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
