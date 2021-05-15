import logo from './logo.svg';
import Login from "./Components/LogInsection/Login";
import SignUp from "./Components/LogInsection/SignUp";
import Advertising_Deal from "./Components/MainTab/Home/Advertising_Deal"
import Upload_Image from "./Components/MainTab/Home/Upload_Image"
import Home from "./Components/MainTab/Home/Home"
import Report from "./Components/MainTab/Report/Report"
import Settings from "./Components/MainTab/Settings/Settings"
import Coupon from "./Components/MainTab/Home/Coupon";

import "bootstrap/dist/css/bootstrap.min.css";


import {Switch, Route, withRouter} from 'react-router-dom';
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import './App.css';
import FCHeader from './Components/MainTab/FCHeader';


function App(){
    return(
      <div className="App">
        <FCHeader/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Report">
            <Report />
          </Route>
          <Route path="/Settings">
            <Settings />
          </Route>
          <Route path="/Advertising_Deal">
            <Advertising_Deal/>
          </Route>
          <Route path="/SignUp">
            <SignUp/>
          </Route>
          <Route path="/Login">
            <Login/>
          </Route>
          <Route path="/Coupon">
            <Coupon/>
          </Route>
          
        </Switch>
      </div>

    )
}    

export default withRouter(App);
