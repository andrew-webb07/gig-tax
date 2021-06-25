import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {

    const email = useRef()
    const address = useRef()
    const city = useRef()
    const state = useRef()
    const zipCode = useRef()
    
    const conflictDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://gig-tax-api.herokuapp.com/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleCancel = () => {
        history.push(`/login`)
    }

    const handleRegister = (e) => {
        e.preventDefault()


        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("https://gig-tax-api.herokuapp.com/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            address: `${address.current.value}, ${city.current.value}, ${state.current.value}, ${zipCode.current.value}`
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("gig-tax_user", createdUser.id)
                                localStorage.setItem("gig-tax_user_address", createdUser.address)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--register" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Gig Tax</h1>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Address </label>
                    <input ref={address} type="address" name="address" className="form-control" placeholder="Address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="city"> City </label>
                    <input ref={city} type="city" name="city" className="form-control" placeholder="City"  required />
                </fieldset>
                <fieldset>
                    <label htmlFor="state"> State </label>
                    <input ref={state} type="state" name="state" className="form-control" placeholder="State"  required />
                </fieldset>
                <fieldset>
                    <label htmlFor="zipCode"> Zip Code </label>
                    <input ref={zipCode} type="zipCode" name="zipCode" className="form-control" placeholder="Zip Code"  required />
                </fieldset>
                <fieldset className="login-buttons">
                    <button type="submit" className="btn"> Sign in </button>
                    <button type="cancel" className="btn"
                    onClick={() => {handleCancel()}}> Cancel </button>
                </fieldset>
            </form>
        </main>
    )
}

