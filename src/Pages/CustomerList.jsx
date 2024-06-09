import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Typography,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
  Box} from '@mui/material';
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  AccessTime as AccessTimeIcon,
  ArrowUpward,
  ArrowDownward,
  FilterList,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TransitionsModal from '../Components/Modal';
import { deleteData, getList } from '../Api/Apis';
import Loading from '../Components/Loading';

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
  const listData = useSelector((state) => state.getData);

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
      filteredData = filteredData.filter((item) => item.Category === filterValue);
    }

    if (searchValue) {
      filteredData = filteredData.filter((item) =>
        item.Name.toLowerCase().includes(searchValue.toLowerCase())
      );
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
    const diffInMonths =
      (currentDate.getFullYear() - start.getFullYear()) * 12 +
      (currentDate.getMonth() - start.getMonth());
    if (diffInMonths < 12) {
      return {
        color: '#3f51b5',
        text: `${diffInMonths} months`,
        backgroundColor: '#f3e5f5',
        fontSize: '12px',
        borderRadius: '8px',
      };
    } else if (diffInMonths < 24) {
      return {
        color: '#f57c00',
        text: '1 year',
        backgroundColor: '#fff3e0',
        fontSize: '12px',
        borderRadius: '8px',
      };
    } else if (diffInMonths < 36) {
      return {
        color: '#f57c00',
        text: '2 years',
        backgroundColor: '#fff3e0',
        fontSize: '12px',
        borderRadius: '8px',
      };
    } else if (diffInMonths < 48) {
      return {
        color: '#d32f2f',
        text: '3 years',
        backgroundColor: '#ffcdd2',
        fontSize: '12px',
        borderRadius: '8px',
      };
    } else {
      return {
        color: '#d32f2f',
        text: '3+ years',
        backgroundColor: '#ef9a9a',
        fontSize: '12px',
        borderRadius: '8px',
      };
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
    const filteredData = customers.filter((item) =>
      item.Name.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredCustomers(filteredData);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{padding:'0px',overflowY: 'hidden',   }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.1rem   1rem',
            backgroundColor: 'background.default',
          }}
        >
          <TextField
            // label="Search Name"
            variant="outlined"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder='seach name..'
            sx={{
              width: '250px',
              marginRight: '1rem',
              '.MuiOutlinedInput-root': {
                height: '2.5rem',
                borderRadius: '20px',
              },
              '.MuiInputLabel-outlined': {
                transform: 'translate(14px, 10px) scale(1)',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    aria-label="search"
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Select
            variant="outlined"
            // label="Filter"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            IconComponent={FilterList}
            displayEmpty
            sx={{
              height: '2.5rem',
              borderRadius: '20px',
              minWidth: '150px',
              '.MuiSelect-icon': {
                right: '10px',
              },
              '.MuiOutlinedInput-root': {
                borderRadius: '20px',
                paddingRight: '30px',
              },
              '.MuiInputLabel-outlined': {
                transform: 'translate(14px, 10px) scale(1)',
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Gold">Gold</MenuItem>
            <MenuItem value="Silver">Silver</MenuItem>
            <MenuItem value="Bronze">Kansa</MenuItem>
            <MenuItem value="Bike">Bike</MenuItem>
            <MenuItem value="Cycle">Cycle</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </Box>
        {loaderOpen ? (
          <Loading />
        ) : (
          <>
            <TableContainer
            component={'div'} className='max-sm:h-[72vh] h-[77vh]'
              sx={{
                border: '1px solid black',
                overflowX: 'scroll',
                scrollBehavior: 'smooth'
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align || 'left'}
                        sx={{
                          minWidth: column.minWidth,
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          height: '30px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle2">{column.label}</Typography>
                          {(column.id === 'Date' || column.id === 'Amount') && (
                            <>
                              <IconButton
                                size="small"
                                onClick={() => handleSort(column.id)}
                              >
                                <ArrowUpward sx={{ fontSize: '1rem' }} />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleSort(`-${column.id}`)}
                              >
                                <ArrowDownward sx={{ fontSize: '1rem' }} />
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
                    filteredCustomers
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((customer, index) => (
                        <TableRow key={index}>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              sx={{
                                minWidth: column.minWidth,
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                backgroundColor: '#f5f5f5',
                                color: '#333',
                                padding: '6px',
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
                                          padding: '2px 4px',
                                          marginTop: '4px',
                                        }}
                                      >
                                        <AccessTimeIcon style={{ marginRight: '4px', color: '#757575', fontSize: '1rem' }} />
                                        <span
                                          style={{
                                            color: calculateTenure(customer.Date).color,
                                            fontWeight: '500',
                                            fontSize: '0.75rem',
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
                                        fontSize: '0.75rem',
                                        display: 'inline-block',
                                      }}
                                    >
                                      {customer.Status}
                                    </span>
                                  ) : column.id === 'Amount' ? (<span>₹{customer.Amount}</span>) : column.id === 'actions' ? (
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      style={{ display: 'flex', justifyContent: 'left', gap: '8px' }}
                                    >
                                      <IconButton color="primary" onClick={() => handleEdit(customer._id)}>
                                        <EditIcon sx={{ fontSize: '1rem' }} />
                                      </IconButton>
                                      <IconButton color="secondary" onClick={() => handleView(customer._id)}>
                                        <VisibilityIcon sx={{ fontSize: '1rem' }} />
                                      </IconButton>
                                      <IconButton color="error" onClick={() => handleDelete(customer._id)}>
                                        <DeleteIcon sx={{ fontSize: '1rem' }} />
                                      </IconButton>
                                    </motion.div>
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
            <Box sx={{ display: 'flex', flexDirection: 'column' }}> 
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredCustomers.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{  xs: 'flex', justifyContent: 'flex-end', fontSize: '0.75rem', padding: '0px',overflow: 'hidden',paddingX:'0px' }}
            />
            <TransitionsModal
              open={open}
              handleClose={() => setOpen(false)}
              handleConfirm={handleConfirm}
            />
            </Box>
          </>)}
      </Paper>
    </>
  );
}
