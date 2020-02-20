import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props
    const [likesList, setLikesList] = useState([])

    const handleClose = () => {
        onClose(selectedValue)
    }

    useContext(() => {
        const likesCol = props.likesList
        setLikesList(likesCol)
        console.log(likesList)
    }, [])

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
        >
            <DialogTitle id="simple-dialog-title">
                Who Liked the post
            </DialogTitle>
            <List></List>
        </Dialog>
    )
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
}

export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = value => {
        setOpen(false)
    }

    return (
        <div>
            <br />
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Likes
            </Button>
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
    )
}
