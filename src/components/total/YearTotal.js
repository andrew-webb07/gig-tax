import React, { useContext, useEffect } from "react"
import { ReceiptContext } from "../receipt/ReceiptProvider"
import { GigContext } from "../gig/GigProvider"
import { TourContext } from "../tour/TourProvider"
import "./Totals.css"

export const YearTotal = () => {

    const { receipts, getReceipts } = useContext(ReceiptContext)
    const { tours, getTours } = useContext(TourContext)
    const { gigs, getGigs } = useContext(GigContext)
    const currentGigTaxUserId = parseInt(localStorage.getItem("gig-tax_user"))
    const currentUserReceipts = receipts.filter(receipt => receipt.userId === currentGigTaxUserId)
    const currentUserGigs = gigs.filter(gig => gig.userId === currentGigTaxUserId)
    const currentUserTours = tours.filter(tour => tour.userId === currentGigTaxUserId)

    let sumOfReceipts = 0
    let sumOfGigs = 0
    let totalOfMiles = 0
    let sumOfTours = 0
    
    
        for (const receipt of currentUserReceipts) {
            sumOfReceipts += receipt.price
        }

        for (const gig of currentUserGigs) {
            sumOfGigs += gig.gigPay
            totalOfMiles += gig.mileage
        }

        for (const tour of currentUserTours) {
            sumOfTours += tour.numberOfGigs * tour.tourGigPay
            sumOfTours += tour.perDiem * (tour.travelDays + tour.numberOfGigs)
            sumOfTours += tour.travelDays * tour.travelDayPay
            totalOfMiles += tour.mileage
        }

        let totalMileDeduction = Math.floor(totalOfMiles * .575)
        let totalAmountMade = sumOfTours + sumOfGigs

        let totalYearTaxOwed = ((sumOfGigs + sumOfTours - sumOfReceipts - totalMileDeduction) * .153).toLocaleString('en-US', {style: 'currency', currency: 'USD'})

    useEffect(() => {
        getReceipts().then(getGigs).then(getTours)
    }, [])

    return (
        <>
        <div className="yearTotalBoxes">
            <div className="yearTotalBox">
                <h2>Total of Receipts</h2>
                <div className="yearTotalBox__item">${sumOfReceipts}</div>
            </div>
            <div className="yearTotalBox">
                <h2>Total Amount Made</h2>
                <div className="yearTotalBox__item">${totalAmountMade}</div>
                <div className="yearTotalBox__item">(Total of Gigs: ${sumOfGigs})</div>
                <div className="yearTotalBox__item">(Total of Tours: ${sumOfTours})</div>
            </div>
            <div className="yearTotalBox">
                <h2>Total Miles Driven</h2>
                <div className="yearTotalBox__item">{totalOfMiles}</div>
            </div>
            <div className="yearTotalBox">
                <h2>Total Mileage Tax Deduction</h2>
                <div className="yearTotalBox__item">${totalMileDeduction}</div>
            </div>
            <div className="yearTotalBox">
                <h2>Total Amount of Taxes Owed</h2>
                <div className="yearTotalBox__item">{totalYearTaxOwed}</div>
            </div>
        </div>
        </>
    )
}