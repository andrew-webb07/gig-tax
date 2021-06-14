import React, { useContext, useEffect } from "react"
import "./Receipt.css"
import { ReceiptContext } from "./ReceiptProvider"
import { useHistory } from "react-router-dom"

export const ReceiptList = () => {
    const { receipts, getReceipts, deleteReceipt} = useContext(ReceiptContext)

    const history = useHistory()
    const currentGigTaxUserId = parseInt(localStorage.getItem("gig-tax_user"))
    const currentUserReceipts = receipts.filter(receipt => receipt.userId === currentGigTaxUserId)

    useEffect(() => {
        getReceipts()
    }, [])

    return (
        <>
            <div className="receipts">
                <h2 className="receipts__header">Receipts</h2>
                {
                    currentUserReceipts.map(receipt => {
                        return (
                            <div className="receipt" id={`Receipt--${receipt.id}`}>
                                <div className="receipt__item">Business: {receipt.businessName}</div>
                                <div className="receipt__item">Address: {receipt.businessAddress}</div>
                                <div className="receipt__item">Description: {receipt.description}</div>
                                <div className="receipt__item">Date: {receipt.date}</div>
                                <div className="receipt__item">Price: ${receipt.price}</div>
                                <div className="receipt__item">Receipt Number: {receipt.receiptNumber}</div>
                                <div className="receipt__buttons">
                                    <button className="receipt__button" onClick={() => {history.push(`/receipt/edit/${receipt.id}`)}}>Edit</button>
                                    <button className="receipt__button" onClick={() => {history.push("/entries")
                                deleteReceipt(receipt.id)}}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}