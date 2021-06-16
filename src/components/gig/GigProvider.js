import React, { useState, createContext } from "react"

export const GigContext = createContext()

export const GigProvider = (props) => {

    const [gigs, setGigs] = useState([])
    const [ searchTerms, setGigSearchTerms ] = useState("")

    const getGigs = () => {
        return fetch("http://localhost:8088/gigs")
        .then(res => res.json())
        .then(setGigs)
    }

    const addGig = gigObj => {
        return fetch("http://localhost:8088/gigs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(gigObj)
        })
        .then(getGigs)
    }

    const deleteGig = gigId => {
        return fetch(`http://localhost:8088/gigs/${gigId}`, {
            method: "DELETE"
        })
            .then(getGigs)
    }

    const getGigById = gigId => {
        return fetch(`http://localhost:8088/gigs/${gigId}`)
        .then(res => res.json())
    }

    const updateGig = gig => {
        return fetch(`http://localhost:8088/gigs/${gig.id}`, {
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
            gigs, getGigs, addGig, deleteGig, getGigById, updateGig, setGigSearchTerms, searchTerms
        }}>
            {props.children}
        </GigContext.Provider>
    )
}