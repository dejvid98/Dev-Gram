import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const NavBarButton = props => {
    return (
        <div stlye={{ height: '1rem' }} onClick={props.logOut}>
            <Link
                to={props.link}
                style={{
                    textDecoration: 'none',
                    marginRight: '0rem',
                }}
                className="hvr-underline-from-center"
            >
                <Button
                    color="primary"
                    style={{
                        fontSize: '1.5rem',
                        color: '#08374E',
                        width: '12rem',
                    }}
                    className="hvr-underline-from-center"
                >
                    {props.name}
                </Button>
            </Link>
        </div>
    )
}

export default NavBarButton
