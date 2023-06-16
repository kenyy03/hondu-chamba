import { TextField } from '@mui/material'
import React from 'react'

export default function MultilineTextField({
  id = 0,
  label = '',
  name = '',
  value = '',
  onChange = () => {},
  placeholder = '',
  fullWidth = false,
  helperText = '',
}) {
  return (
    <>
      <TextField
          id={`multiline-textfield-${id}`}
          label={label}
          variant='outlined'
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          focused={true}
          color='secondary'
          fullWidth={fullWidth}
          size='small'
          multiline
          rows={5}
          helperText={helperText}
        />
    </>
  )
}
