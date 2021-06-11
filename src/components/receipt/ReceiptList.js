import React, { useContext, useEffect } from "react"
import "./Receipt.css"
import { ReceiptContext } from "./ReceiptProvider"

export const ReceiptList = () => {
    const { receipts, getReceipts } = useContext(ReceiptContext)

    useEffect(() => {
        getReceipts()
    }, [])

    return (
        <>
            <div className="receipts">
                <h2 className="receipts__header">Receipts</h2>
                {
                    receipts.map(receipt => {
                        return (
                            <div className="receipt" id={`Receipt--${receipt.id}`}>
                                <div className="receipt__item">Business: {receipt.businessName}</div>
                                <div className="receipt__item">Address: {receipt.businessAddress}</div>
                                <div className="receipt__item">Description: {receipt.description}</div>
                                <div className="receipt__item">Date: {receipt.date}</div>
                                <div className="receipt__item">Price: ${receipt.price}</div>
                                <div className="receipt__item">Receipt Number: {receipt.receiptNumber}</div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}