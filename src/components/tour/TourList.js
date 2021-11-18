import React, { useContext, useEffect, useState } from "react"
import "./Tour.css"
import { TourContext } from "./TourProvider"
import { useHistory } from "react-router-dom"

export const TourList = () => {
    const { tours, getTours, deleteTour, searchTerms, entriesYear, setTourSearchTerms, setTourYearEntries } = useContext(TourContext)

    const [ filteredTours, setFiltered ] = useState([])

    const history = useHistory()
    const currentGigTaxUserId = parseInt(localStorage.getItem("gig-tax_user"))
    // const currentUserTours = tours.filter(tour => tour.userId === currentGigTaxUserId)
    const sortedUserTours = tours.sort((tour1, tour2) => (Date.parse(tour2.date_end) - Date.parse(tour1.date_end)))

    // reset the search bar and year dropdown menu on page load
    useEffect(() => {
        getTours()
        setTourSearchTerms("")
        setTourYearEntries("")
    }, [])

    // filter tours based on content in the search bar
    useEffect(() => {
        if (searchTerms !== "") {
          const subset = sortedUserTours.filter(tour => tour.artist.toLowerCase().includes(searchTerms.toLowerCase()) || tour.tour_description.toLowerCase().includes(searchTerms.toLowerCase()))
          setFiltered(subset)
        } else {
          setFiltered(sortedUserTours)
        }
      }, [searchTerms, tours])

      // filter tours based on year picked in dropdown menu
      useEffect(() => {
        if (entriesYear !== "" && entriesYear !== "year") {
          const subset = sortedUserTours.filter(tour => Date.parse(tour.date_end) >= Date.parse(`01/01/${entriesYear}`) && Date.parse(tour.date_end) < Date.parse(`01/01/${parseInt(entriesYear) + 1}`))
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
                                <div className="tour__item">Description: {tour.tour_description}</div>
                                <div className="tour__item">Number Of Gigs: {tour.number_of_gigs}</div>
                                <div className="tour__item">Per Diem: ${tour.per_diem}</div>
                                <div className="tour__item">Number of Travel Days: {tour.travel_days}</div>
                                <div className="tour__item">Travel Day Pay: ${tour.travel_day_pay}</div>
                                <div className="tour__item">Start Date: {tour.date_start}</div>
                                <div className="tour__item">Start End: {tour.date_end}</div>
                                <div className="tour__item">Tour Gig Pay: ${tour.tour_gig_pay}</div>
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