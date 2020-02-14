import React from 'react'
import { Button } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'



const UploadFileButton = (props) => {
    return (
        <div onChange={props.onClick}>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
            />
            <label htmlFor="raised-button-file">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    component="span"
                    style={{
                        width: '15rem',
                        marginLeft: '2rem',
                        marginTop: '2rem',
                        borderRadius: '2rem',
                        position:"relative",
                        right:"1rem"
                    }}
                >
                    Upload avatar
                </Button>
            </label>
        </div>
    )
}

export default UploadFileButton




