import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { TourContext } from "./TourProvider"
import { DistanceContext } from "../distance/DistanceProvider";
import "./Tour.css"

export const TourForm = () => {
    const { addTour, getTourById, updateTour } = useContext(TourContext)
    const { getStartAddressLatLng, getEndAddressLatLng, startAddressLat, startAddressLng } = useContext(DistanceContext)

    const [ tour, setTour ] = useState({
                    artist: "",
                    address1: "",
                    city: "",
                    state: "",
                    zipcode: "",
                    tourDescription: "",
                    numberOfGigs: "",
                    perDiem: "",
                    travelDays: "",
                    travelDayPay: "",
                    dateStart: "",
                    dateEnd: "",
                    tourGigPay: "",
                    mileage: ""
    })

    const [isLoading, setIsLoading] = useState(true);
    const {tourId} = useParams();
	  const history = useHistory();
    const currentGigTaxUserId = parseInt(localStorage.getItem("gig-tax_user"))

    useEffect(() => {
      getStartAddressLatLng()
    }, [])

    const handleControlledInputChange = (event) => {
        const newTour = { ...tour }
        newTour[event.target.id] = event.target.value
        setTour(newTour)
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

    const calculateTravelDays = (date1, date2, totalGigs) => {
      // Calculate the time difference of two dates
      const differenceInTime = new Date(date2).getTime() - new Date(date1).getTime()
      // Divide the time difference of both the dates by no. of milliseconds in a day
      const differenceInDays = differenceInTime / (1000 * 3600 * 24)
      return differenceInDays - totalGigs
    }

    const handleSavetour = () => {
        if (tour.artist === "" || tour.address1 === "" || tour.city === "" || tour.state === "" || tour.zipcode === "" || tour.tourDescription === "" || tour.numberOfGigs === "" || tour.perDiem === "" || tour.travelDayPay === "" || tour.dateStart === "" || tour.dateEnd === "" || tour.tourGigPay === "") {
            window.alert("Please fill out the form completely")
        } else if (Number.isInteger(parseInt(tour.tourGigPay)) === false || Number.isInteger(parseInt(tour.zipcode)) === false || Number.isInteger(parseInt(tour.numberOfGigs)) === false || Number.isInteger(parseInt(tour.perDiem)) === false || Number.isInteger(parseInt(tour.travelDayPay)) === false) {
          window.alert("Please enter a number only")
      } else {
            setIsLoading(true)
            if(tourId) {
              getEndAddressLatLng(`${tour.address1}, ${tour.city}, ${tour.state}, ${tour.zipcode}`)
                .then((res) => {
                  const tourDistance = getDistance(res.results[0].geometry.location.lat, res.results[0].geometry.location.lng)   
                updateTour({
                  id: tour.id,
                  userId: currentGigTaxUserId,
                  artist: tour.artist,
                  tourDepartureAddress: `${tour.address1}, ${tour.city}, ${tour.state}, ${tour.zipcode}`,
                  tourDescription: tour.tourDescription,
                  numberOfGigs: parseInt(tour.numberOfGigs),
                  perDiem: parseFloat(tour.perDiem),
                  travelDays: parseInt(calculateTravelDays(tour.dateStart, tour.dateEnd, tour.numberOfGigs)),
                  travelDayPay: parseFloat(tour.travelDayPay),
                  dateStart: tour.dateStart,
                  dateEnd: tour.dateEnd,
                  tourGigPay: parseFloat(tour.tourGigPay),
                  mileage: parseInt(Math.round(tourDistance))
                })
                .then(() => history.push(`/entries`))
                })
            } else {
              getEndAddressLatLng(`${tour.address1}, ${tour.city}, ${tour.state}, ${tour.zipcode}`)
                .then((res) => {
                  const tourDistance = getDistance(res.results[0].geometry.location.lat, res.results[0].geometry.location.lng)
                addTour({
                  userId: currentGigTaxUserId,
                  artist: tour.artist,
                  tourDepartureAddress: `${tour.address1}, ${tour.city}, ${tour.state}, ${tour.zipcode}`,
                  tourDescription: tour.tourDescription,
                  numberOfGigs: parseInt(tour.numberOfGigs),
                  perDiem: parseFloat(tour.perDiem),
                  travelDays: parseInt(calculateTravelDays(tour.dateStart, tour.dateEnd, tour.numberOfGigs)),
                  travelDayPay: parseFloat(tour.travelDayPay),
                  dateStart: tour.dateStart,
                  dateEnd: tour.dateEnd,
                  tourGigPay: parseFloat(tour.tourGigPay),
                  mileage: parseInt(Math.round(tourDistance))
                })
                .then(() => history.push("/entries"))
              })
            }
        }
    }

    useEffect(() => {
        if (tourId) {
            getTourById(tourId)
            .then(tour => {
              const [ address1, city, state, zipcode ] = tour.tourDepartureAddress.split(", ")
                tour.address1 = address1
                tour.city = city
                tour.state = state
                tour.zipcode = zipcode
                setTour(tour)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <form className="tourForm">
          <h2 className="tourForm__title">{tourId ? <>Edit Tour</> : <>New Tour</>}</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="artist">Artist: </label>
              <input type="text" id="artist" name="artist" required autoFocus className="form-control"
              placeholder="Artist Name" value={tour.artist}
              onChange={handleControlledInputChange}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="tourDepartureAddress">Tour Departure Address: </label>
              <input type="text" id="address1" name="address" required autoFocus className="form-control"
              placeholder="Tour Departure Address"
              onChange={handleControlledInputChange}
              value={tour.address1}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="city">City: </label>
              <input type="text" id="city" name="city" required autoFocus className="form-control"
              placeholder="City"
              onChange={handleControlledInputChange}
              value={tour.city}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="state">State Initials: </label>
              <input type="text" id="state" name="sstate" required autoFocus className="form-control"
              placeholder="State Initials"
              onChange={handleControlledInputChange}
              value={tour.state}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="zipcode">zipcode: </label>
              <input type="text" id="zipcode" name="zipcode" required autoFocus className="form-control"
              placeholder="zipcode"
              onChange={handleControlledInputChange}
              value={tour.zipcode}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="numberOfGigs">Number Of Gigs: </label>
              <input type="text" id="numberOfGigs" name="numberOfGigs" required autoFocus className="form-control"
              placeholder="Number of Gigs (numbers only)"
              onChange={handleControlledInputChange}
              value={tour.numberOfGigs}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="perDiem">Per Diem: </label>
              <input type="text" id="perDiem" name="perDiem" required autoFocus className="form-control"
              placeholder="Per Diem (e.g 25)"
              onChange={handleControlledInputChange}
              value={tour.perDiem}/>
            </div>
          </fieldset>
          {/* <fieldset>
            <div className="form-group">
              <label htmlFor="travelDays">Number Of Travel Days: </label>
              <input type="text" id="travelDays" name="travelDays" required autoFocus className="form-control"
              placeholder="Number of Travel Days (non-show days and numbers only)"
              onChange={handleControlledInputChange}
              value={tour.travelDays}/>
            </div>
          </fieldset> */}
          <fieldset>
            <div className="form-group">
              <label htmlFor="travelDayPay">Travel Day Pay: </label>
              <input type="text" id="travelDayPay" name="travelDayPay" required autoFocus className="form-control"
              placeholder="Travel Day Pay: e.g(50)"
              onChange={handleControlledInputChange}
              value={tour.travelDayPay}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="tourDescription">Tour Description: </label>
              <input type="text" id="tourDescription" name="tourDescription" required autoFocus className="form-control"
              placeholder="Tour Description"
              onChange={handleControlledInputChange}
              value={tour.tourDescription}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="dateStart">Tour Start Date: </label>
              <input type="date" id="dateStart" name="dateStart" required autoFocus className="form-control"
              placeholder="Start Date"
              onChange={handleControlledInputChange}
              value={tour.dateStart}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="dateEnd">Tour End Date: </label>
              <input type="date" id="dateEnd" name="dateEnd" required autoFocus className="form-control"
              placeholder="Tour End Date"
              onChange={handleControlledInputChange}
              value={tour.dateEnd}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="tourGigPay">Tour Gig Pay: </label>
              <input type="text" id="tourGigPay" name="tourGigPay" required autoFocus className="form-control"
              placeholder="Pay Amount: e.g(150)"
              onChange={handleControlledInputChange}
              value={tour.tourGigPay}/>
            </div>
          </fieldset>
          {/* <fieldset>
            <div className="form-group">
              <label htmlFor="mileage">Miles Driven to Departure Address: </label>
              <input type="text" id="mileage" name="mileage" autoFocus className="form-control"
              placeholder="Miles Driven"
              onChange={handleControlledInputChange}
              value={tour.mileage}/>
            </div>
          </fieldset> */}
          <div className="formButtonContainer">
            <button className="btn btn-primary"
              disabled={isLoading}
              onClick={event => {
                event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                handleSavetour()
              }}>
            {tourId ? <>Update tour</> : <>Add tour</>}</button>
          </div>
        </form>
      )
}