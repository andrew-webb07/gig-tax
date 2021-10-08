import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { GigContext } from "./GigProvider"
import "./Gig.css"
import { DistanceContext } from "../distance/DistanceProvider";

export const GigForm = () => {
    const { addGig, getGigById, updateGig } = useContext(GigContext)
    const { getStartAddressLatLng, getEndAddressLatLng, startAddressLat, startAddressLng } = useContext(DistanceContext)

    const [ gig, setGig ] = useState({
                    artist: "",
                    locationName: "",
                    address1: "",
                    city: "",
                    state: "",
                    zipcode: "",
                    gigDescription: "",
                    date: "",
                    gigPay: "",
                    mileage: ""
    })

    const [isLoading, setIsLoading] = useState(true);
    const {gigId} = useParams();
	  const history = useHistory();
    const currentGigTaxUserId = parseInt(localStorage.getItem("gig-tax_user"))

    useEffect(() => {
      getStartAddressLatLng()
    }, [])

    const handleControlledInputChange = (event) => {
        const newGig = { ...gig }
        newGig[event.target.id] = event.target.value
        setGig(newGig)
    }

      // Calculating the distance in miles between the user's address and the gig's address by using each address's latitude and longitude
      const getDistance = (endAddressLat, endAddressLng) => {
        if ((startAddressLat == endAddressLat) && (startAddressLng == endAddressLng)) {
          return 0;
      }
      else {
          const radStartAddressLat = Math.PI * startAddressLat/180;
          const radEndAddressLat = Math.PI * endAddressLat/180;
          const theta = startAddressLng-endAddressLng;
          const radtheta = Math.PI * theta/180;
          let dist = Math.sin(radStartAddressLat) * Math.sin(radEndAddressLat) + Math.cos(radStartAddressLat) * Math.cos(radEndAddressLat) * Math.cos(radtheta);
          if (dist > 1) {
              dist = 1;
          }
          dist = Math.acos(dist);
          dist = dist * 180/Math.PI;
          
          // get the distance and multiply by 2 to account for drive to destination and back
          dist = dist * 60 * 1.1515 * 2;
          return dist;
      }
      }

    const handleSaveGig = () => {
        if (gig.artist === "" || gig.locationName === "" || gig.address1 === "" || gig.city === "" || gig.state === "" || gig.zipcode === "" || gig.gigDescription === "" || gig.date === "" || gig.gigPay === "") {
            window.alert("Please fill out the form completely")
        } else if (Number.isInteger(parseInt(gig.gigPay)) === false || Number.isInteger(parseInt(gig.zipcode)) === false) {
            window.alert("Please enter a number only")
        } else {
            setIsLoading(true)
            if(gigId) {
                getEndAddressLatLng(`${gig.address1}, ${gig.city}, ${gig.state}, ${gig.zipcode}`)
                .then((res) => {
                  const gigDistance = getDistance(res.results[0].geometry.location.lat, res.results[0].geometry.location.lng)              
                updateGig({
                    id: gig.id,
                    userId: currentGigTaxUserId,
                    artist: gig.artist,
                    locationName: gig.locationName,
                    locationAddress: `${gig.address1}, ${gig.city}, ${gig.state}, ${gig.zipcode}`,
                    gigDescription: gig.gigDescription,
                    date: gig.date,
                    gigPay: parseFloat(gig.gigPay),
                    mileage: parseInt(Math.round(gigDistance))
                })
                .then(() => history.push(`/entries`))
            })
            } else {
              getEndAddressLatLng(`${gig.address1}, ${gig.city}, ${gig.state}, ${gig.zipcode}`)
                .then((res) => {
                  const gigDistance = getDistance(res.results[0].geometry.location.lat, res.results[0].geometry.location.lng)
                addGig({
                    userId: currentGigTaxUserId,
                    artist: gig.artist,
                    locationName: gig.locationName,
                    locationAddress: `${gig.address1}, ${gig.city}, ${gig.state}, ${gig.zipcode}`,
                    gigDescription: gig.gigDescription,
                    date: gig.date,
                    gigPay: parseFloat(gig.gigPay),
                    mileage: parseInt(Math.round(gigDistance))
                })
                .then(() => history.push("/entries"))
              })
            }
        }
      }

    useEffect(() => {
        if (gigId) {
            getGigById(gigId)
            .then(gig => {
                const [ address1, city, state, zipcode ] = gig.locationAddress.split(", ")
                gig.address1 = address1
                gig.city = city
                gig.state = state
                gig.zipcode = zipcode
                setGig(gig)
                setIsLoading(false)
            })
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
              placeholder="Location Address"
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
              <input type="text" id="state" name="state" required autoFocus className="form-control"
              placeholder="State Initials"
              onChange={handleControlledInputChange}
              value={gig.state}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="zipcode">Zipcode: </label>
              <input type="text" id="zipcode" name="zipcode" required autoFocus className="form-control"
              placeholder="Zipcode"
              onChange={handleControlledInputChange}
              value={gig.zipcode}/>
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
          <div className="formButtonContainer">
            <button className="btn btn-primary"
              disabled={isLoading}
              onClick={event => {
                event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                handleSaveGig()
              }}>
            {gigId ? <>Update Gig</> : <>Add Gig</>}</button>
          </div>
        </form>
      )
}