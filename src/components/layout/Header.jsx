import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <PhoneIphoneIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mobile Number Numerology Analyzer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;