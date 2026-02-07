import React from 'react';
import { Box, Typography } from '@mui/material';

// The fixed numerical layout of a Lo Shu Grid
const gridLayout = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

const LoShuGrid = ({ gridData }) => {
  if (!gridData) {
    return null; // Don't render anything if there's no data
  }

  return (
    <Box>
      <Typography variant="subtitle2" align="center" gutterBottom>
        Lo Shu Grid
      </Typography>

      <Box
        sx={{
          width: 150,
          border: '2px solid #333',
          margin: 'auto',
        }}
      >
        {gridLayout.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: 'flex',
              // Add a bottom border to the first two rows
              borderBottom: rowIndex < 2 ? '1px solid #333' : 'none',
            }}
          >
            {row.map((num, colIndex) => (
              <Box
                key={colIndex}
                sx={{
                  flex: 1,
                  minHeight: 45,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // Add a right border to the first two columns in each row
                  borderRight: colIndex < 2 ? '1px solid #333' : 'none',
                  // Set background color based on whether the number is present
                  bgcolor: gridData[num] > 0
                    ? '#e8f5e9' // Green for present
                    : '#ffebee', // Red for missing
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#333',
                }}
              >
                {/* Display the number repeated by its count, or a hyphen if missing */}
                {gridData[num] > 0
                  ? String(num).repeat(gridData[num])
                  : '-'}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LoShuGrid;