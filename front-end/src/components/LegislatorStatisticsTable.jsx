import React, { useState } from 'react';
import {
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
TablePagination,
TableSortLabel,
Paper,
Typography,
Chip,
Box,
} from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import styled from 'styled-components';

const StyledTableContainer = styled(TableContainer)`
margin-top: 24px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
border-radius: 8px;
`;

const StyledTableHead = styled(TableHead)`
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

& th {
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
}
`;

const StyledTableRow = styled(TableRow)`
&:nth-of-type(odd) {
  background-color: #f8f9fa;
}

&:hover {
  background-color: #e9ecef;
  transition: background-color 0.3s ease;
}
`;

const StatsChip = styled(Chip)`
font-weight: 600;
min-width: 60px;
`;

const LegislatorStatisticsTable = ({ data }) => {
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
const [orderBy, setOrderBy] = useState('name');
const [order, setOrder] = useState('asc');

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

const handleSort = (property) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};

const sortedData = React.useMemo(() => {
  return [...data].sort((a, b) => {
    let aValue = a[orderBy];
    let bValue = b[orderBy];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (order === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
}, [data, order, orderBy]);

const paginatedData = sortedData.slice(
  page * rowsPerPage,
  page * rowsPerPage + rowsPerPage
);

return (
  <Box>
    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50' }}>
      Legislator Voting Statistics
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      Overview of bills supported and opposed by each legislator
    </Typography>

    <StyledTableContainer component={Paper}>
      <Table>
        <StyledTableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'id'}
                direction={orderBy === 'id' ? order : 'asc'}
                onClick={() => handleSort('id')}
                sx={{ color: 'white !important' }}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleSort('name')}
                sx={{ color: 'white !important' }}
              >
                Legislator
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === 'supportedBills'}
                direction={orderBy === 'supportedBills' ? order : 'asc'}
                onClick={() => handleSort('supportedBills')}
                sx={{ color: 'white !important' }}
              >
                Supported Bills
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === 'opposedBills'}
                direction={orderBy === 'opposedBills' ? order : 'asc'}
                onClick={() => handleSort('opposedBills')}
                sx={{ color: 'white !important' }}
              >
                Opposed Bills
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {paginatedData.map((row) => (
            <StyledTableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
              <TableCell align="center">
                <StatsChip
                  icon={<ThumbUp />}
                  label={row.supportedBills}
                  color="success"
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                <StatsChip
                  icon={<ThumbDown />}
                  label={row.opposedBills}
                  color="error"
                  size="small"
                />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledTableContainer>
  </Box>
);
};

export default LegislatorStatisticsTable;