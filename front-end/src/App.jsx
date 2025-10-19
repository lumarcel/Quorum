import React from 'react';
import {
Container,
Typography,
Box,
Paper,
Tabs,
Tab,
Divider,
} from '@mui/material';
import { HowToVote, People } from '@mui/icons-material';
import styled from 'styled-components';
import { useLegislativeData } from './hooks/useLegislativeData';
import LegislatorStatisticsTable from './components/LegislatorStatisticsTable';
import BillStatisticsTable from './components/BillStatisticsTable';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';

const AppContainer = styled(Container)`
padding: 40px 20px;
min-height: 100vh;
background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
`;

const Header = styled(Paper)`
padding: 32px;
margin-bottom: 32px;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
border-radius: 12px;
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const StyledTabs = styled(Tabs)`
margin-bottom: 24px;
background: white;
border-radius: 8px;
padding: 8px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

function TabPanel({ children, value, index }) {
return (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);
}

function App() {
const { legislatorStats, billStats, loading, error, refetch } = useLegislativeData();
const [tabValue, setTabValue] = React.useState(0);

const handleTabChange = (event, newValue) => {
  setTabValue(newValue);
};

return (
  <AppContainer maxWidth="xl">
    <Header elevation={0}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Legislative Data Dashboard
      </Typography>
      <Typography variant="h6" sx={{ opacity: 0.9 }}>
        Comprehensive analysis of bills, legislators, and voting records
      </Typography>
    </Header>

    {loading && <LoadingSpinner />}

    {error && <ErrorAlert error={error} onRetry={refetch} />}

    {!loading && !error && (
      <>
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            icon={<People />}
            label="Legislators"
            iconPosition="start"
            sx={{ fontWeight: 600, fontSize: '1rem' }}
          />
          <Tab
            icon={<HowToVote />}
            label="Bills"
            iconPosition="start"
            sx={{ fontWeight: 600, fontSize: '1rem' }}
          />
        </StyledTabs>

        <Divider sx={{ mb: 2 }} />

        <TabPanel value={tabValue} index={0}>
          <LegislatorStatisticsTable data={legislatorStats} />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <BillStatisticsTable data={billStats} />
        </TabPanel>
      </>
    )}
  </AppContainer>
);
}

export default App;