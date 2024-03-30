
import { Controller, useFormContext } from 'react-hook-form'

import TextField from '@mui/material/TextField'

// ----------------------------------------------------------------------

export default function RHFTextField ({ name, helperText, type, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value))
            } else {
              field.onChange(event.target.value)
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  )
}

