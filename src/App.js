import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import DonePage from "./Pages/DonePage/DonePage";
import Navbar from './Components/Navbar/Navbar';
import DetailPage from "./Pages/DetailPage/DetailPage";
import Signup from "./Pages/AuthPage/Signup";
import Login from "./Pages/AuthPage/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage}/>
        <PrivateRoute path="/done" component={DonePage}/>
        <PrivateRoute path="/todo/:userId/:todoId" component={DetailPage}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        
      </Switch>
      
    </div>
  );
}

export default App;
