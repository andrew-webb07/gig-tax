import React, { useState, createContext } from "react"

export const DistanceContext = createContext()

export const DistanceProvider = (props) => {

    const googleAPIKey = "AIzaSyDdEOJ_nzrdi2YUZGlALuRepjoRTTyeOrA"
    const [ startAddressLat, setStartAddressLat ] = useState()
    const [ startAddressLng, setStartAddressLng ] = useState()
    
    // Function to get current user's address latitude and longitude pulling from the Geocoder API from Google

    const getStartAddressLatLng = () => {
        const currentGigUserAddress = localStorage.getItem("gig-tax_user_address")
        const formattedStartAddress = currentGigUserAddress.replace(", ", "+")
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedStartAddress}&key=${googleAPIKey}`)
        .then(res => res.json())
        .then((res) => {
            setStartAddressLat(res.results[0].geometry.location.lat)
            setStartAddressLng(res.results[0].geometry.location.lng)
          })
    }

    const getEndAddressLatLng = (endAddress) => {
        const formattedEndAddress = endAddress.replaceAll(" ", "+")
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedEndAddress}&key=${googleAPIKey}`)
        .then(res => res.json())
    }

    return (
        <DistanceContext.Provider value={{
            getStartAddressLatLng, getEndAddressLatLng, startAddressLat, startAddressLng
        }}>
            {props.children}
        </DistanceContext.Provider>
    )
}