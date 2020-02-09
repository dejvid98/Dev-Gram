import React, { useState, createContext } from 'react'

export const AppContext = createContext()

export const ContextProvider = props => {


    const [isLoggedIn, setIsLoggedIn] = useState(false)


    return (
        <AppContext.Provider
            value={{
                isLoggedInContext: [isLoggedIn, setIsLoggedIn]
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}
