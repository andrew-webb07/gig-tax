import React from "react"
import { Route } from "react-router-dom"
import { LandingPage } from "./landingPage/LandingPage"
import { ReceiptForm } from "./receipt/ReceiptForm"
import { ReceiptProvider } from "./receipt/ReceiptProvider"
import { ReceiptList } from "./receipt/ReceiptList"

export const ApplicationViews = () => {
    return (
    <>
        <ReceiptProvider>
            <Route exact path="/">
                <LandingPage />
            </Route>
            <Route exact path="/receipt/create">
                <ReceiptForm/>
            </Route>
            <Route path="/receipt/edit/:receiptId(\d+)">
                <ReceiptForm/>
            </Route>

            <Route exact path="/entries">
                <ReceiptList />
            </Route>
        </ReceiptProvider>
    </>
    )
}