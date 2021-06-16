import React, { useContext, useEffect, useState } from "react"
import { ReceiptContext } from "../receipt/ReceiptProvider"
import { GigContext } from "../gig/GigProvider"
import { TourContext } from "../tour/TourProvider"
import "./Totals.css"

export const QuarterlyTotal = () => {
    const { receipts, getReceipts, totalsYear } = useContext(ReceiptContext)
    const { tours, getTours } = useContext(TourContext)
    const { gigs, getGigs } = useContext(GigContext)
    const currentGigTaxUserId = parseInt(localStorage.getItem("gig-tax_user"))

    const currentUserReceipts = receipts.filter(receipt => receipt.userId === currentGigTaxUserId)
    const currentUserGigs = gigs.filter(gig => gig.userId === currentGigTaxUserId)
    const currentUserTours = tours.filter(tour => tour.userId === currentGigTaxUserId)

    const [ filteredReceipts, setFilteredReceipts ] = useState([])
    const [ filteredGigs, setFilteredGigs ] = useState([])
    const [ filteredTours, setFilteredTours ] = useState([])


    useEffect(() => {
        getReceipts().then(getGigs).then(getTours)
    }, [])
    

    useEffect(() => {
        if (totalsYear !== "year" && totalsYear !== "") {
          const subset = currentUserReceipts.filter(receipt => Date.parse(receipt.date) >= Date.parse(`01/01/${totalsYear}`) && Date.parse(receipt.date) < Date.parse(`01/01/${parseInt(totalsYear) + 1}`))
          setFilteredReceipts(subset)
        } else {
          setFilteredReceipts(currentUserReceipts)
        }
      }, [totalsYear, receipts])

      useEffect(() => {
        if (totalsYear !== "year" && totalsYear !== "") {
          const subset = currentUserGigs.filter(gig => Date.parse(gig.date) >= Date.parse(`01/01/${totalsYear}`) && Date.parse(gig.date) < Date.parse(`01/01/${parseInt(totalsYear) + 1}`))
          setFilteredGigs(subset)
        } else {
          setFilteredGigs(currentUserGigs)
        }
      }, [totalsYear, gigs])

      useEffect(() => {
        if (totalsYear !== "year" && totalsYear !== "") {
          const subset = currentUserTours.filter(tour => Date.parse(tour.dateEnd) >= Date.parse(`01/01/${totalsYear}`) && Date.parse(tour.dateEnd) < Date.parse(`01/01/${parseInt(totalsYear) + 1}`))
          setFilteredTours(subset)
        } else {
          setFilteredTours(currentUserTours)
        }
      }, [totalsYear, tours])

    let sumOfReceiptsQuarter1 = 0
    let sumOfReceiptsQuarter2 = 0
    let sumOfReceiptsQuarter3 = 0
    let sumOfReceiptsQuarter4 = 0

    let sumOfGigsQuarter1 = 0
    let sumOfGigsQuarter2 = 0
    let sumOfGigsQuarter3 = 0
    let sumOfGigsQuarter4 = 0

    let totalOfMilesQuarter1 = 0
    let totalOfMilesQuarter2 = 0
    let totalOfMilesQuarter3 = 0
    let totalOfMilesQuarter4 = 0

    let sumOfToursQuarter1 = 0
    let sumOfToursQuarter2 = 0
    let sumOfToursQuarter3 = 0
    let sumOfToursQuarter4 = 0

    for (const receipt of filteredReceipts) {
        if(Date.parse(receipt.date) >= Date.parse(`01/01/${totalsYear}`) && Date.parse(receipt.date) <= Date.parse(`03/31/${totalsYear}`)) {
            sumOfReceiptsQuarter1 += receipt.price
        }
        else if(Date.parse(receipt.date) >= Date.parse(`04/01/${totalsYear}`) && Date.parse(receipt.date) <= Date.parse(`06/30/${totalsYear}`)) {
            sumOfReceiptsQuarter2 += receipt.price
        }
        else if(Date.parse(receipt.date) >= Date.parse(`07/01/${totalsYear}`) && Date.parse(receipt.date) <= Date.parse(`09/30/${totalsYear}`)) {
            sumOfReceiptsQuarter3 += receipt.price
        }
        else if(Date.parse(receipt.date) >= Date.parse(`10/01/${totalsYear}`) && Date.parse(receipt.date) <= Date.parse(`12/31/${totalsYear}`)) {
            sumOfReceiptsQuarter4 += receipt.price
        }
    }

    for (const gig of filteredGigs) {
        if(Date.parse(gig.date) >= Date.parse(`01/01/${totalsYear}`) && Date.parse(gig.date) <= Date.parse(`03/31/${totalsYear}`)) {
            sumOfGigsQuarter1 += gig.gigPay
            totalOfMilesQuarter1 += gig.mileage
        }
        else if(Date.parse(gig.date) >= Date.parse(`04/01/${totalsYear}`) && Date.parse(gig.date) <= Date.parse(`06/30/${totalsYear}`)) {
            sumOfGigsQuarter2 += gig.gigPay
            totalOfMilesQuarter2 += gig.mileage
        }
        else if(Date.parse(gig.date) >= Date.parse(`07/01/${totalsYear}`) && Date.parse(gig.date) <= Date.parse(`09/30/${totalsYear}`)) {
            sumOfGigsQuarter3 += gig.gigPay
            totalOfMilesQuarter3 += gig.mileage
        }
        else if(Date.parse(gig.date) >= Date.parse(`10/01/${totalsYear}`) && Date.parse(gig.date) <= Date.parse(`12/31/${totalsYear}`)) {
            sumOfGigsQuarter4 += gig.gigPay
            totalOfMilesQuarter4 += gig.mileage
        }
    }

    for (const tour of filteredTours) {
        if(Date.parse(tour.dateEnd) >= Date.parse(`01/01/${totalsYear}`) && Date.parse(tour.dateEnd) <= Date.parse(`03/31/${totalsYear}`)) {
            sumOfToursQuarter1 += tour.numberOfGigs * tour.tourGigPay
            sumOfToursQuarter1 += tour.perDiem * (tour.travelDays + tour.numberOfGigs)
            sumOfToursQuarter1 += tour.travelDays * tour.travelDayPay
            totalOfMilesQuarter1 += tour.mileage
        }
        else if(Date.parse(tour.dateEnd) >= Date.parse(`04/01/${totalsYear}`) && Date.parse(tour.dateEnd) <= Date.parse(`06/30/${totalsYear}`)) {
            sumOfToursQuarter2 += tour.numberOfGigs * tour.tourGigPay
            sumOfToursQuarter2 += tour.perDiem * (tour.travelDays + tour.numberOfGigs)
            sumOfToursQuarter2 += tour.travelDays * tour.travelDayPay
            totalOfMilesQuarter2 += tour.mileage
        }
        else if(Date.parse(tour.dateEnd) >= Date.parse(`07/01/${totalsYear}`) && Date.parse(tour.dateEnd) <= Date.parse(`09/30/${totalsYear}`)) {
            sumOfToursQuarter3 += tour.numberOfGigs * tour.tourGigPay
            sumOfToursQuarter3 += tour.perDiem * (tour.travelDays + tour.numberOfGigs)
            sumOfToursQuarter3 += tour.travelDays * tour.travelDayPay
            totalOfMilesQuarter3 += tour.mileage
        }
        else if(Date.parse(tour.dateEnd) >= Date.parse(`10/01/${totalsYear}`) && Date.parse(tour.dateEnd) <= Date.parse(`12/31/${totalsYear}`)) {
            sumOfToursQuarter4 += tour.numberOfGigs * tour.tourGigPay
            sumOfToursQuarter4 += tour.perDiem * (tour.travelDays + tour.numberOfGigs)
            sumOfToursQuarter4 += tour.travelDays * tour.travelDayPay
            totalOfMilesQuarter4 += tour.mileage
        }
    }

    let totalQuarterlyAmountMadeQuarter1 = sumOfGigsQuarter1 + sumOfToursQuarter1
    let totalQuarterlyAmountMadeQuarter2 = sumOfGigsQuarter2 + sumOfToursQuarter2
    let totalQuarterlyAmountMadeQuarter3 = sumOfGigsQuarter3 + sumOfToursQuarter3
    let totalQuarterlyAmountMadeQuarter4 = sumOfGigsQuarter4 + sumOfToursQuarter4

    let totalMileDeductionQuarter1 = Math.floor(totalOfMilesQuarter1 * .575)
    let totalMileDeductionQuarter2 = Math.floor(totalOfMilesQuarter2 * .575)
    let totalMileDeductionQuarter3 = Math.floor(totalOfMilesQuarter3 * .575)
    let totalMileDeductionQuarter4 = Math.floor(totalOfMilesQuarter4 * .575)

    let totalTaxOwedQuarter1 = ((sumOfGigsQuarter1 + sumOfToursQuarter1 - sumOfReceiptsQuarter1 - totalMileDeductionQuarter1) * .153).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    let totalTaxOwedQuarter2 = ((sumOfGigsQuarter2 + sumOfToursQuarter2 - sumOfReceiptsQuarter2 - totalMileDeductionQuarter2) * .153).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    let totalTaxOwedQuarter3 = ((sumOfGigsQuarter3 + sumOfToursQuarter3 - sumOfReceiptsQuarter3 - totalMileDeductionQuarter3) * .153).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
    let totalTaxOwedQuarter4 = ((sumOfGigsQuarter4 + sumOfToursQuarter4 - sumOfReceiptsQuarter4 - totalMileDeductionQuarter4) * .153).toLocaleString('en-US', {style: 'currency', currency: 'USD'})

    return (
        <>
            <div className="quarterlyTotalBoxes">
                <div className="quarterlyTotalBox">
                    <h2>Quarter 1 Totals</h2>
                        <div className="quarterTotalBox__item">Total Amount Made: ${totalQuarterlyAmountMadeQuarter1}</div>
                        <div className="quarterTotalBox__item">Total of Gigs: ${sumOfGigsQuarter1}</div>
                        <div className="quarterTotalBox__item">Total of Tours: ${sumOfToursQuarter1}</div>
                        <div className="quarterTotalBox__item">Total of Receipts: ${sumOfReceiptsQuarter1}</div>
                        <div className="quarterTotalBox__item">Total Miles Driven: {totalOfMilesQuarter1}</div>
                        <div className="quarterTotalBox__item">Total Miles Deduction: ${totalMileDeductionQuarter1}</div>
                        <div className="quarterTotalBox__item">Total Amount Of Taxes Owed: {totalTaxOwedQuarter1}</div>
                </div>
                <div className="quarterlyTotalBox">
                    <h2>Quarter 2 Totals</h2>
                        <div className="quarterTotalBox__item">Total Amount Made: ${totalQuarterlyAmountMadeQuarter2}</div>
                        <div className="quarterTotalBox__item">Total of Gigs: ${sumOfGigsQuarter2}</div>
                        <div className="quarterTotalBox__item">Total of Tours: ${sumOfToursQuarter2}</div>
                        <div className="quarterTotalBox__item">Total of Receipts: ${sumOfReceiptsQuarter2}</div>
                        <div className="quarterTotalBox__item">Total Miles Driven: {totalOfMilesQuarter2}</div>
                        <div className="quarterTotalBox__item">Total Miles Deduction: ${totalMileDeductionQuarter2}</div>
                        <div className="quarterTotalBox__item">Total Amount Of Taxes Owed: {totalTaxOwedQuarter2}</div>
                </div>
                <div className="quarterlyTotalBox">
                    <h2>Quarter 3 Totals</h2>
                        <div className="quarterTotalBox__item">Total Amount Made: ${totalQuarterlyAmountMadeQuarter3}</div>
                        <div className="quarterTotalBox__item">Total of Gigs: ${sumOfGigsQuarter3}</div>
                        <div className="quarterTotalBox__item">Total of Tours: ${sumOfToursQuarter3}</div>
                        <div className="quarterTotalBox__item">Total of Receipts: ${sumOfReceiptsQuarter3}</div>
                        <div className="quarterTotalBox__item">Total Miles Driven: {totalOfMilesQuarter3}</div>
                        <div className="quarterTotalBox__item">Total Miles Deduction: ${totalMileDeductionQuarter3}</div>
                        <div className="quarterTotalBox__item">Total Amount Of Taxes Owed: {totalTaxOwedQuarter3}</div>
                </div>
                <div className="quarterlyTotalBox">
                    <h2>Quarter 4 Totals</h2>
                        <div className="quarterTotalBox__item">Total Amount Made: ${totalQuarterlyAmountMadeQuarter4}</div>
                        <div className="quarterTotalBox__item">Total of Gigs: ${sumOfGigsQuarter4}</div>
                        <div className="quarterTotalBox__item">Total of Tours: ${sumOfToursQuarter4}</div>
                        <div className="quarterTotalBox__item">Total of Receipts: ${sumOfReceiptsQuarter4}</div>
                        <div className="quarterTotalBox__item">Total Miles Driven: {totalOfMilesQuarter4}</div>
                        <div className="quarterTotalBox__item">Total Miles Deduction: ${totalMileDeductionQuarter4}</div>
                        <div className="quarterTotalBox__item">Total Amount Of Taxes Owed: {totalTaxOwedQuarter4}</div>
                </div>
            </div>
        </>
    )
}