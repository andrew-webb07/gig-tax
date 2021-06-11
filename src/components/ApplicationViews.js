import React from "react"
import { Route } from "react-router-dom"
import { LandingPage } from "./landingPage/LandingPage"

export const ApplicationViews = () => {
    return (
    <>
        <Route exact path="/">
        <LandingPage />
        </Route>
    </>
    )
}