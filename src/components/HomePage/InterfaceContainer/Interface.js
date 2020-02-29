import React from 'react'
import UserProfile from './UserProfile'
import Navigation from './Navigation'

const Interface = props => {
   return (
      <div id={props.conditionalClass}>
         <UserProfile />
         <hr className="hr-interface" />
         <Navigation markedElement={props.markedElement} />
      </div>
   )
}

export default Interface
