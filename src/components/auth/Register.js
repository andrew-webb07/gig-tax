import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {

    const firstName = useRef();
	const lastName = useRef();
    const username = useRef();
	const password = useRef();
    const verifyPassword = useRef();
    const passwordDialog = useRef();
    const email = useRef()
    const address = useRef()
    const city = useRef()
    const state = useRef()
    const zipCode = useRef()
    
    const conflictDialog = useRef()
    const history = useHistory()

    // Check if email entered already matches a current user
    const existingUserCheck = () => {
        return fetch(`https://gig-tax-server.herokuapp.com/musicians?q=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    // Take user to login page when cancel button clicked
    const handleCancel = () => {
        history.push(`/login`)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists && password.current.value === verifyPassword.current.value) {
                    fetch("https://gig-tax-server.herokuapp.com/register", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({
                            username: username.current.value,
				            first_name: firstName.current.value,
				            last_name: lastName.current.value,
                            email: email.current.value,
                            password: password.current.value,
                            address: `${address.current.value}, ${city.current.value}, ${state.current.value}, ${zipCode.current.value}`
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            console.log(createdUser)
                                localStorage.setItem("gig-tax_user_token", createdUser.token);
                                localStorage.setItem("gig-tax_user", createdUser.id)
                                localStorage.setItem("gig-tax_user_address", createdUser.address)
                                history.push("/")
                        })
                }
                if (userExists) {
                    conflictDialog.current.showModal()
                }
                if (password.current.value !== verifyPassword.current.value) {
                    passwordDialog.current.showModal();
                }
            })
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <dialog className="dialog dialog--auth" ref={passwordDialog}>
				<div>Passwords do not match</div>
				<button className="button--close" onClick={(e) => passwordDialog.current.close()}>Close</button>
			</dialog>

            <form className="form--register" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Gig Tax</h1>
                <fieldset>
                    <label htmlFor="inputEmail"> First Name </label>
					<input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" requiredautoFocus />
				</fieldset>
				<fieldset>
                    <label htmlFor="inputEmail"> LastName </label>
					<input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
				</fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Username </label>
					<input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
				</fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Password </label>
					<input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
				</fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Verify Password </label>
					<input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
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

