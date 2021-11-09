import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"


export const Login = props => {
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const existDialog = useRef()
    const history = useHistory()

    // Checking to see if email entered matches an existing user; if there is a match, return the user
    // const existingUserCheck = () => {
    //     return fetch(`https://gig-tax-server.herokuapp.com/musicians?q=${email.current.value}`)
    //         .then(res => res.json())
    //         .then(user => user.length ? user[0] : false)
    // }

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("https://gig-tax-server.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid) {
                    localStorage.setItem("gig-tax_user_token", res.token )
                    history.push("/")
                }
                else {
                    existDialog.current.showModal()
                }
            })
    }

    // const handleLogin = (e) => {
    //     e.preventDefault()
    //     existingUserCheck()
    //         .then(exists => {
    //             if (exists) {
    //                 localStorage.setItem("gig-tax_user", exists.id)
    //                 localStorage.setItem("gig-tax_user_address", exists.address)
    //                 history.push("/")
    //             } else {
    //                 existDialog.current.showModal()
    //             }
    //         })
    // }

    // Reset form when cancel button is clicked
    const handleCancel = () => {
        username.current.value = ""
        password.current.value = ""
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Gig Tax</h1>
                    <h2>Please sign in</h2>
                    <fieldset className="login-email">
                        <input ref={username} type="text" id="username" className="form-control" placeholder="Username" required autoFocus />
                    </fieldset>
                    <fieldset className="login-email">
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
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
