import React, { useState } from 'react';
import {
    Paper, Typography, LinearProgress, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Alert, Button, Modal, Box, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AnalysisReport from './AnalysisReport'; // We reuse the report component!

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: '80%', md: 700 },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto'
};

const GeneratedNumbersList = ({ numbers, loading }) => {
    const [selectedAnalysis, setSelectedAnalysis] = useState(null);
    const handleOpenModal = (analysis) => setSelectedAnalysis(analysis);
    const handleCloseModal = () => setSelectedAnalysis(null);

    if (loading) {
        return (
            <Paper sx={{ p: 2 }}>
                <Typography gutterBottom>Generating numbers based on your criteria...</Typography>
                <LinearProgress />
            </Paper>
        );
    }

    if (numbers.length === 0) {
        return (
            <Paper sx={{ p: 2 }}>
                <Typography color="text.secondary">Generated numbers will be listed here.</Typography>
            </Paper>
        );
    }

    if (numbers[0]?.noResults) {
        return (
            <Alert severity="warning">
                No numbers with a strength of 50% or higher were found matching all your criteria. The engine prioritizes your fixed digits and SDT rules. Try relaxing the constraints for more results.
            </Alert>
        );
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="generated numbers table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Rank</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Generated Number</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>SDT</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Last 4 SDT</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Strength (%)</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {numbers.map((item, index) => (
                            <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{item.mobileNumber}</Typography>
                                </TableCell>
                                <TableCell>{item.sdt}</TableCell>
                                <TableCell>{item.last4sdt}</TableCell>
                                <TableCell align="right">{item.strength}</TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" size="small" onClick={() => handleOpenModal(item)}>
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={!!selectedAnalysis} onClose={handleCloseModal} aria-labelledby="analysis-modal-title">
                <Box sx={modalStyle}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {selectedAnalysis && <AnalysisReport result={selectedAnalysis} />}
                </Box>
            </Modal>
        </>
    );
};

export default GeneratedNumbersList;