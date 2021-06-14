import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { TourContext } from "./TourProvider"
import "./Tour.css"

export const TourForm = () => {
    const { addTour, getTourById, updateTour } = useContext(TourContext)

    const [ tour, setTour ] = useState({
                    artist: "",
                    address1: "",
                    city: "",
                    state: "",
                    zipCode: "",
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

    const handleControlledInputChange = (event) => {
        const newTour = { ...tour }
        newTour[event.target.id] = event.target.value
        setTour(newTour)
      }

    const handleSavetour = () => {
        if (tour.artist === "" || tour.address1 === "" || tour.city === "" || tour.state === "" || tour.zipCode === "" || tour.tourDescription === "" || tour.numberOfGigs === "" || tour.perDiem === "" || tour.travelDays === "" || tour.travelDayPay === "" || tour.dateStart === "" || tour.dateEnd === "" || tour.tourGigPay === "" || tour.mileage === "") {
            window.alert("Please fill out the form completely")
        } else {
            setIsLoading(true)
            if(tourId) {
                updateTour({
                  id: tour.id,
                  userId: currentGigTaxUserId,
                  artist: tour.artist,
                  tourDepartureAddress: `${tour.address1}, ${tour.city}, ${tour.state}, ${tour.zipCode}`,
                  tourDescription: tour.tourDescription,
                  numberOfGigs: parseInt(tour.numberOfGigs),
                  perDiem: parseFloat(tour.perDiem),
                  travelDays: parseInt(tour.travelDays),
                  travelDayPay: parseFloat(tour.travelDayPay),
                  dateStart: tour.dateStart,
                  dateEnd: tour.dateEnd,
                  tourGigPay: parseFloat(tour.tourGigPay),
                  mileage: parseInt(Math.round(tour.mileage))
                })
                .then(() => history.push(`/entries`))
            } else {
                addTour({
                  userId: currentGigTaxUserId,
                  artist: tour.artist,
                  tourDepartureAddress: `${tour.address1}, ${tour.city}, ${tour.state}, ${tour.zipCode}`,
                  tourDescription: tour.tourDescription,
                  numberOfGigs: parseInt(tour.numberOfGigs),
                  perDiem: parseFloat(tour.perDiem),
                  travelDays: parseInt(tour.travelDays),
                  travelDayPay: parseFloat(tour.travelDayPay),
                  dateStart: tour.dateStart,
                  dateEnd: tour.dateEnd,
                  tourGigPay: parseFloat(tour.tourGigPay),
                  mileage: parseInt(Math.round(tour.mileage))
                })
                .then(() => history.push("/entries"))
            }
        }
    }

    useEffect(() => {
        if (tourId) {
            getTourById(tourId)
            .then(tour => {
              const [ address1, city, state, zipCode ] = tour.tourDepartureAddress.split(", ")
                tour.address1 = address1
                tour.city = city
                tour.state = state
                tour.zipCode = zipCode
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
              <label htmlFor="zipCode">ZipCode: </label>
              <input type="text" id="zipCode" name="zipCode" required autoFocus className="form-control"
              placeholder="ZipCode"
              onChange={handleControlledInputChange}
              value={tour.zipCode}/>
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
          <fieldset>
            <div className="form-group">
              <label htmlFor="travelDays">Number Of Travel Days: </label>
              <input type="text" id="travelDays" name="travelDays" required autoFocus className="form-control"
              placeholder="Number of Travel Days (non-show days and numbers only)"
              onChange={handleControlledInputChange}
              value={tour.travelDays}/>
            </div>
          </fieldset>
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
              <label htmlFor="dateStart">Start Date: </label>
              <input type="date" id="dateStart" name="dateStart" required autoFocus className="form-control"
              placeholder="Start Date"
              onChange={handleControlledInputChange}
              value={tour.dateStart}/>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="dateEnd">Start End: </label>
              <input type="date" id="dateEnd" name="dateEnd" required autoFocus className="form-control"
              placeholder="End Date"
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
          <fieldset>
            <div className="form-group">
              <label htmlFor="mileage">Miles Driven to Departure Address: </label>
              <input type="text" id="mileage" name="mileage" autoFocus className="form-control"
              placeholder="Miles Driven"
              onChange={handleControlledInputChange}
              value={tour.mileage}/>
            </div>
          </fieldset>
          <button className="btn btn-primary"
            disabled={isLoading}
            onClick={event => {
              event.preventDefault() // Prevent browser from submitting the form and refreshing the page
              handleSavetour()
            }}>
          {tourId ? <>Update tour</> : <>Add tour</>}</button>
        </form>
      )
}