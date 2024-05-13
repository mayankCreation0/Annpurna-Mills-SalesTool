import React from 'react';
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
import { getList } from '../Helpers/apis';
import { Typography, MenuItem, Select, TextField } from '@mui/material';
import { ArrowUpward, ArrowDownward, FilterList } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const columns = [
  { id: '_id', label: 'ID', minWidth: 50 },
  { id: 'Name', label: 'Name', minWidth: 100 },
  { id: 'Date', label: 'Date', minWidth: 100 },
  { id: 'Category', label: 'Category', minWidth: 100 },
  { id: 'Status', label: 'Status', minWidth: 100 },
  { id: 'Amount', label: 'Amount', minWidth: 50 },
  { id: 'Address', label: 'Address', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function CoustomerList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [customers, setCustomers] = React.useState([]);
  const [sortBy, setSortBy] = React.useState(null);
  const [filterValue, setFilterValue] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (searchInput, filterValue, sortBy) => {
    try {
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
      // Fetch data with the constructed query string
      const response = await getList(queryString, dispatch);
      setCustomers(response.data); // Assuming your API returns data in the correct format
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    // Pass searchInput, filterValue, and sortBy to fetchData
    fetchData(searchInput, filterValue, sortBy);
  };

  const handleSort = (columnId) => {
    if (sortBy === columnId) {
      setSortBy(sortBy.startsWith('-') ? columnId : `-${columnId}`);
      fetchData(searchInput, filterValue, sortBy.startsWith('-') ? columnId : `-${columnId}`);
    } else {
      setSortBy(columnId);
      fetchData(searchInput, filterValue, columnId);
    }
    // Pass searchInput, filterValue, and sortBy to fetchData

  };

  const handleEdit = (id) => {
    navigate(`/view/${id}`);
  };

  const handleView = (id) => {
  navigate(`/view/${id}`);
  };
  const handleDelete = (id) => {
    // Handle delete action (implementation depends on your specific needs)
    // You might want to confirm deletion with a dialog before proceeding.
  };
  const handleSearch = () => {
    setSearchInput(searchValue)
    fetchData(searchValue, filterValue, sortBy);
    setSearchInput(null)
  }

  return (
    <Paper sx={{ width: '100%', top: '65px', position: 'absolute' }}>
      <div style={{ display: 'flex', alignItems: 'center', margin: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Search Name"
            variant="outlined"
            onChange={(e)=>setSearchValue(e.target.value)}
            sx={{ width: '250px', marginRight: '1rem' }}
          />
          <IconButton color="primary" aria-label="search" sx={{ml:"-30px"}} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </div>
        <Select
          variant="outlined"
          defaultValue=""
          onChange={(e) => {
            setFilterValue(e.target.value);
            // Pass searchInput, filterValue, and sortBy to fetchData
            fetchData(searchInput, e.target.value, sortBy);
          }}
          IconComponent={FilterList}
          style={{ marginLeft: '1rem' }}
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
      <TableContainer sx={{ maxHeight: "70vh" }}>
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
                          ) : column.id === 'actions' ? (
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ display: 'flex', justifyContent: 'flex-end' }} // Align pagination to the right
      />
    </Paper>
  );
}