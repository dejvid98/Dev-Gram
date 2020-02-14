import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}))

export default function CustomizedSnackbars(props) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const handleClick = () => {
        setOpen(true)
        props.onClick()
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                style={{
                    width: '12rem',
                    marginLeft: '0rem',
                    marginTop: '2rem',
                    position:'relative',
                    bottom:'0.5rem',
                    borderRadius: '2rem',
                }}
                onClick={handleClick}
            >
                Save Changes
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Changes successfully saved!
                </Alert>
            </Snackbar>
        </div>
    )
}
