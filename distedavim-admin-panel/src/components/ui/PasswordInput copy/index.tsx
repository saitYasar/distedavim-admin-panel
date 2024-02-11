import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface PasswordComponentProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const PasswordComponent: React.FC<PasswordComponentProps> = ({
  label,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      label={label}
      variant="outlined"
      size="medium"
      value={value}
      onChange={handleChangePassword}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={handleTogglePasswordVisibility}
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordComponent;
