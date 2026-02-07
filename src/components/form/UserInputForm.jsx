import React, { useState } from 'react';
import { TextField, Button, Box, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, CircularProgress } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const UserInputForm = ({ onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('male');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber && (mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber))) {
        setError('If provided, the mobile number must be exactly 10 digits.');
        return;
    }
    if (!name || !dob) {
        setError('Please fill in your Name and Date of Birth.');
        return;
    }
    setError('');
    onSubmit({ name, dob, gender, mobileNumber });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <DatePicker
        label="Date of Birth"
        value={dob}
        onChange={(newValue) => setDob(newValue)}
        format="dd/MM/yyyy" // <-- CORRECTED PROP FOR DATE FORMAT
        renderInput={(params) => <TextField {...params} required fullWidth margin="normal" />}
        sx={{width: '100%', mt: 2, mb: 1}}
      />
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup row name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <TextField
        margin="normal"
        fullWidth
        name="mobileNumber"
        label="Existing Mobile Number (Optional)"
        type="tel"
        id="mobileNumber"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        error={!!error}
        helperText={error}
        inputProps={{ maxLength: 10 }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Submit Details'}
      </Button>
    </Box>
  );
};

export default UserInputForm;