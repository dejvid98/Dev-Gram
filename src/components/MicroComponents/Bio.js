import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 500,
        },
    },
}))

export default function MultilineTextFields(props) {
    const classes = useStyles()


    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                id="outlined-multiline-static"
                label="Bio"
                multiline
                rows="6"
                defaultValue="Tell us about yourself"
                variant="outlined"
                value={props.value}
                onChange={props.handleBioChange}
            />
        </form>
    )
}
