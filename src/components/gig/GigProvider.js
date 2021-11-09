import React, { useState, createContext } from "react"

export const GigContext = createContext()

export const GigProvider = (props) => {

    const [gigs, setGigs] = useState([])
    const [ searchTerms, setGigSearchTerms ] = useState("")
    const [ entriesYear , setGigYearEntries] = useState("")
    const [ totalsYear , setGigYear] = useState("")

    const getGigs = () => {
        return fetch("https://gig-tax-server.herokuapp.com/gigs", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`
            }
        })
        .then(res => res.json())
        .then(setGigs)
    }

    const addGig = gigObj => {
        return fetch("https://gig-tax-server.herokuapp.com/gigs", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gigObj)
        })
        .then(getGigs)
    }

    const deleteGig = gigId => {
        return fetch(`https://gig-tax-server.herokuapp.com/gigs/${gigId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`
            }
        })
            .then(getGigs)
    }

    const getGigById = gigId => {
        return fetch(`https://gig-tax-server.herokuapp.com/gigs/${gigId}` ,{
            headers: {
                "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`
            }
        })
        .then(res => res.json())
    }

    const updateGig = gig => {
        return fetch(`https://gig-tax-server.herokuapp.com/gigs/${gig.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`,
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