import React, { useState, createContext } from "react"

export const ReceiptContext = createContext()

export const ReceiptProvider = (props) => {

    const [receipts, setReceipts] = useState([])

    const getReceipts = () => {
        return fetch("http://localhost:8088/receipts")
        .then(res => res.json())
        .then(setReceipts)
    }

    const addReceipt = ReceiptObj => {
        return fetch("http://localhost:8088/receipts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ReceiptObj)
        })
        .then(getReceipts)
    }

    const deleteReceipt = receiptId => {
        return fetch(`http://localhost:8088/receipts/${receiptId}`, {
            method: "DELETE"
        })
            .then(getReceipts)
    }

    const getReceiptById = receiptId => {
        return fetch(`http://localhost:8088/receipts/${receiptId}`)
        .then(res => res.json())
    }

    const updateReceipt = receipt => {
        return fetch(`http://localhost:8088/receipts/${receipt.id}`, {
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
            receipts, getReceipts, addReceipt, deleteReceipt, getReceiptById, updateReceipt
        }}>
            {props.children}
        </ReceiptContext.Provider>
    )
}