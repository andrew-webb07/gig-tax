import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./GigTax.css";

export const GigTax = () => (
    <>
    <Route
      render={() => {
        if (localStorage.getItem("gig-tax_user")) {
          return (
            <>
              <NavBar />
              <h1>Gig Tax</h1>    
              {/* <ApplicationViews /> */}
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
)