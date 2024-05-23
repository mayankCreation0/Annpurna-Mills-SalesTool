import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Typography, MenuItem, Select, TextField, CircularProgress, Backdrop, InputAdornment } from '@mui/material';
import { ArrowUpward, ArrowDownward, FilterList } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TransitionsModal from '../Components/Modal';
import { deleteData, getList } from '../Api/Apis';

const columns = [
  { id: '_id', label: 'ID', minWidth: 50 },
  { id: 'Name', label: 'Name', minWidth: 100 },
  { id: 'Date', label: 'Date', minWidth: 100 },
  { id: 'Category', label: 'Category', minWidth: 100 },
  { id: 'Status', label: 'Status', minWidth: 100 },
  { id: 'Amount', label: 'Amount', minWidth: 100 },
  { id: 'Address', label: 'Address', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function CustomerList() {
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listData = useSelector(state => state.getData);

  useEffect(() => {
    async function fetchData() {
      setLoaderOpen(true);
      await getList(dispatch, navigate);
      setLoaderOpen(false);
    }

    if (!Object.keys(listData).length > 0) {
      fetchData();
    } else {
      setCustomers(listData);
      setFilteredCustomers(listData);
    }
  }, [listData, dispatch, navigate]);

  useEffect(() => {
    let filteredData = customers;

    if (filterValue) {
      filteredData = filteredData.filter(item => item.Category === filterValue);
    }

    if (searchValue) {
      filteredData = filteredData.filter(item => item.Name.toLowerCase().includes(searchValue.toLowerCase()));
    }

    if (sortBy) {
      const isAscending = !sortBy.startsWith('-');
      const sortColumn = isAscending ? sortBy : sortBy.substring(1);
      filteredData = [...filteredData].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return isAscending ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return isAscending ? 1 : -1;
        return 0;
      });
    }

    setFilteredCustomers(filteredData);
  }, [customers, filterValue, searchValue, sortBy]);

  const handleDelete = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleConfirm = async () => {
    setOpen(false);
    setLoaderOpen(true);
    await deleteData(selectedId, dispatch, navigate);
    setLoaderOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (columnId) => {
    let sortedData;
    if (sortBy === columnId) {
      sortedData = [...filteredCustomers].reverse();
    } else {
      sortedData = [...filteredCustomers].sort((a, b) => {
        if (a[columnId] < b[columnId]) return -1;
        if (a[columnId] > b[columnId]) return 1;
        return 0;
      });
    }
    setFilteredCustomers(sortedData);
    setSortBy(sortBy === columnId ? `-${columnId}` : columnId);
  };

  const calculateTenure = (startDate) => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const diffInMonths = (currentDate.getFullYear() - start.getFullYear()) * 12 + (currentDate.getMonth() - start.getMonth());
    if (diffInMonths < 12) {
      return { color: '#3f51b5', text: `${diffInMonths} months`, backgroundColor: '#f3e5f5', fontSize: '12px', borderRadius: '8px' };
    } else if (diffInMonths < 24) {
      return { color: '#f57c00', text: '1 year', backgroundColor: '#fff3e0', fontSize: '12px', borderRadius: '8px' };
    } else if (diffInMonths < 36) {
      return { color: '#f57c00', text: '2 years', backgroundColor: '#fff3e0', fontSize: '12px', borderRadius: '8px' };
    } else if (diffInMonths < 48) {
      return { color: '#d32f2f', text: '3 years', backgroundColor: '#ffcdd2', fontSize: '12px', borderRadius: '8px' };
    } else {
      return { color: '#d32f2f', text: '3+ years', backgroundColor: '#ef9a9a', fontSize: '12px', borderRadius: '8px' };
    }
  };

  const getShortTenureText = (text) => {
    switch (text) {
      case 'More than 3 years':
        return '3+ yrs';
      case 'More than 2 years':
        return '2+ yrs';
      case 'More than a year':
        return '1+ yr';
      case 'Less than a year':
        return '< 1 yr';
      default:
        const monthsMatch = text.match(/^(\d+) months$/);
        if (monthsMatch) {
          return `${monthsMatch[1]}mos`;
        }
        return text;
    }
  };

  const handleEdit = (id) => {
    navigate(`/view/${id}`);
  };

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  const handleSearch = () => {
    const lowercasedFilter = searchValue.toLowerCase();
    const filteredData = customers.filter(item => item.Name.toLowerCase().includes(lowercasedFilter));
    setFilteredCustomers(filteredData);
    setPage(0);
  };

  return (
    <>
      <Paper>
        <div style={{ display: 'flex', alignItems: 'center', margin: 'auto', padding: '.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Search Name"
              variant="outlined"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              sx={{ width: '250px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton color="primary" aria-label="search" onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Select
            variant="outlined"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            IconComponent={FilterList}
            style={{ marginLeft: '1rem', height: '2.5rem' }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Gold">Gold</MenuItem>
            <MenuItem value="Silver">Silver</MenuItem>
            <MenuItem value="Bronze">Bronze</MenuItem>
            <MenuItem value="Bike">Bike</MenuItem>
            <MenuItem value="Cycle">Cycle</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </div>
        {loaderOpen ? (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loaderOpen}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <TableContainer sx={{ height: '69.9vh', border: '1px solid black' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || 'left'}
                      style={{
                        minWidth: column.minWidth,
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        height: '40px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1">{column.label}</Typography>
                        {(column.id === 'Date' || column.id === 'Amount') && (
                          <>
                            <IconButton size="small" onClick={() => handleSort(column.id)}>
                              <ArrowUpward />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleSort(`-${column.id}`)}>
                              <ArrowDownward />
                            </IconButton>
                          </>
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(filteredCustomers) &&
                  filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          sx={{
                            minWidth: column.minWidth,
                            fontSize: '1rem',
                            fontWeight: '600',
                            backgroundColor: '#f5f5f5',
                            color: '#333',
                            padding: '8px',
                          }}
                          align={column.align || 'left'}
                        >
                          {column.id === '_id'
                            ? customer._id.slice(-6)
                            : column.id === 'Date'
                              ? new Date(customer.Date).toLocaleDateString('en-IN')
                              : column.id === 'Name' ? (
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {customer.Name}
                                  </div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      backgroundColor: calculateTenure(customer.Date).backgroundColor,
                                      borderRadius: '8px',
                                      padding: '4px 8px',
                                      marginTop: '4px',
                                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                    }}
                                  >
                                    <AccessTimeIcon style={{ marginRight: '4px', color: '#757575', fontSize: '1rem' }} />
                                    <span
                                      style={{
                                        color: calculateTenure(customer.Date).color,
                                        fontWeight: '500',
                                        fontSize: '0.85rem',
                                      }}
                                    >
                                      {getShortTenureText(calculateTenure(customer.Date).text)}
                                    </span>
                                  </div>
                                </div>
                              ) : column.id === 'Status' ? (
                                <span
                                  style={{
                                    color: 'white',
                                    backgroundColor:
                                      customer.Status === 'Active'
                                        ? '#4CAF50'
                                        : customer.Status === 'Renew'
                                          ? '#2196F3'
                                          : customer.Status === 'Completed'
                                            ? '#F44336'
                                            : 'inherit',
                                    padding: '2px 6px',
                                    borderRadius: '12px',
                                    fontSize: '0.85rem',
                                    display: 'inline-block',
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                                    transition: 'background-color 0.3s ease',
                                  }}
                                >
                                  {customer.Status}
                                </span>
                              ) : column.id === 'Amount' ? (<span>₹{customer.Amount}</span>) : column.id === 'actions' ? (
                                <div style={{ display: 'flex', justifyContent: 'left', gap: '8px' }}>
                                  <IconButton color="primary" onClick={() => handleEdit(customer._id)}>
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton color="secondary" onClick={() => handleView(customer._id)}>
                                    <VisibilityIcon />
                                  </IconButton>
                                  <IconButton color="error" onClick={() => handleDelete(customer._id)}>
                                    <DeleteIcon />
                                  </IconButton>
                                </div>
                              ) : (
                                customer[column.id]
                              )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredCustomers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        />
        <TransitionsModal open={open} handleClose={() => setOpen(false)} handleConfirm={handleConfirm} />
      </Paper>
    </>
  );
}
