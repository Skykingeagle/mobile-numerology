import React, { useState } from 'react';
import { CssBaseline, Container, Grid, Paper, Typography, Divider } from '@mui/material';
import Header from './components/layout/Header';
import UserInputForm from './components/form/UserInputForm';
import AnalysisReport from './components/analysis/AnalysisReport';
import NumberGeneratorForm from './components/form/NumberGeneratorForm';
import GeneratedNumbersList from './components/analysis/GeneratedNumbersList';
import { useAnalysisEngine } from './hooks/useAnalysisEngine';
import { useNumberGenerationEngine } from './hooks/useNumberGenerationEngine';

function App() {
  const [userInput, setUserInput] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  const { analysisEngine, isAnalyzing } = useAnalysisEngine();
  const { generatedNumbers, setGeneratedNumbers, isGenerating, generationEngine } = useNumberGenerationEngine();

  const handleAnalysis = (data) => {
    setUserInput(data);
    if (data.mobileNumber && data.mobileNumber.length === 10) {
      const result = analysisEngine(data.mobileNumber, data.dob);
      setAnalysisResult(result);
    } else {
      setAnalysisResult(null);
    }
  };

  const handleGeneration = (criteria) => {
    if (userInput) {
      generationEngine(criteria, userInput.dob);
    } else {
      alert("Please submit your Name and Date of Birth first.");
    }
  };

  const handleReset = () => {
      setUserInput(null);
      setAnalysisResult(null);
      setGeneratedNumbers([]);
      window.scrollTo(0, 0);
  };

  return (
    <>
      <CssBaseline />
      <Header className="no-print" />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5} className="no-print">
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" color="primary" gutterBottom>
                Phase 1: Enter Your Details
              </Typography>
              <UserInputForm onSubmit={handleAnalysis} loading={isAnalyzing} />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <div id="print-area">
                <AnalysisReport result={analysisResult} handleReset={handleReset} />
            </div>
          </Grid>

          <Grid item xs={12} className="no-print"><Divider sx={{ my: 2 }} /></Grid>
          
          <Grid item xs={12} className="no-print">
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
               <Typography variant="h6" color="primary" gutterBottom>
                Phase 2: Generate a New Number
              </Typography>
              <NumberGeneratorForm onGenerate={handleGeneration} loading={isGenerating} />
            </Paper>
          </Grid>
          
          <Grid item xs={12} className="no-print">
            <GeneratedNumbersList numbers={generatedNumbers} loading={isGenerating} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;