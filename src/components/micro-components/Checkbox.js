import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default function CheckboxLabels() {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    })

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked })
    }

    return (
        <FormControlLabel
            style={{ marginTop: '25px' }}
            control={
                <Checkbox
                    checked={state.checkedB}
                    onChange={handleChange('checkedB')}
                    value="checkedB"
                    color="primary"
                />
            }
            label="I agree with the terms and conditions"
        />
    )
}
