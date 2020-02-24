import React from 'react'
import firebaseImg from '../../../Assets/Ads/firebase.png'
import mongoImg from '../../../Assets/Ads/mongodb.jpg'
import firefoxImg from '../../../Assets/Ads/firefox.png'
import './Side.scss'

const SideContainer = props => {
    return (
        <div id={props.conditionalClass}>
            <div className="side-bar-wrapper">
                <h1>Advertisement</h1>

                <div className="advert">
                    <div className="ad-image">
                        <img src={firebaseImg} alt="ad" />
                    </div>
                    <div>
                        <p>
                            Are you tired of writing backend code? Build apps
                            fast, without managing infrastructure. Try Firebase
                            now!
                        </p>
                        <hr />
                    </div>
                </div>

                <div className="advert">
                    <div className="ad-image">
                        <img src={mongoImg} alt="ad" />
                    </div>
                    <div>
                        <p>
                            Sick of writing structured predefined schemas? Have
                            a taste of best dynamic NoSQL database in the world!
                        </p>
                        <hr />
                    </div>
                </div>

                <div className="advert">
                    <div className="ad-image">
                        <img src={firefoxImg} alt="ad" />
                    </div>
                    <div>
                        <p>
                            Do you value your privacy? Because we do! Stop
                            having your data sold by big companies and install
                            firefox today!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideContainer
