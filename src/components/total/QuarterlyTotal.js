import React, { useContext, useEffect } from "react"
import { ReceiptContext } from "../receipt/ReceiptProvider"
import { GigContext } from "../gig/GigProvider"
import { TourContext } from "../tour/TourProvider"
import "./Totals.css"

export const QuarterlyTotal = () => {
    const { receipts, getReceipts } = useContext(ReceiptContext)
    const { tours, getTours } = useContext(TourContext)
    const { gigs, getGigs } = useContext(GigContext)
    const currentGigTaxUserId = parseInt(localStorage.getItem("gig-tax_user"))

    useEffect(() => {
        getReceipts().then(getGigs).then(getTours)
    }, [])

    const currentUserReceipts = receipts.filter(receipt => receipt.userId === currentGigTaxUserId)
    const currentUserGigs = gigs.filter(gig => gig.userId === currentGigTaxUserId)
    const currentUserTours = tours.filter(tour => tour.userId === currentGigTaxUserId)

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

    for (const receipt of currentUserReceipts) {
        if(Date.parse(receipt.date) >= Date.parse("01/01/2021") && Date.parse(receipt.date) <= Date.parse("03/31/2021")) {
            sumOfReceiptsQuarter1 += receipt.price
        }
        else if(Date.parse(receipt.date) >= Date.parse("04/01/2021") && Date.parse(receipt.date) <= Date.parse("06/30/2021")) {
            sumOfReceiptsQuarter2 += receipt.price
        }
        else if(Date.parse(receipt.date) >= Date.parse("07/01/2021") && Date.parse(receipt.date) <= Date.parse("09/30/2021")) {
            sumOfReceiptsQuarter3 += receipt.price
        }
        else if(Date.parse(receipt.date) >= Date.parse("10/01/2021") && Date.parse(receipt.date) <= Date.parse("12/31/2021")) {
            sumOfReceiptsQuarter4 += receipt.price
        }
    }

    for (const gig of currentUserGigs) {
        if(Date.parse(gig.date) >= Date.parse("01/01/2021") && Date.parse(gig.date) <= Date.parse("03/31/2021")) {
            sumOfGigsQuarter1 += gig.gigPay
            totalOfMilesQuarter1 += gig.mileage
        }
        else if(Date.parse(gig.date) >= Date.parse("04/01/2021") && Date.parse(gig.date) <= Date.parse("06/30/2021")) {
            sumOfGigsQuarter2 += gig.gigPay
            totalOfMilesQuarter2 += gig.mileage
        }
        else if(Date.parse(gig.date) >= Date.parse("07/01/2021") && Date.parse(gig.date) <= Date.parse("09/30/2021")) {
            sumOfGigsQuarter3 += gig.gigPay
            totalOfMilesQuarter3 += gig.mileage
        }
        else if(Date.parse(gig.date) >= Date.parse("10/01/2021") && Date.parse(gig.date) <= Date.parse("12/31/2021")) {
            sumOfGigsQuarter4 += gig.gigPay
            totalOfMilesQuarter4 += gig.mileage
        }
    }

    for (const tour of currentUserTours) {
        if(Date.parse(tour.dateEnd) >= Date.parse("01/01/2021") && Date.parse(tour.dateEnd) <= Date.parse("03/31/2021")) {
            sumOfToursQuarter1 += tour.numberOfGigs * tour.tourGigPay
            sumOfToursQuarter1 += tour.perDiem * (tour.travelDays + tour.numberOfGigs)
            sumOfToursQuarter1 += tour.travelDays * tour.travelDayPay
            totalOfMilesQuarter1 += tour.mileage
        }
        else if(Date.parse(tour.dateEnd) >= Date.parse("04/01/2021") && Date.parse(tour.dateEnd) <= Date.parse("06/30/2021")) {
            sumOfToursQuarter2 += tour.numberOfGigs * tour.tourGigPay
            sumOfToursQuarter2 += tour.perDiem * (tour.travelDays + tour.numberOfGigs)
            sumOfToursQuarter2 += tour.travelDays * tour.travelDayPay
            totalOfMilesQuarter2 += tour.mileage
        }
        else if(Date.parse(tour.dateEnd) >= Date.parse("07/01/2021") && Date.parse(tour.dateEnd) <= Date.parse("09/30/2021")) {
            sumOfToursQuarter3 += tour.numberOfGigs * tour.tourGigPay
            sumOfToursQuarter3 += tour.perDiem * (tour.travelDays + tour.numberOfGigs)
            sumOfToursQuarter3 += tour.travelDays * tour.travelDayPay
            totalOfMilesQuarter3 += tour.mileage
        }
        else if(Date.parse(tour.dateEnd) >= Date.parse("10/01/2021") && Date.parse(tour.dateEnd) <= Date.parse("12/31/2021")) {
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