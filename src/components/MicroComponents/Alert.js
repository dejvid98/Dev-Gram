import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles(theme => ({
   root: {
      width: '60%',
      '& > * + *': {
         marginTop: theme.spacing(2),
      },
   },
}))

export default function SimpleAlerts(props) {
   const classes = useStyles()

   return (
      <div className={classes.root}>
         <Alert severity={props.severity} variant="filled">
            {props.message}
         </Alert>
      </div>
   )
}
