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
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { deleteData, getList } from '../Helpers/apis';
import { Typography, MenuItem, Select, TextField, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
import { ArrowUpward, ArrowDownward, FilterList } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TransitionsModal from '../Components/Modal';
import Navbar from '../Components/Navbar';

const columns = [
  { id: '_id', label: 'ID', minWidth: 50 },
  { id: 'Name', label: 'Name', minWidth: 100 },
  { id: 'Date', label: 'Date', minWidth: 100 },
  { id: 'Category', label: 'Category', minWidth: 100 },
  { id: 'Status', label: 'Status', minWidth: 50 },
  { id: 'Amount', label: 'Amount', minWidth: 50 },
  { id: 'Address', label: 'Address', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function CustomerList({ mode, toggleColorMode }) {
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [customers, setCustomers] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);

  const fetchData = async (searchInput, filterValue, sortBy) => {
    try {
      setLoaderOpen(true);
      let queryString = '';
      if (searchInput) {
        queryString += `&search=${searchInput}`;
      }
      if (filterValue) {
        queryString += `&category=${filterValue}`;
      }
      if (sortBy) {
        queryString += `&sortBy=${sortBy}`;
      }
      const response = await getList(queryString, dispatch);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    } finally {
      setLoaderOpen(false);
    }
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleConfirm = async () => {
    setOpen(false);
    setLoaderOpen(true);
    await deleteData(selectedId, dispatch);
    setSnackBarOpen(true);
    setMessage('Customer Deleted Successfully');
    setSeverity('success');
    fetchData(searchInput, filterValue, sortBy);
    setLoaderOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchData(searchInput, filterValue, sortBy);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    fetchData(searchInput, filterValue, sortBy);
  };

  const handleSort = (columnId) => {
    if (sortBy === columnId) {
      const newSortBy = sortBy.startsWith('-') ? columnId : `-${columnId}`;
      setSortBy(newSortBy);
      fetchData(searchInput, filterValue, newSortBy);
    } else {
      setSortBy(columnId);
      fetchData(searchInput, filterValue, columnId);
    }
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
      return { color: '#d32f2f', text: 'More than 3 years', backgroundColor: '#ef9a9a', fontSize: '12px', borderRadius: '8px' };
    }
  };
  const handleEdit = (id) => {
    navigate(`/view/${id}`);
  };

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };
  const handleSearch = () => {
    setSearchInput(searchValue)
    fetchData(searchValue, filterValue, sortBy);
    setSearchInput(null)
  }


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setLoaderOpen(loading);
  }, [loading]);

  return (<>
    <Navbar mode={mode} toggleColorMode={toggleColorMode} />
    <Paper sx={{ width: '100%', height: "100%", marginTop: '64px' }}>
      <div style={{ display: 'flex', alignItems: 'center', margin: 'auto', padding: ".4rem" }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Search Name"
            variant="outlined"
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ width: '250px', marginRight: '1rem' }}
          />
          <IconButton color="primary" aria-label="search" sx={{ ml: "-30px" }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </div>
        <Select
          variant="outlined"
          defaultValue=""
          onChange={(e) => {
            setFilterValue(e.target.value);
            fetchData(searchInput, e.target.value, sortBy);
          }}
          IconComponent={FilterList}
          style={{ marginLeft: '1rem', height: "2.5rem" }}
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
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loaderOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
      <TableContainer sx={{ maxHeight: "75.6vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: "16px",
                    fontWeight: 'bold',
                    // backgroundColor: "#f5f5f5", 
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
            {customers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((customer, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ fontSize: "20px", fontWeight: 'normal', }}
                      align={column.align || 'left'}
                    >
                      {column.id === '_id'
                        ? customer._id.slice(-6)
                        : column.id === 'Date'
                          ? new Date(customer.Date).toLocaleDateString('en-IN')
                          : column.id === 'Name'
                            ? (
                              <>
                                {column.id === 'Name' && (
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      {customer.Name}
                                    </div>
                                    <div
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: calculateTenure(customer.Date).backgroundColor,
                                        borderRadius: calculateTenure(customer.Date).borderRadius,
                                        padding: '5px 10px',
                                        marginTop: '5px',
                                      }}
                                    >
                                      <AccessTimeIcon style={{ marginRight: '5px', color: '#757575' }} /> {/* Add the Material UI icon */}
                                      <span
                                        style={{
                                          color: calculateTenure(customer.Date).color,
                                          fontWeight: 'bold',
                                          fontSize: calculateTenure(customer.Date).fontSize,
                                        }}
                                      >
                                        {calculateTenure(customer.Date).text}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </>
                            )
                            : column.id === 'Status' ? (
                              <span
                                style={{
                                  color:
                                    customer.Status === 'Active'
                                      ? 'white'
                                      : customer.Status === 'Renew'
                                        ? 'white'
                                        : customer.Status === 'Completed'
                                          ? 'white'
                                          : 'inherit',
                                  backgroundColor:
                                    customer.Status === 'Active'
                                      ? 'green'
                                      : customer.Status === 'Renew'
                                        ? 'blue'
                                        : customer.Status === 'Completed'
                                          ? 'red'
                                          : 'inherit',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  display: 'inline-block',
                                }}
                              >
                                {customer.Status}
                              </span>
                            ) :column.id === 'Amount'?(<span>₹{customer.Amount}</span>): column.id === 'actions' ? (
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
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      />
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
      >
        <Alert
          severity={severity}
          sx={{ width: '100%' }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Snackbar>
      <TransitionsModal open={open} handleClose={() => setOpen(false)} handleConfirm={handleConfirm} />
    </Paper></>
  );
}
