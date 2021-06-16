import React, { useContext } from "react"
import { GigContext } from "./gig/GigProvider"
import { ReceiptContext } from "./receipt/ReceiptProvider"
import { TourContext } from "./tour/TourProvider"


export const Search = () => {
  const { setGigSearchTerms } = useContext(GigContext)
  const { setTourSearchTerms } = useContext(TourContext)
  const { setReceiptSearchTerms } = useContext(ReceiptContext)

  return (
    <>
      Search:
      <input type="text"
        className="btn input--wide"
        onKeyUp={(event) => {
            setGigSearchTerms(event.target.value)
            setTourSearchTerms(event.target.value)
            setReceiptSearchTerms(event.target.value)
        }}
        placeholder="Search... " />
    </>
  )
}