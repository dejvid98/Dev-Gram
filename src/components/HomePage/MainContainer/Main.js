import React from 'react'
import StatusPoster from './StatusFeeds/StatusPoster'
import StatusList from './StatusFeeds/StatusList'

const MainContainer = () => {
    return (
        <div id="main-container">
            {/* <NewsFeed /> */}
            <div className="articles-wrapper">
                <div className="articles">
                    <StatusPoster />
                </div>
                <StatusList />
            </div>
        </div>
    )
}

export default MainContainer
