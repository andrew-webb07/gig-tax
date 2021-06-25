import React, { useState, createContext } from "react"

export const GigContext = createContext()

export const GigProvider = (props) => {

    const [gigs, setGigs] = useState([])
    const [ searchTerms, setGigSearchTerms ] = useState("")
    const [ entriesYear , setGigYearEntries] = useState("")
    const [ totalsYear , setGigYear] = useState("")

    const getGigs = () => {
        return fetch("https://gig-tax-api.herokuapp.com/gigs")
        .then(res => res.json())
        .then(setGigs)
    }

    const addGig = gigObj => {
        return fetch("https://gig-tax-api.herokuapp.com/gigs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gigObj)
        })
        .then(getGigs)
    }

    const deleteGig = gigId => {
        return fetch(`https://gig-tax-api.herokuapp.com/gigs/${gigId}`, {
            method: "DELETE"
        })
            .then(getGigs)
    }

    const getGigById = gigId => {
        return fetch(`https://gig-tax-api.herokuapp.com/gigs/${gigId}`)
        .then(res => res.json())
    }

    const updateGig = gig => {
        return fetch(`https://gig-tax-api.herokuapp.com/gigs/${gig.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(gig)
        })
          .then(getGigs)
      }

    return (
        <GigContext.Provider value={{
            gigs, getGigs, addGig, deleteGig, getGigById, updateGig, setGigYear, entriesYear, setGigSearchTerms, searchTerms, setGigYearEntries, totalsYear
        }}>
            {props.children}
        </GigContext.Provider>
    )
}