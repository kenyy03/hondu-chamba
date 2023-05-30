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
  variant = 'standard',
  fullWidth = false,
  size = '',
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
        variant={variant}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        focused={focused}
        color={color}
        fullWidth={fullWidth}
        size={size}
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
  variant: 'standard',
  fullWidth: false,
  size: '',
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
  variant: propTypes.string,
  fullWidth: propTypes.bool,
  size: propTypes.string,
};