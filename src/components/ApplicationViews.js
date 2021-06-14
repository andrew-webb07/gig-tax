import React from "react"
import { Route } from "react-router-dom"
import { LandingPage } from "./landingPage/LandingPage"
import { ReceiptForm } from "./receipt/ReceiptForm"
import { ReceiptProvider } from "./receipt/ReceiptProvider"
import { ReceiptList } from "./receipt/ReceiptList"
import { GigForm } from "./gig/GigForm"
import { GigProvider } from "./gig/GigProvider"

export const ApplicationViews = () => {
    return (
    <>
        <ReceiptProvider>
            <GigProvider>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route exact path="/gig/create">
                    <GigForm/>
                </Route>
                <Route exact path="/gig/edit/:gigId(\d+)">
                    <GigForm/>
                </Route>
                <Route exact path="/receipt/create">
                    <ReceiptForm/>
                </Route>
                <Route exact path="/receipt/edit/:receiptId(\d+)">
                    <ReceiptForm/>
                </Route>

                <Route exact path="/entries">
                    <ReceiptList />
                </Route>
            </GigProvider>
        </ReceiptProvider>
    </>
    )
}