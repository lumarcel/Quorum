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
Tooltip,
} from '@mui/material';
import { HowToVote, Person } from '@mui/icons-material';
import styled from 'styled-components';

const StyledTableContainer = styled(TableContainer)`
margin-top: 24px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
border-radius: 8px;
`;

const StyledTableHead = styled(TableHead)`
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

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

const BillTitle = styled(Typography)`
font-weight: 500;
color: #2c3e50;
font-size: 0.9rem;
`;

const SponsorChip = styled(Chip)`
max-width: 200px;
`;

const BillStatisticsTable = ({ data }) => {
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);
const [orderBy, setOrderBy] = useState('id');
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
      Bill Voting Statistics
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      Overview of support and opposition for each bill
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
                active={orderBy === 'title'}
                direction={orderBy === 'title' ? order : 'asc'}
                onClick={() => handleSort('title')}
                sx={{ color: 'white !important' }}
              >
                Bill Title
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === 'supporters'}
                direction={orderBy === 'supporters' ? order : 'asc'}
                onClick={() => handleSort('supporters')}
                sx={{ color: 'white !important' }}
              >
                Supporters
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={orderBy === 'opposers'}
                direction={orderBy === 'opposers' ? order : 'asc'}
                onClick={() => handleSort('opposers')}
                sx={{ color: 'white !important' }}
              >
                Opposers
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'primarySponsor'}
                direction={orderBy === 'primarySponsor' ? order : 'asc'}
                onClick={() => handleSort('primarySponsor')}
                sx={{ color: 'white !important' }}
              >
                Primary Sponsor
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {paginatedData.map((row) => (
            <StyledTableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                <BillTitle variant="body2">{row.title}</BillTitle>
              </TableCell>
              <TableCell align="center">
                <Chip
                  icon={<HowToVote />}
                  label={row.supporters}
                  color="success"
                  size="small"
                  sx={{ minWidth: '60px', fontWeight: 600 }}
                />
              </TableCell>
              <TableCell align="center">
                <Chip
                  icon={<HowToVote />}
                  label={row.opposers}
                  color="error"
                  size="small"
                  sx={{ minWidth: '60px', fontWeight: 600 }}
                />
              </TableCell>
              <TableCell>
                <Tooltip title={row.primarySponsor}>
                  <SponsorChip
                    icon={<Person />}
                    label={row.primarySponsor}
                    variant="outlined"
                    size="small"
                  />
                </Tooltip>
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

export default BillStatisticsTable;