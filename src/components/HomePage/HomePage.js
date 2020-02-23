import React, { useContext } from 'react'
import Navbar from '../Layout/Navbar'
import MainContainer from './MainContainer/Main'
import Interface from './InterfaceContainer/Interface'
import SideContainer from './SideContainer/Side'
import './HomePage.scss'
import { AppContext } from '../../Context'

const HomePage = props => {
    const { isMiniContext } = useContext(AppContext)
    //eslint-disable-next-line
    const [isMini, setIsMini] = isMiniContext

    return (
        <div>
            <Navbar />
            <div className="container-wrapper">
                {isMini ? (
                    <>
                        <Interface
                            conditionalClass="interface-container-mini"
                            markedElement={props.markedElement}
                        />
                        <MainContainer conditionalClass="main-container-mini" />
                        <SideContainer conditionalClass="side-container-mini" />
                    </>
                ) : (
                    <>
                        <Interface
                            conditionalClass="interface-container"
                            markedElement={props.markedElement}
                        />
                        <MainContainer conditionalClass="main-container" />
                        <SideContainer conditionalClass="side-container" />
                    </>
                )}
            </div>
        </div>
    )
}

export default HomePage
