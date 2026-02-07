import React, { useState, useRef, createRef } from 'react';
import { TextField, Button, Box, Grid, Typography, CircularProgress, Stack } from '@mui/material';

const NumberGeneratorForm = ({ onGenerate, loading }) => {
    const [fixedDigits, setFixedDigits] = useState(Array(10).fill(''));
    const [sdt, setSdt] = useState('');
    const [last4sdt, setLast4sdt] = useState('');

    // Refs for auto-focus shifting
    const inputRefs = useRef(Array(10).fill().map(() => createRef()));

    const handleFixedDigitChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newDigits = [...fixedDigits];
            newDigits[index] = value;
            setFixedDigits(newDigits);

            // Auto-focus next input
            if (value && index < 9) {
                inputRefs.current[index + 1].current.focus();
            }
        }
    };
    
    const handleGenerate = () => {
        onGenerate({ fixedDigits, sdt, last4sdt });
    };

    return (
        <Box sx={{ mt: 1 }}>
            <Typography variant="body1" gutterBottom>
                Place fixed digits you want to keep (optional):
            </Typography>
            <Stack direction="row" spacing={1} sx={{mb: 2, justifyContent: 'center'}}>
                {fixedDigits.map((digit, index) => (
                    <TextField
                        key={index}
                        value={digit}
                        onChange={(e) => handleFixedDigitChange(index, e.target.value)}
                        inputRef={inputRefs.current[index]}
                        inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                        size="small"
                        sx={{ width: '3.5rem' }} // Smaller width for single-row fit
                    />
                ))}
            </Stack>
            
            <Grid container spacing={2} sx={{mb: 2}}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Target Single Digit Total (SDT)"
                        fullWidth
                        value={sdt}
                        onChange={(e) => /^[1-9]?$/.test(e.target.value) && setSdt(e.target.value)}
                        inputProps={{ maxLength: 1 }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Target Last 4 Digits SDT"
                        fullWidth
                        value={last4sdt}
                        onChange={(e) => /^[1-9]?$/.test(e.target.value) && setLast4sdt(e.target.value)}
                        inputProps={{ maxLength: 1 }}
                    />
                </Grid>
            </Grid>
            
            <Button variant="contained" onClick={handleGenerate} disabled={loading} fullWidth>
                {loading ? <CircularProgress size={24} /> : "Generate New Numbers"}
            </Button>
        </Box>
    );
};

export default NumberGeneratorForm;