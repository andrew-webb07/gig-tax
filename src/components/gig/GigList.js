import React, { useContext, useEffect, useState } from "react"
import "./Gig.css"
import { GigContext } from "./GigProvider"
import { useHistory } from "react-router-dom"

export const GigList = () => {
    const { gigs, getGigs, deleteGig, searchTerms, entriesYear, setGigYearEntries, setGigSearchTerms } = useContext(GigContext)

    const history = useHistory()
    const currentGigTaxUserId = parseInt(localStorage.getItem("gig-tax_user"))
    // const currentUserGigs = gigs.filter(gig => gig.userId === currentGigTaxUserId)
    const sortedUserGigs = gigs.sort((gig1, gig2) => (Date.parse(gig2.date) - Date.parse(gig1.date)))

    const [ filteredGigs ,setFiltered] = useState([])

    // reset the search bar and year dropdown menu on page load
    useEffect(() => {
      getGigs()
      setGigSearchTerms("")
      setGigYearEntries("")
    }, [])

    // filter gigs based on content in the search bar
    useEffect(() => {
        if (searchTerms !== "") {
          const subset = sortedUserGigs.filter(gig => gig.artist.toLowerCase().includes(searchTerms.toLowerCase()) || gig.location_name.toLowerCase().includes(searchTerms.toLowerCase()))
          setFiltered(subset)
        } else {
          setFiltered(sortedUserGigs)
        }
      }, [searchTerms, gigs])

      // filter gigs based on year picked in dropdown menu
      useEffect(() => {
        if (entriesYear !== "" && entriesYear !== "year") {
          const subset = sortedUserGigs.filter(gig => Date.parse(gig.date) >= Date.parse(`01/01/${entriesYear}`) && Date.parse(gig.date) < Date.parse(`01/01/${parseInt(entriesYear) + 1}`))
          setFiltered(subset)
        } else {
          setFiltered(sortedUserGigs)
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
                                <div className="gig__item">Location: {gig.location_name}</div>
                                <div className="gig__item">Address: {gig.location_address}</div>
                                <div className="gig__item">Description: {gig.gig_description}</div>
                                <div className="gig__item">Date: {gig.date}</div>
                                <div className="gig__item">Gig Pay: ${gig.gig_pay}</div>
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