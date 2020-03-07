import React, { useContext } from 'react'
import StatusMain from './StatusFeeds/StatusMain'
import MessagesMain from './Messages/MessagesMain'
import PhotosMain from './Photos/PhotosMain'
import { AppContext } from '../../../Context'

const MainContainer = props => {
   const { interFaceNavigationContext } = useContext(AppContext)
   const [
      interfaceNavigation,
      //eslint-disable-next-line
      setInterfaceNavigation,
   ] = interFaceNavigationContext

   const conditionalRender = () => {
      switch (interfaceNavigation) {
         case 'newsFeed':
            return <StatusMain />

         case 'messages':
            return <MessagesMain />

         case 'photos':
            return <PhotosMain />
         default:
            return null
      }
   }
   return <div id={props.conditionalClass}>{conditionalRender()}</div>
}

export default MainContainer
