import React from 'react'
import StatusPoster from './StatusPoster'
import StatusList from './StatusList'

const StatusMain = () => {
    return (
        <div className="articles-wrapper">
            <div className="articles">
                <StatusPoster />
            </div>
            <StatusList />
        </div>
    )
}

export default StatusMain
