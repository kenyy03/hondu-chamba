import { InputAdornment, TextField } from '@mui/material';
import propTypes from 'prop-types';
import React from 'react';

export default function TextFieldIcons({
  id = 0,
  value = '',
  onChange = () => {},
  name = '',
  label = '',
  type = 'text',
  onRenderIcon = () => {},
  placeholder = '',
  color = 'primary',
  focused = false,
}) {
  return (
    <>
      <TextField
        id={`input-with-icon-textfield-${id}`}
        type={type}
        label={label}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>{onRenderIcon()}</InputAdornment>
          ),
        }}
        variant='standard'
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        focused={focused}
        color={color}
      />
    </>
  );
}

TextFieldIcons.defaultProps = {
  value: '',
  onChange: () => {},
  name: '',
  label: '',
  type: 'text',
  onRenderIcon: () => {},
  placeholder: '',
  color: 'primary',
  focused: false,
  id: 0,
};

TextFieldIcons.propTypes = {
  id: propTypes.number.isRequired,
  value: propTypes.string,
  onChange: propTypes.func,
  name: propTypes.string,
  label: propTypes.string,
  type: propTypes.string,
  onRenderIcon: propTypes.func,
  placeholder: propTypes.string,
  color: propTypes.string,
  focused: propTypes.bool,
};


