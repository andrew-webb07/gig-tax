import React, { useContext, useEffect, useState } from "react"
import "./Gig.css"
import { GigContext } from "./GigProvider"
import { useHistory } from "react-router-dom"

export const GigList = () => {
    const { gigs, getGigs, deleteGig, searchTerms, entriesYear } = useContext(GigContext)

    const history = useHistory()
    const currentGigTaxUserId = parseInt(localStorage.getItem("gig-tax_user"))
    const currentUserGigs = gigs.filter(gig => gig.userId === currentGigTaxUserId)

    const [ filteredGigs ,setFiltered] = useState([])

    useEffect(() => {
        getGigs()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
          const subset = currentUserGigs.filter(gig => gig.artist.toLowerCase().includes(searchTerms.toLowerCase()) || gig.locationName.toLowerCase().includes(searchTerms.toLowerCase()))
          setFiltered(subset)
        } else {
          setFiltered(currentUserGigs)
        }
      }, [searchTerms, gigs])

      useEffect(() => {
        if (entriesYear !== "" && entriesYear !== "year") {
          const subset = currentUserGigs.filter(gig => Date.parse(gig.date) >= Date.parse(`01/01/${entriesYear}`) && Date.parse(gig.date) < Date.parse(`01/01/${parseInt(entriesYear) + 1}`))
          setFiltered(subset)
        } else {
          setFiltered(currentUserGigs)
        }
      }, [entriesYear, gigs])

    return (
        <>
            <div className="gigs">
                <h2 className="gigs__header">Gigs</h2>
                {
                    filteredGigs.map(gig => {
                        return (
                            <div className="gig" id={`gig--${gig.id}`}>
                                <div className="gig__item">Artist: {gig.artist}</div>
                                <div className="gig__item">Location: {gig.locationName}</div>
                                <div className="gig__item">Address: {gig.locationAddress}</div>
                                <div className="gig__item">Description: {gig.gigDescription}</div>
                                <div className="gig__item">Date: {gig.date}</div>
                                <div className="gig__item">Gig Pay: ${gig.gigPay}</div>
                                <div className="gig__item">Gig Mileage: {gig.mileage}</div>
                                <div className="gig__buttons">
                                    <button className="gig__button" onClick={() => {history.push(`/gig/edit/${gig.id}`)}}>Edit</button>
                                    <button className="gig__button" onClick={() => {history.push("/entries")
                                deleteGig(gig.id)}}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}