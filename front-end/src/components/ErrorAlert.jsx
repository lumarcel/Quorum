import { Alert, AlertTitle, Button, Box } from '@mui/material';
import { Refresh } from '@mui/icons-material';

const ErrorAlert = ({ error, onRetry }) => {
return (
  <Box sx={{ mt: 4 }}>
    <Alert 
      severity="error" 
      action={
        onRetry && (
          <Button 
            color="inherit" 
            size="small" 
            startIcon={<Refresh />}
            onClick={onRetry}
          >
            Retry
          </Button>
        )
      }
    >
      <AlertTitle>Error Loading Data</AlertTitle>
      {error || 'An unexpected error occurred. Please try again.'}
    </Alert>
  </Box>
);
};

export default ErrorAlert;