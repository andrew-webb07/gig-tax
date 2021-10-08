import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"


export const Login = props => {
    const email = useRef()
    const existDialog = useRef()
    const history = useHistory()

    // Checking to see if email entered matches an existing user; if there is a match, return the user
    const existingUserCheck = () => {
        return fetch(`https://gig-tax-api.herokuapp.com/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("gig-tax_user", exists.id)
                    localStorage.setItem("gig-tax_user_address", exists.address)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    // Reset form when cancel button is clicked
    const handleCancel = () => {
        email.current.value = ""
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Gig Tax</h1>
                    <h2>Please sign in</h2>
                    <fieldset className="login-email">
                        <label htmlFor="inputEmail"> Email address: </label>
                        <input ref={email} type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="login-buttons">
                        <button type="submit" className="btn">Sign in</button>
                        <button type="cancel" className="btn" onClick={() => handleCancel()}> Cancel </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register" className="link--register__text">Not a member yet?</Link>
            </section>
        </main>
    )
}
