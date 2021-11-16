import React, { useContext, useEffect, useState } from "react"
import "./Receipt.css"
import { ReceiptContext } from "./ReceiptProvider"
import { useHistory } from "react-router-dom"

export const ReceiptList = () => {
    const { receipts, getReceipts, deleteReceipt, searchTerms, entriesYear, setReceiptSearchTerms, setReceiptYearEntries} = useContext(ReceiptContext)

    const [ filteredReceipts, setFiltered ] = useState([])

    const history = useHistory()
    // const currentGigTaxUserId = parseInt(localStorage.getItem("gig-tax_user"))
    // const currentUserReceipts = receipts.filter(receipt => receipt.userId === currentGigTaxUserId)
    const sortedUserReceipts = receipts.sort((receipt1, receipt2) => (Date.parse(receipt2.date) - Date.parse(receipt1.date)))

    // reset the search bar and year dropdown menu on page load
    useEffect(() => {
        getReceipts()
        setReceiptSearchTerms("")
        setReceiptYearEntries("")
    }, [])

    // filter receipts based on content in the search bar
    useEffect(() => {
        if (searchTerms !== "") {
          const subset = sortedUserReceipts.filter(receipt => receipt.businessName.toLowerCase().includes(searchTerms.toLowerCase()))
          setFiltered(subset)
        } else {
          setFiltered(sortedUserReceipts)
        }
      }, [searchTerms, receipts])

      // filter receipts based on year picked in dropdown menu
      useEffect(() => {
        if (entriesYear !== "" && entriesYear !== "year") {
          const subset = sortedUserReceipts.filter(receipt => Date.parse(receipt.date) >= Date.parse(`01/01/${entriesYear}`) && Date.parse(receipt.date) < Date.parse(`01/01/${parseInt(entriesYear) + 1}`))
          setFiltered(subset)
        } else {
          setFiltered(sortedUserReceipts)
        }
      }, [entriesYear, receipts])

    return (
        <>
            <div className="receipts">
                <h2 className="receipts__header">Receipts</h2>
                {
                    filteredReceipts.map(receipt => {
                        return (
                            <div className="receipt" id={`Receipt--${receipt.id}`}>
                                <div className="receipt__item">Business: {receipt.business_name}</div>
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