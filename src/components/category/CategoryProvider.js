import React, { useState, createContext } from "react"

export const CategoryContext = createContext()

export const CategoryProvider = (props) => {

    const [categories, setCategories] = useState([])

    const getCategories = () => {
        return fetch("https://gig-tax-server.herokuapp.com/categories", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`
        }
    })
        .then(res => res.json())
        .then(setCategories)
    }

    const getCategoryById = categoryId => {
        return fetch(`https://gig-tax-server.herokuapp.com/categories/${categoryId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("gig-tax_user_token")}`
            }
        })
        .then(res => res.json())
    }

    return (
        <CategoryContext.Provider value={{
            categories, getCategories, getCategoryById
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}