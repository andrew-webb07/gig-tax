import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Gig Tax</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/gig/create">Gig</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/tour/create">Tour</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/receipt/create">Receipt</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/entries">Entries</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/totals">Tax Totals</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" 
                    onClick={
                        (event) => {
                            localStorage.removeItem("gig-tax_user")
                        }
                    }
                >Logout</Link>
            </li>
        </ul>
    )
}