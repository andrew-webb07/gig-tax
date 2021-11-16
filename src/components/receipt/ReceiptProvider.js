import React, { useState, createContext } from "react"

export const ReceiptContext = createContext()

export const ReceiptProvider = (props) => {

    const [receipts, setReceipts] = useState([])
    const [ searchTerms, setReceiptSearchTerms ] = useState("")
    const [ entriesYear , setReceiptYearEntries] = useState("")
    const [ totalsYear , setReceiptYear] = useState("")

    const getReceipts = () => {
        return fetch("https://gig-tax-server.herokuapp.com/receipts", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`
        }
    })
        .then(res => res.json())
        .then(setReceipts)
    }

    const addReceipt = ReceiptObj => {
        return fetch("https://gig-tax-server.herokuapp.com/receipts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ReceiptObj)
        })
        .then(getReceipts)
    }

    const deleteReceipt = receiptId => {
        return fetch(`https://gig-tax-server.herokuapp.com/receipts/${receiptId}`, {
            method: "DELETE"
        })
            .then(getReceipts)
    }

    const getReceiptById = receiptId => {
        return fetch(`https://gig-tax-server.herokuapp.com/receipts/${receiptId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`
            }
        })
        .then(res => res.json())
    }

    const updateReceipt = receipt => {
        return fetch(`https://gig-tax-server.herokuapp.com/receipts/${receipt.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(receipt)
        })
          .then(getReceipts)
      }

    return (
        <ReceiptContext.Provider value={{
            receipts, getReceipts, addReceipt, deleteReceipt, getReceiptById, updateReceipt, setReceiptSearchTerms, searchTerms, setReceiptYear, entriesYear, setReceiptYearEntries, totalsYear
        }}>
            {props.children}
        </ReceiptContext.Provider>
    )
}