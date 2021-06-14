import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { GigContext } from "./GigProvider"
import "./Gig.css"

export const GigForm = () => {
    const { addGig, getGigById, updateGig } = useContext(GigContext)

    const [ gig, setGig ] = useState({
                    artist: "",
                    locationName: "",
                    address1: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    gigDescription: "",
                    date: "",
                    gigPay: "",
                    mileage: ""
    })

    const [isLoading, setIsLoading] = useState(true);
    const {gigId} = useParams();
	const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newGig = { ...gig }
        newGig[event.target.id] = event.target.value
        setGig(newGig)
      }

    const handleSaveGig = () => {
        if (gig.artist === "" || gig.locationName === "" || gig.address1 === "" || gig.city === "" || gig.state === "" || gig.zipCode === "" || gig.gigDescription === "" || gig.date === "" || gig.gigPay === "" || gig.mileage === "") {
            window.alert("Please fill out the form completely")
        } else {
            setIsLoading(true)
            if(gigId) {
                updateGig({
                    id: gig.id,
                    artist: gig.artist,
                    locationName: gig.locationName,
                    locationAddress: `${gig.address1}, ${gig.city}, ${gig.state}, ${gig.zipCode}`,
                    gigDescription: gig.gigDescription,
                    date: gig.date,
                    gigPay: parseFloat(gig.gigPay),
                    mileage: parseInt(Math.round(gig.mileage))
                })
                .then(() => history.push(`/entries`))
            } else {
                addGig({
                    artist: gig.artist,
                    locationName: gig.locationName,
                    locationAddress: `${gig.address1}, ${gig.city}, ${gig.state}, ${gig.zipCode}`,
                    gigDescription: gig.gigDescription,
                    date: gig.date,
                    gigPay: parseFloat(gig.gigPay),
                    mileage: parseInt(Math.round(gig.mileage))
                })
                .then(() => history.push("/entries"))
            }
        }
    }

    useEffect(() => {
        if (gigId) {
            getGigById(gigId)
            .then(gig => {
                setGig(gig)
                setIsLoading(false)
            })
            // const [ address1, city, state, zipCode ] = Gig.address1.split(",")
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <form className="gigForm">
          <h2 className="gigForm__title">{gigId ? <>Edit Gig</> : <>New Gig</>}</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="artist">Artist: </label>
              <input type="text" id="artist" name="artist" required autoFocus className="form-control"
              placeholder="Artist Name" value={gig.artist}
              onChange={handleControlledInputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="locationName">Location Name: </label>
              <input type="text" id="locationName" name="locationName" required autoFocus className="form-control"
              placeholder="Location Name"
              onChange={handleControlledInputChange}
              value={gig.locationName}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="locationAddress">Location Address: </label>
              <input type="text" id="address1" name="address" required autoFocus className="form-control"
              placeholder="Address"
              onChange={handleControlledInputChange}
              value={gig.address1}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="city">City: </label>
              <input type="text" id="city" name="city" required autoFocus className="form-control"
              placeholder="City"
              onChange={handleControlledInputChange}
              value={gig.city}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="state">State Initials: </label>
              <input type="text" id="state" name="sstate" required autoFocus className="form-control"
              placeholder="State Initials"
              onChange={handleControlledInputChange}
              value={gig.state}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="zipCode">ZipCode: </label>
              <input type="text" id="zipCode" name="zipCode" required autoFocus className="form-control"
              placeholder="ZipCode"
              onChange={handleControlledInputChange}
              value={gig.zipCode}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="gigDescription">Description: </label>
              <input type="text" id="gigDescription" name="gigDescription" required autoFocus className="form-control"
              placeholder="Description"
              onChange={handleControlledInputChange}
              value={gig.gigDescription}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="date">Date: </label>
              <input type="date" id="date" name="date" required autoFocus className="form-control"
              placeholder="Date"
              onChange={handleControlledInputChange}
              value={gig.date}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="gigPay">Pay Amount: </label>
              <input type="text" id="gigPay" name="name" required autoFocus className="form-control"
              placeholder="Pay Amount: e.g(19.99)"
              onChange={handleControlledInputChange}
              value={gig.gigPay}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="mileage">Miles Driven: </label>
              <input type="text" id="mileage" name="mileage" autoFocus className="form-control"
              placeholder="Miles Driven"
              onChange={handleControlledInputChange}
              value={gig.mileage}/>
            </div>
          </fieldset>
          <button className="btn btn-primary"
            disabled={isLoading}
            onClick={event => {
              event.preventDefault() // Prevent browser from submitting the form and refreshing the page
              handleSaveGig()
            }}>
          {gigId ? <>Update Gig</> : <>Add Gig</>}</button>
        </form>
      )
  
}