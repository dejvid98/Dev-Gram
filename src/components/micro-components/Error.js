import React from 'react'
import Alert from '@material-ui/lab/Alert'


export default function SimpleAlerts(props) {
    return (
        <div className="error-div">
            <Alert
                variant="filled"
                severity="error"
                style={{ borderRadius: '15px' }}
            >
                {props.errorText}
            </Alert>
        </div>
    )
}
