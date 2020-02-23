import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

export default function SimpleSelect(props) {
    const classes = useStyles()
    const [order, setOrder] = React.useState('')
    //eslint-disable-next-line
    const inputLabel = React.useRef(null)
    //eslint-disable-next-line
    const [labelWidth, setLabelWidth] = React.useState(0)
    React.useEffect(() => {
        setLabelWidth(0)
    }, [])

    const handleChange = event => {
        setOrder(event.target.value)
        props.handleSort(event)
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={order}
                    onChange={handleChange}
                >
                    <MenuItem value={'desc'}>Newest</MenuItem>
                    <MenuItem value={'asc'}>Oldest</MenuItem>
                    <MenuItem value={'likes'}>Likes</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
