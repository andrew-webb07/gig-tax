import React, { useContext, useEffect, useState } from "react"
import "./Gig.css"
import { GigContext } from "./GigProvider"
import { useParams, useHistory } from "react-router-dom"

export const GigList = () => {
    const { gigs, getGigs, deleteGig } = useContext(GigContext)

    const gigId = useParams()

    const history = useHistory()

    useEffect(() => {
        getGigs()
    }, [])

    return (
        <>
            <div className="gigs">
                <h2 className="gigs__header">Gigs</h2>
                {
                    gigs.map(gig => {
                        return (
                            <div className="gig" id={`gig--${gig.id}`}>
                                <div className="gig__item">Artist: {gig.artist}</div>
                                <div className="gig__item">Location: {gig.locationName}</div>
                                <div className="gig__item">Address: {gig.locationAddress}</div>
                                <div className="gig__item">Description: {gig.gigDescription}</div>
                                <div className="gig__item">Date: {gig.date}</div>
                                <div className="gig__item">Gig Pay: ${gig.gigPay}</div>
                                <div className="gig__item">Gig Mileage: {gig.mileage}</div>
                                <div className="gig__buttons">
                                    <button className="gig__button" onClick={() => {history.push(`/gig/edit/${gig.id}`)}}>Edit</button>
                                    <button className="gig__button" onClick={() => {history.push("/entries")
                                deleteGig(gig.id)}}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}