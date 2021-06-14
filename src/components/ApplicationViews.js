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

export const ApplicationViews = () => {
    return (
    <>
        <ReceiptProvider>
            <GigProvider>
                <TourProvider>
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
                        <GigList />
                        <ReceiptList />
                    </Route>
                </TourProvider>
            </GigProvider>
        </ReceiptProvider>
    </>
    )
}