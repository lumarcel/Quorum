import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
baseURL: API_BASE_URL,
headers: {
  'Content-Type': 'application/json',
},
});

// Request interceptor for error handling
apiClient.interceptors.request.use(
(config) => config,
(error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
(response) => response,
(error) => {
  console.error('API Error:', error);
  return Promise.reject(error);
}
);

export const legislativeDataService = {
getLegislatorStatistics: async () => {
  const response = await apiClient.get('/quorum/statistics');
  return response.data;
},

getBillStatistics: async () => {
  const response = await apiClient.get('/bills/statistics');
  return response.data;
},
};

export default apiClient;