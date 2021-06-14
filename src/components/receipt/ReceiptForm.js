import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { ReceiptContext } from "./ReceiptProvider"
import "./Receipt.css"

export const ReceiptForm = () => {
    const { addReceipt, getReceiptById, updateReceipt } = useContext(ReceiptContext)

 
    //     if (receiptId) {
    //         const [ businessAddress1, businessCity, businessState, businessZipcode ] = receipt.businessAddress.split(",")
    //         const [ receipt, setReceipt ] = useState({
    //             businessAddress1: businessAddress1,
    //             businessCity: businessCity,
    //             businessState: businessState,
    //             businessZipcode: businessZipcode,
    //     })
    // } else {
    //         const [ receipt, setReceipt ] = useState({
    //             businessName: "",
    //             businessAddress1: "",
    //             businessCity: "",
    //             businessState: "",
    //             businessZipcode: "",
    //             description: "",
    //             date: "",
    //             price: "",
    //             receiptNumber: ""
    //         })
    // }
    

    const [ receipt, setReceipt ] = useState({
                    businessName: "",
                    businessAddress1: "",
                    businessCity: "",
                    businessState: "",
                    businessZipcode: "",
                    description: "",
                    date: "",
                    price: "",
                    receiptNumber: ""
    })

    const [isLoading, setIsLoading] = useState(true);
    const {receiptId} = useParams();
	const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newReceipt = { ...receipt }
        newReceipt[event.target.id] = event.target.value
        setReceipt(newReceipt)
      }

    const handleSaveReceipt = () => {
        if (receipt.businessName === "" || receipt.businessAddress1 === "" || receipt.businessCity === "" || receipt.businessState === "" || receipt.businessZipcode === "" || receipt.description === "" || receipt.date === "" || receipt.price === "" || receipt.receiptNumber === "") {
            window.alert("Please fill out the form completely")
        } else {
            setIsLoading(true)
            if(receiptId) {
                updateReceipt({
                    id: receipt.id,
                    businessName: receipt.businessName,
                    businessAddress: `${receipt.businessAddress1},${receipt.businessCity},${receipt.businessState},${receipt.businessZipcode}`,
                    description: receipt.description,
                    date: receipt.date,
                    price: parseFloat(receipt.price),
                    receiptNumber: receipt.receiptNumber
                })
                .then(() => history.push(`/entries`))
            } else {
                addReceipt({
                    businessName: receipt.businessName,
                    businessAddress: `${receipt.businessAddress1},${receipt.businessCity},${receipt.businessState},${receipt.businessZipcode}`,
                    description: receipt.description,
                    date: receipt.date,
                    price: parseFloat(receipt.price),
                    receiptNumber: receipt.receiptNumber
                })
                .then(() => history.push("/entries"))
            }
        }
    }

    useEffect(() => {
        if (receiptId) {
            getReceiptById(receiptId)
            .then(receipt => {
                setReceipt(receipt)
                setIsLoading(false)
            })
            // const [ businessAddress1, businessCity, businessState, businessZipcode ] = receipt.businessAddress1.split(",")
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <form className="receiptForm">
          <h2 className="receiptForm__title">{receiptId ? <>Edit receipt</> : <>New receipt</>}</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="businessName">Business Name: </label>
              <input type="text" id="businessName" name="name" required autoFocus className="form-control"
              placeholder="Business Name" value={receipt.businessName}
              onChange={handleControlledInputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="businessAddress">Business Address: </label>
              <input type="text" id="businessAddress1" name="address" required autoFocus className="form-control"
              placeholder="Business Address"
              onChange={handleControlledInputChange}
              value={receipt.businessAddress1}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="businessCity">Business City: </label>
              <input type="text" id="businessCity" name="city" required autoFocus className="form-control"
              placeholder="Business City"
              onChange={handleControlledInputChange}
              value={receipt.businessCity}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="businessState">Business State Initials: </label>
              <input type="text" id="businessState" name="state" required autoFocus className="form-control"
              placeholder="Business State Initials"
              onChange={handleControlledInputChange}
              value={receipt.businessState}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="businessZipcode">Business Zipcode: </label>
              <input type="text" id="businessZipcode" name="zipcode" required autoFocus className="form-control"
              placeholder="Business Zipcode"
              onChange={handleControlledInputChange}
              value={receipt.businessZipcode}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="description">Description: </label>
              <input type="text" id="description" name="description" required autoFocus className="form-control"
              placeholder="Description"
              onChange={handleControlledInputChange}
              value={receipt.description}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="date">Date: </label>
              <input type="date" id="date" name="date" required autoFocus className="form-control"
              placeholder="Date"
              onChange={handleControlledInputChange}
              value={receipt.date}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="price">Price: </label>
              <input type="text" id="price" name="name" required autoFocus className="form-control"
              placeholder="Price: e.g(19.99)"
              onChange={handleControlledInputChange}
              value={receipt.price}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="receiptNumber">Receipt Number: </label>
              <input type="text" id="receiptNumber" name="receiptNumber" autoFocus className="form-control"
              placeholder="Enter Receipt Number or enter 'NA'"
              onChange={handleControlledInputChange}
              value={receipt.receiptNumber}/>
            </div>
          </fieldset>
          <button className="btn btn-primary"
            disabled={isLoading}
            onClick={event => {
              event.preventDefault() // Prevent browser from submitting the form and refreshing the page
              handleSaveReceipt()
            }}>
          {receiptId ? <>Update receipt</> : <>Add receipt</>}</button>
        </form>
      )
  
}