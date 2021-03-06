import React, { useContext, useState } from "react"
import { GigContext } from "../gig/GigProvider";
import { ReceiptContext } from "../receipt/ReceiptProvider"
import { TourContext } from "../tour/TourProvider"

export const YearDropDownEntries = () => {
    const { setGigYearEntries } = useContext(GigContext)
    const { setReceiptYearEntries } = useContext(ReceiptContext)
    const { setTourYearEntries } = useContext(TourContext)

    const [yearChosen, setYearChosen ] = useState("")


    return (
        <div class="yearDropDown">
        Entries Since <select id="yearSelection" value={yearChosen}
        onChange={(event) => {
            setYearChosen(event.target.value)
            setGigYearEntries(event.target.value)
            setReceiptYearEntries(event.target.value)
            setTourYearEntries(event.target.value)
        }}
        >
          <option key="year" value="year">Year</option>
          <option key="2022" value="2022">2022</option>
          <option key="2021" value="2021">2021</option>
          <option key="2020" value="2020">2020</option>
          <option key="2019" value="2019">2019</option>
          <option key="2018" value="2018">2018</option>
          </select>
      </div>
    )
}