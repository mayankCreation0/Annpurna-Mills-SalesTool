import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Grid,Box, Stack, Button, TextField, ToggleButtonGroup, ToggleButton, Table, TableBody, TableRow, TableCell, Autocomplete } from '@mui/material';
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
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const ViewPage = () => {
    const [customer, setCustomer] = useState(null);
    const [interest, setInterest] = useState(0);
    const [month, setMonth] = useState(0);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mode = useSelector((state) => state.mode);
    const [isEdit, setIsEdit] = React.useState(false);
    const [isLoanEdit, setIsLoanEdit] = React.useState(false);
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
    
        const years = end.getFullYear() - start.getFullYear();
        const months = end.getMonth() - start.getMonth();
        const days = end.getDate() - start.getDate();
    
        let totalMonths = years * 12 + months;
    
        // Adjust the days to the total months
        if (days > 10) {
            totalMonths += 1;
        }
    
        // Ensure the minimum time period is 1 month
        if (totalMonths < 1) {
            totalMonths = 1;
        }
    
        // Calculate the simple interest for the total months
        const simpleInterest = (principal * monthlyRate * totalMonths) / 100;
    
        // Assuming setMonth and setInterest are defined elsewhere
        setMonth(totalMonths);
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
            <Grid spacing={{xs:'30',lg:'0'}} container sx={{ width: "100%", flexDirection: { xs: 'column-reverse', lg: 'row' } }} className='mt-0 lg:!mt-10 w-full'>
                <Grid item xs={'12'} sm='12' md={11} lg={6} xl={7}>
                    <Box component={'div'} sx={{ padding: "0px 20px" }}>
                        <Stack flexDirection={'row'} justifyContent={"space-between"} alignItems={'center'} className='mb-6 lg:!mb-12'>
                            <Typography component={'h4'} variant='h4' sx={{ fontWeight: "600", color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                {!isEdit ? 'Personal Details :' : 'Edit :'}
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
                                        <Typography component={'label'} variant='p' fontWeight={'700'} sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Name :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Name ? customer.Name : '-'}
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
                                        <Typography component={'label'} variant='p' fontWeight={'700'} sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Gender :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Gender ? customer.Gender : '-'}
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
                                        <Typography component={'label'} variant='p' fontWeight={'700'} sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Address :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Address ? customer.Address : '-'}
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
                                        <Typography component={'label'} variant='p' fontWeight={'700'} sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Phone Number :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.PhoneNumber ?  customer.PhoneNumber : '-'}
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
                                        <Typography component={'label'} variant='p' fontWeight={'700'} sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Date :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Date ? customer.Date.substr(0, 10) : '-'}
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
                                        <Typography component={'label'} variant='p' fontWeight={'700'} sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Remarks :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Remarks ?  customer.Remarks : '-'}
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
                                 

                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={'12'} sm='12' md={11} lg={6} xl={5}>
                    <Stack flexDirection={{ xs: 'column' }} justifyContent={{ xs: 'space-between', md: 'start' }} gap={{ sm: '40px', md: '10px' }} alignItems={{ xs: 'start', sm: 'center', lg: "start" }} component={'div'} sx={{ borderLeftWidth: { xs: 'none', sm: "none", lg: "1px" }, borderLeftStyle: "solid", borderLeftColor: "applicationTheme.primaryColor_2", padding: "0px 0px" , width:"100%"}}>

                        <Box component={'div'} sx={{ display: 'flex', justifyContent: "start", alignItems: "center", gap: "15px", padding:"10px 20px" }} className='mb-5'>
                            
                            <img src={customer.Gender !== 'male' ? FemaleImg : MaleImg} alt='Male' className='h-28 w-28 sm:h-40 sm:w-40 rounded-[50%] ' />
                            <Box component={'div'} sx={{display:'flex', flexDirection:'column', justifyContent:'start', alignItems:'start', gap:'1px'}}>
                                <Typography component={'h4'} variant='h4' sx={{ color: 'applicationTheme.secondaryColor_1', }} className=' capitalize'>
                                    {customer.Name}
                                </Typography>  

                                <Typography component={'p'} variant='p' sx={{ color:  mode === 'light' ? 'black' : 'white', backgroundColor: 'transparent', borderRadius: "30px", width: "fit-content", padding: "5px 0px", textTransform:'lowercase', display:'flex', justifyContent:'center', alignItems:'center', gap: '2px' }} className=' capitalize'>
                                   
                                   <Box component={'span'} sx={{position:'relative', width:'13px', height:'7px'}}>
                                      { customer.Status.toLowerCase() === 'active' ? <Box component={'span'} class="dot active"></Box> : <Box component={'span'} class="dot completed"></Box> }
                                   </Box>

                                    {customer.Status}
                                </Typography>       

                            </Box>
                        </Box>

                        
                        <Box component={'div'} sx={{ padding: "0px 20px" , width:"100%", marginBottom:"30px"}}>
                        <Stack flexDirection={'row'} justifyContent={"space-between"} alignItems={'center'} className='mb-6 lg:!mb-12'>
                            <Typography component={'h4'} variant='h4' sx={{ fontWeight: "600", color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                {!isLoanEdit ? 'Loan Details :' : 'Edit :'}
                            </Typography>

                            <Stack flexDirection={'row'} justifyContent={'start'} alignItems={'center'} gap={'10px'}>
                                {!isLoanEdit && <Button className='flex justify-center items-center gap-2 ] !px-5' onClick={() => setIsLoanEdit(!isLoanEdit)}>
                                    Edit
                                    <CreateIcon sx={{ fontSize: "15px" }} />
                                </Button>}

                                {isLoanEdit &&
                                    <>
                                        <Button sx={{
                                            backgroundColor: "grey", opacity: ".9", color: mode !== 'light' ? 'applicationTheme.secondaryColor_1' : 'applicationTheme.primaryColor_1', "&:hover": {
                                                backgroundColor: "grey", color: mode !== 'light' ? 'applicationTheme.secondaryColor_1' : 'applicationTheme.primaryColor_1'
                                            }
                                        }} className='!bg-opacity-5 !bg-blend-darken !px-5' onClick={() => setIsLoanEdit(!isLoanEdit)}>
                                            Reset
                                        </Button>

                                        <Button sx={{ backgroundColor: "applicationTheme.main" }} className='flex justify-center items-center gap-2 !px-5' onClick={() => setIsLoanEdit(!isLoanEdit)}>
                                            Save
                                            <AutoFixHighIcon sx={{ fontSize: "15px" }} />
                                        </Button>
                                    </>
                                }

                            </Stack>
                        </Stack>
                        <Box component="form" onSubmit={() => handleUpdate()} noValidate>
                            <Grid container rowSpacing={{ xs: !isEdit ? '30px' : '10px', sm: !isEdit ? '30px' : '10px', md: '20px' }} columnSpacing={'20px'}>
                               
                                
                            <Grid item xs={12} sm={6}>
                                    {!isLoanEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='p' fontWeight={'700'} sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Amount :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Amount}
                                        </Typography>
                                    </Stack>}
                                    {isLoanEdit && <TextField
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
                                    {!isLoanEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='p' fontWeight={'700'} sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Rate :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Rate}
                                        </Typography>
                                    </Stack>}
                                    {isLoanEdit && <TextField
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

                                     
                            <Grid item xs={12} sm={6}>
                                    {!isLoanEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='p' fontWeight={'700'} sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Duration :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            -
                                        </Typography>
                                    </Stack>}
                                    {isLoanEdit && <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        
                                        id="duration"
                                        label="Duration"
                                        name="duration"
                                        autoComplete="duration"


                                    />}
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    {!isLoanEdit && <Stack flexDirection={{ xs: 'row', md: 'column' }} justifyContent={"start"} alignItems={{ xs: 'center', md: "start" }} gap={"10px"}>
                                        <Typography component={'label'} variant='p' fontWeight={'700'} sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px" }} >
                                            Category :
                                        </Typography>
                                        <Typography component={'p'} variant='p' sx={{ color: 'applicationTheme.secondaryColor_1', padding: "0px 0px", }} className='capitalize' >
                                            {customer.Category}
                                        </Typography>
                                    </Stack>}
                                    {isLoanEdit &&
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

                            </Grid>
                        </Box>
                       </Box>

                        <Box component={'div'} className='w-full px-5 md:px-1'>
                        
                            <Stack component={'div'} flexDirection={'column'} justifyContent={'start'} alignItems={'start'}  spacing={'20px'} width={{xs:'100%',md:'90%',xl:'60%'}} sx={{padding: "10px 20px", borderWidth:'1px',borderStyle:"solid", borderColor:"applicationTheme.primaryColor_2", marginLeft:{xs:'0px',lg:'10px'} }}>
                                    <Box component={'div'} sx={{width:"100%", display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', }} >
                                             <Typography component={'h6'} variant='h6' sx={{ fontWeight: "400", color: 'applicationTheme.secondaryColor_1' }} className=' capitalize'>
                                                Interest :
                                            </Typography>
                                            <Typography component={'h6'} variant='h6' sx={{ fontWeight: "300", color: 'applicationTheme.secondaryColor_1', display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }} className=' capitalize'>
                                               {interest}
                                            </Typography>
                                    </Box>
                                    <Stack flexDirection={'column'} justifyContent={'start'} alignItems={'end'} width={'100%'} spacing={'10px'}>

                                        <Box component={'div'} sx={{width:"100%", display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', bgcolor: customer.Status.toLowerCase() === 'active' ? 'transparent' :'#ffff99', padding: customer.Status.toLowerCase() !== 'active' && '5px 10px' }} >
                                                <Typography component={'h6'} variant='h6' sx={{ fontWeight: "500", color:  customer.Status.toLowerCase() === 'active'  ?  'applicationTheme.secondaryColor_1' : 'black' }} className=' capitalize'>
                                                { customer.Status.toLowerCase() === 'active' ?  'Amount to be Paid :' : 'Paid :' }
                                                </Typography>
                                                <Typography component={'h6'} variant='h6' sx={{ fontWeight: "500", color: customer.Status.toLowerCase() === 'active'  ?  'applicationTheme.secondaryColor_1' : 'black', display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }} className=' capitalize'>
                                                <CurrencyRupeeIcon sx={{fontSize:'18px'}}/>  {customer.Amount + interest}
                                                </Typography>
                                        </Box>

                              {customer.Status.toLowerCase() === 'active'  &&  <Button className='flex justify-center items-center !px-5'>
                                            Mark as Paid
                                        </Button> }




                                    </Stack>
                                  

                            </Stack>


                            </Box>
 {/*                         <Stack display={{ xs: 'none', sm: 'flex' }} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'10px'} className='w-fit p-3'>

                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={'120px'} sx={{ borderBottomColor: "applicationTheme.primaryColor_2", borderRightWidth: "1px", borderRightStyle: "solid", borderRightColor: "applicationTheme.primaryColor_2" }}>
                                           
                                        </TableCell>
                                        <TableCell width={'150px'} sx={{ borderBottomColor: "applicationTheme.primaryColor_2" }}>
                                         
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
                        </Stack> */}

                      {/* <Stack display={{ xs: 'flex', sm: 'none' }} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'10px'} className='w-full p-3'>

                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell width={'120px'} sx={{ borderBottomColor: "applicationTheme.primaryColor_2" }}>
                                            <Typography component={'h6'} variant='h6' sx={{ fontWeight: "400", color: ' .secondaryColor_1' }} className=' capitalize'>
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
                                    <TableRow>
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
                                    </TableRow> 
                                </TableBody>
                            </Table>
                        </Stack> */}
                    </Stack>
                </Grid>

            </Grid>
        </>
    );
};

export default ViewPage;
