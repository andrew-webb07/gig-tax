import React, { useState, createContext } from "react"

export const TourContext = createContext()

export const TourProvider = (props) => {

    const [tours, setTours] = useState([])
    const [ searchTerms, setTourSearchTerms ] = useState("")
    const [ entriesYear , setTourYearEntries] = useState("")
    const [ totalsYear , setTourYear] = useState("")

    const getTours = () => {
        return fetch("https://gig-tax-server.herokuapp.com/tours", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`
            }
        })
        .then(res => res.json())
        .then(setTours)
    }

    const addTour = tourObj => {
        return fetch("https://gig-tax-server.herokuapp.com/tours", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tourObj)
        })
        .then(getTours)
    }

    const deleteTour = tourId => {
        return fetch(`https://gig-tax-server.herokuapp.com/tours/${tourId}`, {
            method: "DELETE",
            headers: {
                    "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`
                }
        })
            .then(getTours)
    }

    const getTourById = tourId => {
        return fetch(`https://gig-tax-server.herokuapp.com/tours/${tourId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`
            }
        })
        .then(res => res.json())
    }

    const updateTour = tour => {
        return fetch(`https://gig-tax-server.herokuapp.com/tours/${tour.id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tour)
        })
          .then(getTours)
      }

    return (
        <TourContext.Provider value={{
            tours, getTours, addTour, deleteTour, getTourById, updateTour, setTourSearchTerms, searchTerms, setTourYear, entriesYear, setTourYearEntries, totalsYear
        }}>
            {props.children}
        </TourContext.Provider>
    )
}