import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const LoggedOutPhotos = () => {
   return (
      <div
         style={{
            marginTop: '4rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <p style={{ fontSize: '2rem', color: 'silver' }}>
            Please login to see your photos
         </p>
         <Link
            to="/login"
            style={{ textDecoration: 'none', width: '5rem', marginTop: '2rem' }}
         >
            <Button variant="contained" color="secondary">
               Login
            </Button>
         </Link>
      </div>
   )
}

export default LoggedOutPhotos
