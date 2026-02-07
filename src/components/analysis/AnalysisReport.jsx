import React from 'react';
import {
    Paper, Typography, Box, Grid, Alert, Divider, Accordion, AccordionSummary, AccordionDetails,
    List, ListItem, ListItemText, ListItemIcon, CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LoShuGrid from './LoShuGrid';

const AnalysisReport = ({ result }) => {
  if (!result) {
    return (
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" color="text.secondary">Your analysis report will appear here.</Typography>
      </Paper>
    );
  }

  const getStrengthColor = (strength) => {
    if (strength < 50) return 'error';
    if (strength < 70) return 'warning';
    return 'success';
  };

  const getRatingIcon = (rating) => {
    if (rating === 'good' || rating === 'G') return <CheckCircleOutlineIcon color="success" />;
    if (rating === 'bad' || rating === 'B') return <HighlightOffIcon color="error" />;
    if (rating === 'forbidden') return <HighlightOffIcon color="error" sx={{ opacity: 0.6 }} />;
    return <RemoveCircleOutlineIcon color="action" />;
  };

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" component="h2" color="primary" gutterBottom>Analysis for {result.mobileNumber}</Typography>
        
        <Alert severity={getStrengthColor(result.strength)} sx={{ mb: 2 }}>
            <Typography fontWeight="bold">Overall Strength: {result.strength}%</Typography>
            {result.recommendation}
        </Alert>
        
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Typography><strong>Driver Number:</strong> {result.driverNumber}</Typography>
                <Typography><strong>Conductor Number:</strong> {result.conductorNumber}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography><strong>Single Digit Total (SDT):</strong> {result.sdt}</Typography>
                <Typography><strong>Last 4 Digits SDT:</strong> {result.last4sdt}</Typography>
            </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
                <LoShuGrid gridData={result.loShu.grid} />
            </Grid>
            <Grid item xs={12} md={7}>
                <Typography variant="subtitle1"><strong>Lo Shu Grid Interpretation</strong></Typography>
                <Typography variant="body2" color="text.secondary">{result.loShu.analysisText}</Typography>
            </Grid>
        </Grid>
        
        <Box sx={{ mt: 3 }}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Detailed Digit Placement Analysis</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0 }}>
                    <List dense>
                        {result.placement.details.map((d) => (
                            <ListItem key={d.position}>
                                <ListItemIcon>{getRatingIcon(d.rating)}</ListItemIcon>
                                <ListItemText
                                    primary={`Position ${d.position} (Digit ${d.digit}) - Rating: ${d.rating.toUpperCase()}`}
                                    secondary={d.description}
                                />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Detailed Pair Harmony Analysis</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0 }}>
                     <List dense>
                        {result.pairHarmony.details.map((p, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>{getRatingIcon(p.rating)}</ListItemIcon>
                                <ListItemText
                                    primary={`Pair "${p.pair}" (Positions ${index+1}-${index+2}) - Rating: ${p.rating}`}
                                    secondary={p.rating === 'G' ? "This pair creates harmonious energy, promoting success." : p.rating === 'B' ? "This pair can create conflict, potentially leading to financial or personal issues." : "This pair has a neutral, stable influence."}
                                />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    </Paper>
  );
};

// This helper component can remain here or be moved to its own file if you prefer
const CircularProgressWithLabel = ({ value, ...props }) => (
    <Box sx={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', width: '100%' }}>
      <CircularProgress variant="determinate" value={value} size={100} thickness={4} {...props} />
      <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" component="div" color="text.secondary">{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
);

export default AnalysisReport;