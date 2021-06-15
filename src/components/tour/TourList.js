import React, { useContext, useEffect } from "react"
import "./Tour.css"
import { TourContext } from "./TourProvider"
import { useHistory } from "react-router-dom"

export const TourList = () => {
    const { tours, getTours, deleteTour } = useContext(TourContext)

    const history = useHistory()
    const currentGigTaxUserId = parseInt(localStorage.getItem("gig-tax_user"))
    const currentUserTours = tours.filter(tour => tour.userId === currentGigTaxUserId)

    useEffect(() => {
        getTours()
    }, [])

    return (
        <>
            <div className="tours">
                <h2 className="tours__header">Tours</h2>
                {
                    currentUserTours.map(tour => {
                        return (
                            <div className="tour" id={`tour--${tour.id}`}>
                                <div className="tour__item">Artist: {tour.artist}</div>
                                <div className="tour__item">Description: {tour.tourDescription}</div>
                                <div className="tour__item">Number Of Gigs: {tour.numberOfGigs}</div>
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