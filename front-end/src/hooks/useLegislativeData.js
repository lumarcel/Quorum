import { useState, useEffect, useCallback } from 'react';
import { legislativeDataService } from '../services/api';

export const useLegislativeData = () => {
  
const [legislatorStats, setLegislatorStats] = useState([]);
const [billStats, setBillStats] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const fetchData = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);

    const [legislators, bills] = await Promise.all([
      legislativeDataService.getLegislatorStatistics(),
      legislativeDataService.getBillStatistics(),
    ]);

    setLegislatorStats(legislators);
    setBillStats(bills);
  } catch (err) {
    setError(err.message || 'Failed to fetch data');
    console.error('Error fetching legislative data:', err);
  } finally {
    setLoading(false);
  }
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]);

return {
  legislatorStats,
  billStats,
  loading,
  error,
  refetch: fetchData,
};
};