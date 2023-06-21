import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

export default function TextFieldPassword({
   label = 'Contraseña',
   variant = 'standard',
   name = 'password',
   value,
   onChange = () => {}, 
   onKeyDown = () => {},
   id = 0,
  }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <TextField
        id={`input-password-textfield-${id}`}
        type={ showPassword ? 'text' : 'password' }
        label={label}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'><LockOutlined color='secondary' /></InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end' >
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setShowPassword(state => !state )}
                onMouseDown={(e) => e.preventDefault() }
                color='secondary'
              >
                { showPassword ? <VisibilityOff /> : <Visibility /> }
              </IconButton>
            </InputAdornment>
          )
        }}
        variant={variant}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder='********'
        color='secondary'
        focused
      />
    </>
  )
}
