import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import styled from 'styled-components';

const LoadingContainer = styled(Box)`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: 400px;
gap: 16px;
`;

const LoadingSpinner = () => {
return (
  <LoadingContainer>
    <CircularProgress size={60} thickness={4} />
    <Typography variant="h6" color="text.secondary">
      Loading legislative data...
    </Typography>
  </LoadingContainer>
);
};

export default LoadingSpinner;