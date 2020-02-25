import React, { useState, createContext } from 'react'

export const AppContext = createContext()

export const ContextProvider = props => {
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [isMini, setIsMini] = useState(false)
   const [interfaceNavigation, setInterfaceNavigation] = useState('newsFeed')
   const [receiver, setReceiver] = useState('')

   return (
      <AppContext.Provider
         value={{
            isLoggedInContext: [isLoggedIn, setIsLoggedIn],
            isMiniContext: [isMini, setIsMini],
            interFaceNavigationContext: [
               interfaceNavigation,
               setInterfaceNavigation,
            ],
            setReceiverContext: [receiver, setReceiver],
         }}
      >
         {props.children}
      </AppContext.Provider>
   )
}
