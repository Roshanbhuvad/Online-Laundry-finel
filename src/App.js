import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import NavBar from "./components/NavBar";
import NearByShops from "./components/mapNearbyStores";
import Pickup from "./components/Pickup";
import UpdateShop from "./components/UpdateShop";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Payment from "./components/Payment";
import LoginForm from "./components/loginForm";
import RegisterUserForm from "./components/RegisterUserForm";
import RegisterShopForm from "./components/RegisterShopForm";
export default function App() {
  return (
    <div>
      <NavBar />
      <div className="content">
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/nearby" component={NearByShops} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/registershop" component={RegisterShopForm} />
          <Route exact path="/registercustomer" component={RegisterUserForm} />
          <Route exact path="/book" component={Pickup} />
          <Route exact path="/shops/{myid}" component={UpdateShop} />
          <Route exact path="/payment" component={Payment} />
        </Switch>
      </div>
    </div>
  );
}
