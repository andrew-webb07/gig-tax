import React from "react"
import { Route } from "react-router-dom"
import { LandingPage } from "./landingPage/LandingPage"
import { ReceiptForm } from "./receipt/ReceiptForm"
import { ReceiptProvider } from "./receipt/ReceiptProvider"
import { ReceiptList } from "./receipt/ReceiptList"
import { GigForm } from "./gig/GigForm"
import { GigProvider } from "./gig/GigProvider"
import { GigList } from "./gig/GigList"
import { TourForm } from "./tour/TourForm"
import { TourProvider } from "./tour/TourProvider"
import { TourList } from "./tour/TourList"
import { YearTotal } from "./total/YearTotal"
import "./total/Totals.css"
import "./GigTax.css"
import { QuarterlyTotal } from "./total/QuarterlyTotal"
import { Search } from "./entries/Search"
import { YearDropDownEntries } from "./entries/YearDropDownEntries"
import { YearDropDownTotals } from "./entries/YearDropDownTotals"
import { DistanceProvider } from "./distance/DistanceProvider"

export const ApplicationViews = () => {
    return (
    <>
        <ReceiptProvider>
            <GigProvider>
                <TourProvider>
                    <DistanceProvider>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>
                    
                    <Route exact path="/gig/create">
                        <GigForm/>
                    </Route>
                    <Route exact path="/gig/edit/:gigId(\d+)">
                        <GigForm/>
                    </Route>

                    <Route exact path="/tour/create">
                        <TourForm/>
                    </Route>
                    <Route exact path="/tour/edit/:tourId(\d+)">
                        <TourForm/>
                    </Route>

                    <Route exact path="/receipt/create">
                        <ReceiptForm/>
                    </Route>
                    <Route exact path="/receipt/edit/:receiptId(\d+)">
                        <ReceiptForm/>
                    </Route>

                    <Route exact path="/entries">
                        <Search/>
                        <YearDropDownEntries />

                            <div className="entryLists">
                                <GigList />
                                <TourList />
                                <ReceiptList />
                            </div>
                    </Route>

                    <Route exact path="/totals">
                    <YearDropDownTotals />
                        <div className="totalsBoxes">    
                            <YearTotal />
                        </div>
                        <div className="totalsBoxesQuarterly">
                            <QuarterlyTotal />
                        </div>
                    </Route>
                    </DistanceProvider>
                </TourProvider>
            </GigProvider>
        </ReceiptProvider>
    </>
    )
}