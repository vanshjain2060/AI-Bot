import React from 'react'
import { TextField } from '@mui/material'
type Props = {
    name: string;
    type: string;
    label: string;
}
const CustomizedInput = (props: Props) => {
  return (
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        inputProps={{ style: { color: "white" } }}
        name={props.name}
        type={props.type}
        label={props.label}
      />
  )
}

export default CustomizedInput
;