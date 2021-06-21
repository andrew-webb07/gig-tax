import React, { useContext, useEffect, useState } from "react"
import "./Tour.css"
import { TourContext } from "./TourProvider"
import { useHistory } from "react-router-dom"

export const TourList = () => {
    const { tours, getTours, deleteTour, searchTerms, entriesYear } = useContext(TourContext)

    const [ filteredTours, setFiltered ] = useState([])

    const history = useHistory()
    const currentGigTaxUserId = parseInt(localStorage.getItem("gig-tax_user"))
    const currentUserTours = tours.filter(tour => tour.userId === currentGigTaxUserId)
    const sortedUserTours = currentUserTours.sort((tour1, tour2) => (Date.parse(tour2.dateEnd) - Date.parse(tour1.dateEnd)))

    useEffect(() => {
        getTours()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
          const subset = sortedUserTours.filter(tour => tour.artist.toLowerCase().includes(searchTerms.toLowerCase()) || tour.tourDescription.toLowerCase().includes(searchTerms.toLowerCase()))
          setFiltered(subset)
        } else {
          setFiltered(sortedUserTours)
        }
      }, [searchTerms, tours])

      useEffect(() => {
        if (entriesYear !== "" && entriesYear !== "year") {
          const subset = sortedUserTours.filter(tour => Date.parse(tour.dateEnd) >= Date.parse(`01/01/${entriesYear}`) && Date.parse(tour.dateEnd) < Date.parse(`01/01/${parseInt(entriesYear) + 1}`))
          setFiltered(subset)
        } else {
          setFiltered(sortedUserTours)
        }
      }, [entriesYear, tours])

    return (
        <>
            <div className="tours">
                <h2 className="tours__header">Tours</h2>
                {
                    filteredTours.map(tour => {
                        return (
                            <div className="tour" id={`tour--${tour.id}`}>
                                <div className="tour__item">Artist: {tour.artist}</div>
                                <div className="tour__item">Description: {tour.tourDescription}</div>
                                <div className="tour__item">Number Of Tours: {tour.numberOfTours}</div>
                                <div className="tour__item">Per Diem: ${tour.perDiem}</div>
                                <div className="tour__item">Number of Travel Days: {tour.travelDays}</div>
                                <div className="tour__item">Travel Day Pay: ${tour.travelDayPay}</div>
                                <div className="tour__item">Start Date: {tour.dateStart}</div>
                                <div className="tour__item">Start End: {tour.dateEnd}</div>
                                <div className="tour__item">Tour Gig Pay: ${tour.tourGigPay}</div>
                                <div className="tour__item">Mileage: {tour.mileage}</div>
                                <div className="tour__buttons">
                                    <button className="tour__button" onClick={() => {history.push(`/tour/edit/${tour.id}`)}}>Edit</button>
                                    <button className="tour__button" onClick={() => {history.push("/entries")
                                deleteTour(tour.id)}}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}