import React from "react"
import { useHistory } from "react-router-dom"
import "./LandingPage.css"

export const LandingPage = () => {

    const history = useHistory()

    return (
        <>
        <h1>Gig Tax</h1> 
        <div className="gigTax-buttons">
            <button className="gigTax-button gigTax-button__gig" onClick={() => history.push("/gig/create")}>Add Gig</button>
            <button className="gigTax-button gigTax-button__tour" onClick={() => history.push("/tour/create")}>Add Tour</button>
            <button className="gigTax-button gigTax-button__receipt" onClick={() => history.push("/receipt/create")}>Add Receipt</button>
        </div>
        </>
    )
}