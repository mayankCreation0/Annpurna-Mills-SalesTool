import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Paper, Typography, Grid, Card, CardContent, CardMedia, Avatar, Box, Stack, Button, TextField, ToggleButtonGroup, ToggleButton, Table, TableBody, TableRow, TableCell, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailsById, updateData } from '../Api/Apis';
import MaleImg from '../Assets/Profile/Ava_Male.jpg';
import FemaleImg from '../Assets/Profile/Ava_Female.jpg';
import CreateIcon from '@mui/icons-material/Create';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import MovingIcon from '@mui/icons-material/Moving';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { categoriesOptions, statusOptions } from '../Utilis/Utilis';

const ViewPage = () => {
    const [customer, setCustomer] = useState(null);
    const [interest, setInterest] = useState(0);
    const [month, setMonth] = useState(0);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mode = useSelector((state) => state.mode);
    const [isEdit, setIsEdit] = React.useState(false);
    const [gender, setGender] = React.useState();

    const fetchData = async () => {
        const res = await getDetailsById(id, dispatch, navigate);
        console.log(res.data);
        setCustomer(res.data);
        setGender(res.data.Gender);
        calculateMonthlySimpleInterest(res.data.Amount, res.data.Rate, res.data.Date);
        calculateExactTimePeriod(res.data.Date)
    };
    function calculateExactTimePeriod(startDate) {
        const start = new Date(startDate);
        const end = new Date();

        const years = end.getFullYear() - start.getFullYear();
        const months = end.getMonth() - start.getMonth();
        const days = end.getDate() - start.getDate();

        return `${years} years, ${months} months, ${days} days`;
    }


    function calculateMonthlySimpleInterest(principal, monthlyRate, startDate) {
        const start = new Date(startDate);
        const end = new Date();

        // Determine exclusion rules based on principal amount
        const startExclusionDay = principal <= 3500 ? 6 : 10;
        const endExclusionDay = principal <= 3500 ? 10 : 13;

        // Exclude start month if the start date is within the last `startExclusionDay` days of the month
        const daysInStartMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
        if (start.getDate() > daysInStartMonth - startExclusionDay) {
            start.setMonth(start.getMonth() + 1);
            start.setDate(1);
        }

        // Exclude end month if the end date is within the first `endExclusionDay` days of the month
        if (end.getDate() <= endExclusionDay) {
            end.setMonth(end.getMonth() - 1);
            end.setDate(new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate());
        }

        // Calculate the number of full months between the adjusted start and end dates
        let fullMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

        // Ensure the minimum time period is 1 month
        if (fullMonths < 1) {
            fullMonths = 1;
        }

        // Calculate the simple interest for the full months
        const simpleInterest = (principal * monthlyRate * fullMonths) / 100;

        // Assuming setMonth and setInterest are defined elsewhere
        setMonth(fullMonths);
        setInterest(simpleInterest);

        // Return the simple interest if needed
        return simpleInterest;
    }




    useEffect(() => {
        fetchData();
    }, [id, dispatch]);

    if (!customer) {
        return <div className='flex justify-center items-center h-full w-full text-xl'>Loading...</div>;
    }
    const handleUpdate = async(data) => {
        await updateData(data,dispatch,navigate,id)
    }


    return (
        <>
            <Grid container sx={{ width: "100%", flexDirection: { xs: 'column-reverse', md: 'row' } }} className='mt-5 w-full'>
                <Grid item xs={'12'} sm='12' md={7} lg={8} xl={7}>
                    <Box component={'div'} sx={{ padding: "0px 20px" }}>
                        <Stack flexDirection={'row'} justifyContent={"space-between"} alignItems={'center'} className='!mb-12'>
                            <Typography component={'h4'} variant='h4' sx={{ fontWeight: "600", color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                {!isEdit ? 'Details :' : 'Edit :'}
                            </Typography>

                            <Stack flexDirection={'row'} justifyContent={'start'} alignItems={'center'} gap={'10px'}>
                                {!isEdit && <Button className='flex justify-center items-center gap-2 ] !px-5' onClick={() => setIsEdit(!isEdit)}>
                                    Edit
                                    <CreateIcon sx={{ fontSize: "15px" }} />
                                </Button>}

                                {isEdit &&
                                    <>
                                        <Button sx={{
                                            backgroundColor: "grey", opacity: ".9", color: mode !== 'light' ? 'applicationTheme.secondaryColor_1' : 'applicationTheme.primaryColor_1', "&:hover": {
                                                backgroundColor: "grey", color: mode !== 'light' ? 'applicationTheme.secondaryColor_1' : 'applicationTheme.primaryColor_1'
                                            }
                                        }} className='!bg-opacity-5 !bg-blend-darken !px-5' onClick={() => setIsEdit(!isEdit)}>
                                            Reset
                                        </Button>

                                        <Button sx={{ backgroundColor: "applicationTheme.main" }} className='flex justify-center items-center gap-2 !px-5' onClick={() => setIsEdit(!isEdit)}>
                                            Save
                                            <AutoFixHighIcon sx={{ fontSize: "15px" }} />
                                        </Button>
                                    </>
                                }

                            </Stack>
                        </Stack>
                        <Box component="form" onSubmit={() => handleUpdate()} noValidate>
                            <Grid container rowSpacing={{ xs: !isEdit ? '30px' : '10px', sm: !isEdit ? '30px' : '10px', md: '20px' }} columnSpacing={'20px'}>
                                <Grid item xs={11} sm={6} md={5} lg={6} xl={!isEdit ? 6 : 8} >
                                    {!isEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='h6' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Name :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Name}
                                        </Typography>
                                    </Stack>}
                                    {isEdit && <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={customer.Name}
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"


                                    />}
                                </Grid>
                                <Grid item xs={'11'} sm={'6'} md={'7'} lg={6} xl={!isEdit ? 6 : 4} >

                                    {!isEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='h6' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Gender :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Gender}
                                        </Typography>
                                    </Stack>}
                                    {
                                        isEdit &&
                                        <Box component={'div'} className='flex flex-col justify-center items-start h-full !p-0'>

                                            <ToggleButtonGroup
                                                value={gender}
                                                exclusive
                                                onChange={(event, value) => setGender(value)}
                                                aria-label="gender"
                                            >
                                                <ToggleButton value="male" aria-label="male">
                                                    Male
                                                    <MaleIcon />
                                                </ToggleButton>
                                                <ToggleButton value="female" aria-label="female">
                                                    Female
                                                    <FemaleIcon />
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        </Box>
                                    }

                                </Grid>
                                <Grid item xs={'11'}>
                                    {!isEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='h6' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Address :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Address}
                                        </Typography>
                                    </Stack>}
                                    {isEdit && <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={customer.Address}
                                        id="address"
                                        label="Address"
                                        name="address"
                                        autoComplete="address"

                                        multiline
                                        minRows={'4'}

                                    />}

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {!isEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='h6' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Phone Number :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.PhoneNumber}
                                        </Typography>
                                    </Stack>}
                                    {isEdit && <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={customer.PhoneNumber}
                                        id="phnumber"
                                        label="Ph Number"
                                        name="phnumber"
                                        autoComplete="phnumber"
                                    />}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {!isEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='h6' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Date :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Date.substr(0, 10)}
                                        </Typography>
                                    </Stack>}
                                    {isEdit && <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        type='date'
                                        id="date"
                                        label="Date"
                                        name="date"
                                        value={customer.Date.substr(0, 10)}
                                        autoComplete="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}

                                    />}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {!isEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='h6' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Category :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Category}
                                        </Typography>
                                    </Stack>}
                                    {isEdit &&
                                        <Autocomplete
                                            required
                                            value={customer.Category}
                                            id="category"
                                            options={categoriesOptions}
                                            sx={{ width: "100%", textTransform: 'capitalize' }}
                                            renderInput={(params) => <TextField margin="normal"
                                                required
                                                fullWidth {...params} sx={{ textTransform: "capitalize" }} label="Category" />}
                                        />
                                    }
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {!isEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='h6' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Amount :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Amount}
                                        </Typography>
                                    </Stack>}
                                    {isEdit && <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={customer.Amount}
                                        id="amount"
                                        label="Amount"
                                        name="amount"
                                        autoComplete="amount"


                                    />}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {!isEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='h6' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Status :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Status}
                                        </Typography>
                                    </Stack>}
                                    {isEdit &&
                                        <Autocomplete
                                            required
                                            id="status"
                                            value={customer.Status}
                                            options={statusOptions}
                                            sx={{ width: "100%", textTransform: 'capitalize' }}
                                            renderInput={(params) => <TextField margin="normal"
                                                required
                                                fullWidth {...params} sx={{ textTransform: "capitalize" }} label="Status" />}
                                        />
                                    }
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {!isEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='h6' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Remarks :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Remarks}
                                        </Typography>
                                    </Stack>}
                                    {isEdit && <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={customer.Remarks}
                                        id="remarks"
                                        label="Remarks"
                                        name="remarks"
                                        autoComplete="remarks"
                                    />}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {!isEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='h6' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Rate :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Rate}
                                        </Typography>
                                    </Stack>}
                                    {isEdit && <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        value={customer.Rate}
                                        id="rate"
                                        label="Rate"
                                        name="rate"
                                        autoComplete="rate"
                                    />}
                                </Grid>

                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={'12'} sm='12' md={5} lg={4} xl={5}>
                    <Stack flexDirection={{ xs: 'column', sm: 'row', md: 'column' }} justifyContent={{ xs: 'space-between', md: 'start' }} gap={{ sm: '40px', md: '10px' }} alignItems={{ xs: 'start', sm: 'center', md: "start" }} component={'div'} sx={{ borderLeftWidth: { xs: 'none', sm: "none", md: "1px" }, borderLeftStyle: "solid", borderLeftColor: "applicationTheme.primaryColor_2", padding: "10px 20px" }}>

                        <Box component={'div'} sx={{ display: 'flex', justifyContent: "start", alignItems: "center", gap: "15px" }} className='mb-5'>
                            <img src={customer.Gender !== 'male' ? FemaleImg : MaleImg} alt='Male' className='h-40 w-40 rounded-[50%] ' />
                            <Box component={'div'}>
                                <Typography component={'h4'} variant='h4' sx={{ color: 'applicationTheme.secondaryColor_1', }} className=' capitalize'>
                                    {customer.Name}
                                </Typography>
                                <Typography component={'p'} variant='p' sx={{ color: mode !== 'light' ? 'applicationTheme.secondaryColor_1' : 'applicationTheme.primaryColor_1', backgroundColor: "applicationTheme.main", borderRadius: "30px", width: "fit-content", padding: "5px 20px" }} className=' capitalize'>
                                    {customer.Gender}
                                </Typography>
                            </Box>
                        </Box>

                        <Stack display={{ xs: 'none', sm: 'flex' }} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'10px'} className='w-fit p-3'>

                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={'120px'} sx={{ borderBottomColor: "applicationTheme.primaryColor_2", borderRightWidth: "1px", borderRightStyle: "solid", borderRightColor: "applicationTheme.primaryColor_2" }}>
                                            <Typography component={'h6'} variant='h6' sx={{ fontWeight: "400", color: 'applicationTheme.secondaryColor_1' }} className=' capitalize'>
                                                Interest
                                            </Typography>
                                        </TableCell>
                                        <TableCell width={'150px'} sx={{ borderBottomColor: "applicationTheme.primaryColor_2" }}>
                                            <Typography component={'h6'} variant='h6' sx={{ fontWeight: "300", color: 'applicationTheme.secondaryColor_1', display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }} className=' capitalize'>
                                                {Math.sign(interest) !== -1 ? <MovingIcon /> : <TrendingDownIcon sx={{ fontSize: "25px", color: "#ff4d4d" }} />} {interest}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={'120px'} sx={{ borderBottom: "none", borderRightWidth: "1px", borderRightStyle: "solid", borderRightColor: "applicationTheme.primaryColor_2" }}>
                                            <Typography component={'h6'} variant='h6' sx={{ fontWeight: "400", color: 'applicationTheme.secondaryColor_1' }} className=' capitalize'>
                                                Month
                                            </Typography>
                                        </TableCell>
                                        <TableCell width={'120px'} sx={{ borderBottom: "none" }}>
                                            <Typography component={'p'} variant='p' sx={{ fontWeight: "300", color: 'applicationTheme.secondaryColor_1', display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }} className=' capitalize'>
                                                {month}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={'120px'} sx={{ borderBottom: "none", borderRightWidth: "1px", borderRightStyle: "solid", borderRightColor: "applicationTheme.primaryColor_2" }}>
                                            <Typography component={'h6'} variant='h6' sx={{ fontWeight: "400", color: 'applicationTheme.secondaryColor_1' }} className=' capitalize'>
                                                Amount to be Paid
                                            </Typography>
                                        </TableCell>
                                        <TableCell width={'150px'} sx={{ borderBottom: "none" }}>
                                            <Typography component={'p'} variant='p' sx={{ fontWeight: "300", color: 'applicationTheme.secondaryColor_1', display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }} className=' capitalize'>
                                                {Math.sign(customer.Amount + interest) !== -1 ? <MovingIcon /> : <TrendingDownIcon sx={{ fontSize: "25px", color: "#ff4d4d" }} />}  {customer.Amount + interest}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={'120px'} sx={{ borderBottom: "none", borderRightWidth: "1px", borderRightStyle: "solid", borderRightColor: "applicationTheme.primaryColor_2" }}>
                                            <Typography component={'h6'} variant='h6' sx={{ fontWeight: "400", color: 'applicationTheme.secondaryColor_1' }} className=' capitalize'>
                                                Exact Time Period
                                            </Typography>
                                        </TableCell>
                                        <TableCell width={'150px'} sx={{ borderBottom: "none" }}>
                                            <Typography component={'p'} variant='p' sx={{ fontWeight: "300", color: 'applicationTheme.secondaryColor_1', display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }} className=' capitalize'>
                                                {calculateExactTimePeriod}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Stack>

                        <Stack display={{ xs: 'flex', sm: 'none' }} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'10px'} className='w-full p-3'>

                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={'120px'} sx={{ borderBottomColor: "applicationTheme.primaryColor_2" }}>
                                            <Typography component={'h6'} variant='h6' sx={{ fontWeight: "400", color: 'applicationTheme.secondaryColor_1' }} className=' capitalize'>
                                                Interest
                                            </Typography>
                                        </TableCell>
                                        <TableCell width={'150px'} sx={{ borderBottomColor: "applicationTheme.primaryColor_2" }}>
                                            <Typography component={'h6'} variant='h6' sx={{ fontWeight: "300", color: 'applicationTheme.secondaryColor_1', display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }} className=' capitalize'>
                                                {Math.sign(interest) !== -1 ? <MovingIcon /> : <TrendingDownIcon sx={{ fontSize: "25px", color: "#ff4d4d" }} />} {interest}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={'120px'} sx={{ borderBottom: "none" }}>
                                            <Typography component={'h6'} variant='h6' sx={{ fontWeight: "400", color: 'applicationTheme.secondaryColor_1' }} className=' capitalize'>
                                                Month
                                            </Typography>
                                        </TableCell>
                                        <TableCell width={'150px'} sx={{ borderBottom: "none" }}>
                                            <Typography component={'p'} variant='p' sx={{ fontWeight: "300", color: 'applicationTheme.secondaryColor_1', display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }} className=' capitalize'>
                                                {month} months ~ exact duration({calculateExactTimePeriod(customer.Date)})
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell width={'120px'} sx={{ borderBottom: "none" }}>
                                            <Typography component={'h6'} variant='h6' sx={{ fontWeight: "400", color: 'applicationTheme.secondaryColor_1' }} className=' capitalize'>
                                                Amount to be Paid
                                            </Typography>
                                        </TableCell>
                                        <TableCell width={'150px'} sx={{ borderBottom: "none" }}>
                                            <Typography component={'p'} variant='p' sx={{ fontWeight: "300", color: 'applicationTheme.secondaryColor_1', display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }} className=' capitalize'>
                                                {Math.sign(customer.Amount + interest) !== -1 ? <MovingIcon /> : <TrendingDownIcon sx={{ fontSize: "25px", color: "#ff4d4d" }} />}  {customer.Amount + interest}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    {/* <TableRow>
                                        <TableCell width={'120px'} sx={{ borderBottom: "none" }}>
                                            <Typography component={'h6'} variant='h6' sx={{ fontWeight: "400", color: 'applicationTheme.secondaryColor_1' }} className=' capitalize'>
                                                Exact Time Period
                                            </Typography>
                                        </TableCell>
                                        <TableCell width={'150px'} sx={{ borderBottom: "none" }}>
                                            <Typography component={'p'} variant='p' sx={{ fontWeight: "300", color: 'applicationTheme.secondaryColor_1', display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }} className=' capitalize'>
                                                {calculateExactTimePeriod(customer.Date)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow> */}
                                </TableBody>
                            </Table>
                        </Stack>
                    </Stack>
                </Grid>

            </Grid>
        </>
    );
};

export default ViewPage;
