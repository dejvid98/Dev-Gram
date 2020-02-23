import React from 'react'
import StatusMain from './StatusFeeds/StatusMain'

const MainContainer = props => {
    return (
        <div id={props.conditionalClass}>
            <StatusMain />
        </div>
    )
}

export default MainContainer
