import React from 'react';
import { Paper, Typography, Box, Grid, Alert, Divider, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, ListItemIcon, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import LoShuGrid from './LoShuGrid';
import ActionButtons from '../layout/ActionButtons';
import { pairHarmonyRatingInterpretations } from '../../constants/numerologyInterpretations';

const AnalysisReport = ({ result, handleReset }) => {
  if (!result) {
    return (
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '400px', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fafafa' }}>
        <Typography variant="h6" color="text.secondary">Your analysis report will appear here.</Typography>
        <Typography color="text.secondary">Enter your details and an optional mobile number to begin.</Typography>
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
    <Paper sx={{ p: { xs: 1, sm: 2 }, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" component="h2" color="primary" gutterBottom>Analysis for {result.mobileNumber}</Typography>
        <Alert severity={getStrengthColor(result.strength)} sx={{ mb: 2 }}>
            <Typography fontWeight="bold">Overall Strength: {result.strength}%</Typography>
            {result.recommendation}
        </Alert>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}><Typography><strong>Driver Number:</strong> {result.driverNumber}</Typography></Grid>
            <Grid item xs={12} md={6}><Typography><strong>Conductor Number:</strong> {result.conductorNumber}</Typography></Grid>
            <Grid item xs={12} md={6}><Typography><strong>Single Digit Total (SDT):</strong> {result.sdt}</Typography></Grid>
            <Grid item xs={12} md={6}><Typography><strong>Last 4 Digits SDT:</strong> {result.last4sdt}</Typography></Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
            <Grid item xs={12} md={5}><LoShuGrid gridData={result.loShu.grid} /></Grid>
            <Grid item xs={12} md={7}>
                <Typography variant="subtitle1"><strong>Lo Shu Grid Interpretation</strong></Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', maxHeight: '200px', overflowY: 'auto', p: 1, border: '1px solid #eee', borderRadius: 1 }}>
                    {result.loShu.analysisText}
                </Typography>
            </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography>Detailed Digit Placement Analysis</Typography></AccordionSummary>
                <AccordionDetails sx={{ px: 0 }}>
                    <List dense>
                        {result.placement.details.map((d) => (
                            <ListItem key={d.position} secondaryAction={
                                <Chip label={`Score: ${d.points >= 0 ? '+' : ''}${d.points}`} color={d.points > 0 ? 'success' : d.points < 0 ? 'error' : 'default'} size="small" variant="outlined" />
                            }>
                                <ListItemIcon>{getRatingIcon(d.rating)}</ListItemIcon>
                                <ListItemText primary={`Position ${d.position} (Digit ${d.digit})`} secondary={d.description} />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography>Detailed Pair Harmony Analysis</Typography></AccordionSummary>
                <AccordionDetails sx={{ px: 0 }}>
                     <List dense>
                        {result.pairHarmony.details.map((p, index) => (
                            <ListItem key={index} secondaryAction={
                                <Chip label={`Score: ${p.points >= 0 ? '+' : ''}${p.points}`} color={p.points > 0 ? 'success' : p.points < 0 ? 'error' : 'default'} size="small" variant="outlined" />
                            }>
                                <ListItemIcon>{getRatingIcon(p.rating)}</ListItemIcon>
                                <ListItemText primary={`Pair "${p.pair}" (Pos ${index+1}-${index+2})`} secondary={pairHarmonyRatingInterpretations[p.rating]} />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
        <ActionButtons reportData={result} handleReset={handleReset} />
    </Paper>
  );
};

export default AnalysisReport;