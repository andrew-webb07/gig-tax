import React, { useState, createContext } from "react"

export const TourContext = createContext()

export const TourProvider = (props) => {

    const [tours, setTours] = useState([])
    const [ searchTerms, setTourSearchTerms ] = useState("")

    const getTours = () => {
        return fetch("http://localhost:8088/tours")
        .then(res => res.json())
        .then(setTours)
    }

    const addTour = tourObj => {
        return fetch("http://localhost:8088/tours", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tourObj)
        })
        .then(getTours)
    }

    const deleteTour = tourId => {
        return fetch(`http://localhost:8088/tours/${tourId}`, {
            method: "DELETE"
        })
            .then(getTours)
    }

    const getTourById = tourId => {
        return fetch(`http://localhost:8088/tours/${tourId}`)
        .then(res => res.json())
    }

    const updateTour = tour => {
        return fetch(`http://localhost:8088/tours/${tour.id}`, {
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
            tours, getTours, addTour, deleteTour, getTourById, updateTour, setTourSearchTerms, searchTerms
        }}>
            {props.children}
        </TourContext.Provider>
    )
}