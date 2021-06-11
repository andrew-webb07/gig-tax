import React from "react"
import { Route } from "react-router-dom"
import { useHistory } from "react-router-dom"

export const LandingPage = () => {

    const history = useHistory()

    return (
        <>
        <h1>Gig Tax</h1> 
        <div className="gigTax-buttons">
            <button className="gigTax-buttons__button gigTax-buttons__button__gig" onClick={() => history.push("/gig/create")}>Add Gig</button>
            <button className="gigTax-buttons__button gigTax-buttons__button__tour" onClick={() => history.push("/tour/create")}>Add Tour</button>
            <button className="gigTax-buttons__button gigTax-buttons__button__receipt" onClick={() => history.push("/receipt/create")}>Add Receipt</button>
        </div>
        </>
    )
}