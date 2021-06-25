import React, { useState, createContext } from "react"

export const TourContext = createContext()

export const TourProvider = (props) => {

    const [tours, setTours] = useState([])
    const [ searchTerms, setTourSearchTerms ] = useState("")
    const [ entriesYear , setTourYearEntries] = useState("")
    const [ totalsYear , setTourYear] = useState("")

    const getTours = () => {
        return fetch("https://gig-tax-api.herokuapp.com/tours")
        .then(res => res.json())
        .then(setTours)
    }

    const addTour = tourObj => {
        return fetch("https://gig-tax-api.herokuapp.com/tours", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tourObj)
        })
        .then(getTours)
    }

    const deleteTour = tourId => {
        return fetch(`https://gig-tax-api.herokuapp.com/tours/${tourId}`, {
            method: "DELETE"
        })
            .then(getTours)
    }

    const getTourById = tourId => {
        return fetch(`https://gig-tax-api.herokuapp.com/tours/${tourId}`)
        .then(res => res.json())
    }

    const updateTour = tour => {
        return fetch(`https://gig-tax-api.herokuapp.com/tours/${tour.id}`, {
          method: "PUT",
          headers: {
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