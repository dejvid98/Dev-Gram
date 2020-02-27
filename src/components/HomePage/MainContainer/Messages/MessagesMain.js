import React, { useState } from 'react'
import Inbox from './Inbox'
import SendMessage from './SendMessage'

const MessagesMain = () => {
   const [layout, setLayout] = useState('inbox')
   
   const handleLayout = targetLayout => {
      setLayout(targetLayout)
   }

   return (
      <div>
         {layout === 'inbox' ? <Inbox handleLayout={handleLayout} /> : null}
         {layout === 'sendMessage' ? (
            <SendMessage handleLayout={handleLayout} />
         ) : null}
      </div>
   )
}

export default MessagesMain
