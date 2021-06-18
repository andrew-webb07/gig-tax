// import React, { useState  } from "react"
// import Geocode from "react-geocode"

// Geocode.setApiKey("AIzaSyDdEOJ_nzrdi2YUZGlALuRepjoRTTyeOrA")
// Geocode.setLanguage("en");

// Geocode.fromAddress(startAddress)
//     .then(
//         (response) => {
//           const { lat, lng } = response.results[0].geometry.location;
//           console.log(lat, lng);
//         });

// Get latitude & longitude from address.

// export const GetDistance = (startAddress, endAddress) => {

//     const [ startAddressLat, setStartAddressLat ] = useState()
//     const [ startAddressLng, setStartAddressLng ] = useState()
//     const [ endAddressLat, setEndAddressLat ] = useState()
//     const [ endAddressLng, setEndAddressLng ] = useState()

//     const googleAPIKey = "AIzaSyDdEOJ_nzrdi2YUZGlALuRepjoRTTyeOrA"
//     const formattedStartAddress = startAddress.replace(", ", "+")
//     const formattedEndAddress = endAddress.replace(", ", "+")

//     getStartAddressLatLng = () => {
//         return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedStartAddress}&key=AIzaSyDdEOJ_nzrdi2YUZGlALuRepjoRTTyeOrA`)
//         .then(res => res.json())
//         .then((data) => {
//             console.log(data)
//             setStartAddressLat(data.results[0].geometry.location.lat)
//             setStartAddressLng(data.results[0].geometry.location.lng)
//         })
//     }

//     getEndAddressLatLng = () => {
//         return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedEndAddress}&key=${googleAPIKey}`)
//         .then(res => res.json())
//         .then((data) => {
//             setEndAddressLat(data.results[0].geometry.location.lat)
//             setEndAddressLng(data.results[0].geometry.location.lng)
//         })
//     }

//         if ((startAddressLat == endAddressLat) && (startAddressLng == endAddressLng)) {
//             return 0;
//         }
//         else {
//             var radStartAddressLat = Math.PI * startAddressLat/180;
//             var radEndAddressLat = Math.PI * endAddressLat/180;
//             var theta = startAddressLng-endAddressLng;
//             var radtheta = Math.PI * theta/180;
//             var dist = Math.sin(radStartAddressLat) * Math.sin(radEndAddressLat) + Math.cos(radStartAddressLat) * Math.cos(radEndAddressLat) * Math.cos(radtheta);
//             if (dist > 1) {
//                 dist = 1;
//             }
//             dist = Math.acos(dist);
//             dist = dist * 180/Math.PI;
//             dist = dist * 60 * 1.1515;
//             return dist;
//         }
//         debugger
// }

// console.log(GetDistance("2134 Loudenslager Dr., Thompsons Station, TN, 37179", "28488 Wildwood Trail, Farmington Hills, MI, 48336"))


// GetDistance("2134 Loudenslager Dr., Thompsons Station, TN, 37179")

//   const [address, setAddress] = useState([])
//   const getGeocode = () => {
//     const location = "22 Main St. Boston MA"
//     return fetch("https://maps.googleapis.com/maps/api/geocode/json", {
//         params: {
//             address: location,
//             key : "AIzaSyDdEOJ_nzrdi2YUZGlALuRepjoRTTyeOrA"
//         }
//     })
//     .then(res => res.json())
//     .then(setAddress)
//   }

// var geocoder = new google.maps.Geocoder();
// var address = "new york";

// geocoder.geocode({'address': address}, function(results, status) {

//   if (status == google.maps.GeocoderStatus.OK) {
//     var latitude = results[0].geometry.location.lat();
//     var longitude = results[0].geometry.location.lng();
//     alert(latitude, longitude);
//   } 
// }); 

// searchLatAndLngByStreet = (street) => {
//     const geocoder = new google.maps.Geocoder();
//     geocoder.geocode({ 'address': street }, (res, status) => {
//       console.log(res, status)
//       if (status == google.maps.GeocoderStatus.OK) {
//         return {
//           latitude: JSON.stringify(res[0].geometry.location.lat()),
//           longitude: JSON.stringify(res[0].geometry.location.lng())
//         }
//       } 
//     });
// }

// console.log(searchLatAndLngByStreet("2134 Loudenslager Dr."))