import React from "react"
import { useHistory } from "react-router-dom"
import "./LandingPage.css"
import GigTax02 from "../images/GigTax02.png"
import GigTax03 from "../images/GigTax03.png"

export const LandingPage = () => {

    const history = useHistory()

    return (
        <>
        <div className="logoContainer">
            <img src={GigTax02} alt="logo" className="logo" />
        </div>
        <div className="gigTax-buttons">
            <button className="gigTax-button gigTax-button__gig" onClick={() => history.push("/gig/create")}>Add Gig</button>
            <button className="gigTax-button gigTax-button__tour" onClick={() => history.push("/tour/create")}>Add Tour</button>
            <button className="gigTax-button gigTax-button__receipt" onClick={() => history.push("/receipt/create")}>Add Receipt</button>
        </div>
        </>
    )
}