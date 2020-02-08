import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const NavBarButton = props => {
    return (
        <div>
            <Link
                to={props.link}
                style={{ textDecoration: 'none', marginRight: '2.5rem' }}
                className="hvr-underline-from-center"
            >
                <Button
                    color="primary"
                    style={{ fontSize: '1.5rem', color: '#08374E' }}
                    className="hvr-underline-from-center"
                >
                    {props.name}
                </Button>
            </Link>
        </div>
    )
}

export default NavBarButton
