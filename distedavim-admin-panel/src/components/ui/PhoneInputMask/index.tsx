import React, { FC } from 'react';
import { TextFieldProps } from 'react-admin';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';

interface PhoneInputMaskProps extends TextFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const PhoneInputMask: FC<PhoneInputMaskProps> = (props) => {
  const { value, onChange, label } = props;

  return (
    <InputMask mask="5999999999"
      name={props.name}
      maskChar="_" value={value} onChange={onChange}>
      {((inputProps: any) => {
        return (
          <TextField
            value={inputProps.value}
            onChange={inputProps.onChange}
            type='tel'
            name={props.name}
            variant="outlined"
            label={label}
            fullWidth
            sx={{ mb: 2 }}
            size='medium'
            required
            {...inputProps}
          />
        )
      }) as any}

    </InputMask>
  );
};

export default PhoneInputMask;
