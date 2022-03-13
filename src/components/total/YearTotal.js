import React, { useContext, useEffect, useState } from "react"
import { ReceiptContext } from "../receipt/ReceiptProvider"
import { GigContext } from "../gig/GigProvider"
import { TourContext } from "../tour/TourProvider"
import "./Totals.css"

export const YearTotal = () => {

    const { receipts, getReceipts, totalsYear, setReceiptYear } = useContext(ReceiptContext)
    const { tours, getTours, setTourYear } = useContext(TourContext)
    const { gigs, getGigs, setGigYear } = useContext(GigContext)
    // const currentGigTaxUserId = parseInt(localStorage.getItem("gig-tax_user"))
    // const currentUserReceipts = receipts.filter(receipt => receipt.userId === currentGigTaxUserId)
    // const currentUserGigs = gigs.filter(gig => gig.userId === currentGigTaxUserId)
    // const currentUserTours = tours.filter(tour => tour.userId === currentGigTaxUserId)
    const [ filteredReceipts, setFilteredReceipts ] = useState([])
    const [ filteredGigs, setFilteredGigs ] = useState([])
    const [ filteredTours, setFilteredTours ] = useState([])

    // filter receipts based on the year picked in the dropdown menu
    useEffect(() => {
        if (totalsYear !== "year" && totalsYear !== "") {
          const subset = receipts.filter(receipt => Date.parse(receipt.date) > Date.parse(`12/31/${parseInt(totalsYear) - 1}`) && Date.parse(receipt.date) < Date.parse(`01/01/${parseInt(totalsYear) + 1}`))
          setFilteredReceipts(subset)
        } else {
          setFilteredReceipts(receipts)
        }
      }, [totalsYear, receipts])

      // filter gigs based on the year picked in the dropdown menu
      useEffect(() => {
        if (totalsYear !== "year" && totalsYear !== "") {
          const subset = gigs.filter(gig => Date.parse(gig.date) > Date.parse(`12/31/${parseInt(totalsYear) - 1}`) && Date.parse(gig.date) < Date.parse(`01/01/${parseInt(totalsYear) + 1}`))
          setFilteredGigs(subset)
        } else {
          setFilteredGigs(gigs)
        }
      }, [totalsYear, gigs])

      // filter tours based on the year picked in the dropdown menu
      useEffect(() => {
        if (totalsYear !== "year" && totalsYear !== "") {
          const subset = tours.filter(tour => Date.parse(tour.date_end) > Date.parse(`12/31/${parseInt(totalsYear) - 1}`) && Date.parse(tour.date_end) < Date.parse(`01/01/${parseInt(totalsYear) + 1}`))
          setFilteredTours(subset)
        } else {
          setFilteredTours(tours)
        }
      }, [totalsYear, tours])

    let sumOfReceipts = 0
    let sumOfSupplyReceipts = 0
    let sumOfRepairReceipts = 0
    let sumOfEquipmentRentReceipts = 0
    let sumOfOtherRentReceipts = 0
    let sumOfOtherReceipts = 0

    let sumOfGigs = 0
    let totalOfMiles = 0
    let sumOfTours = 0
    
    
        for (const receipt of filteredReceipts) {
            sumOfReceipts += receipt.price
            if(receipt.category_type !== null) {
              if(receipt.category_type.label === "Supplies (gear)") {
                sumOfSupplyReceipts += receipt.price
              }
              else if (receipt.category_type.label === "Repairs & Maintenance") {
                sumOfRepairReceipts += receipt.price
              }
              else if (receipt.category_type.label === "Equipment Rent") {
                sumOfEquipmentRentReceipts += receipt.price
              }
              else if (receipt.category_type.label === "Other Rent") {
                sumOfOtherRentReceipts += receipt.price
              }
              else if (receipt.category_type.label === "Other") {
                sumOfOtherReceipts += receipt.price
              }
            }
        }

        for (const gig of filteredGigs) {
            sumOfGigs += gig.gig_pay
            totalOfMiles += gig.mileage
        }

        for (const tour of filteredTours) {
            sumOfTours += tour.number_of_gigs * tour.tour_gig_pay
            sumOfTours += tour.per_diem * (tour.travel_days + tour.number_of_gigs)
            sumOfTours += tour.travel_days * tour.travel_day_pay
            totalOfMiles += tour.mileage
        }

        // Calculating the total miles tax deduction amount of money based on the standard mileage deduction rate per mile
        let totalMileDeduction = Math.floor(totalOfMiles * .575)

        let totalAmountMade = sumOfTours + sumOfGigs

        // Calculating the total amount of tax money owed based on the current self-employment tax rate
        let totalYearTaxOwed = ((sumOfGigs + sumOfTours - sumOfReceipts - totalMileDeduction) * .153).toFixed(2)

    useEffect(() => {
        getReceipts().then(getGigs).then(getTours)
        setGigYear("")
        setReceiptYear("")
        setTourYear("")
    }, [])

    return (
        <>
        <div className="yearTotalBoxes">
            <div className="yearTotalBox">
                <h2>Total of Receipts</h2>
                <h3 className="yearTotalBox__item"><strong>Total: ${sumOfReceipts.toFixed(2)}</strong></h3>
                <div className="yearTotalBox__item">Supplies: ${sumOfSupplyReceipts.toFixed(2)}</div>
                <div className="yearTotalBox__item">Repairs: ${sumOfRepairReceipts.toFixed(2)}</div>
                <div className="yearTotalBox__item">Equipment Rent: ${sumOfEquipmentRentReceipts.toFixed(2)}</div>
                <div className="yearTotalBox__item">Other Rent: ${sumOfOtherRentReceipts.toFixed(2)}</div>
                <div className="yearTotalBox__item">Other: ${sumOfOtherReceipts.toFixed(2)}</div>
            </div>
            <div className="yearTotalBox">
                <h2>Total Amount Made</h2>
                <h3 className="yearTotalBox__item">${totalAmountMade}</h3>
                {/* <br></br>
                <div className="yearTotalBox__item">(Total of Gigs: ${sumOfGigs})</div>
                <div className="yearTotalBox__item">(Total of Tours: ${sumOfTours})</div> */}
            </div>
            <div className="yearTotalBox">
                <h2>Total Miles Driven</h2>
                <h3 className="yearTotalBox__item">{totalOfMiles}</h3>
            </div>
            <div className="yearTotalBox">
                <h2>Total Mileage Tax Deduction</h2>
                <h3 className="yearTotalBox__item">${totalMileDeduction}</h3>
            </div>
            <div className="yearTotalBox">
                <h2>Total Amount of Taxes Owed</h2>
                {totalYearTaxOwed > 0 ? <h3 className="yearTotalBox__item">${totalYearTaxOwed}</h3>: <h3 className="yearTotalBox__item">$0</h3>}
            </div>
        </div>
        </>
    )
}