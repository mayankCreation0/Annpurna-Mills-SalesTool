import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { loginApi } from '../Api/Apis';
import { CircularProgress, IconButton, InputAdornment, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Bg_LgImg from '../Assets/Login_Lg_Bg.jpg';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ThemeToggle from '../Components/ThemeToggle';

function Copyright(props) {
    return (
        <Typography variant="p" {...props} sx={{ color: "applicationTheme.primaryColor_2" }}>
            {'Copyright © '}

            <Link variant='p' href="https://annpurna-mills.vercel.app/" sx={{ color: "applicationTheme.primaryColor_2", textDecoration: "none" }}>
                Annpurna Mills

            </Link> {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function LoginPage() {
    const [showPassword, setShowPassword] = React.useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(state => state.loading);
    // const mode  = useSelector((state) => state.mode);


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const payload = {
            username: data.get('username'),
            password: data.get('password'),
        }
        await loginApi(payload, dispatch, navigate);
    };

    return (

        <Grid container sx={{ height: '100vh', width: "100%", bgcolor: "applicationTheme.primary" }} spacing={0} >
            <Grid item display="block" xs={12} md={6} lg={6} xl={7} className={`h-52 min-[900px]:h-auto relative XsloginBg`}>
                <img src="https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg" alt="" className='h-[100vh] w-full object-fill hidden min-[900px]:block' style={{ background: "radial-gradient(circle, #202047 0, #020917 100%)" }} />

                {/*  <svg width="100%" height="100%" fill='none' id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" style={{fill:`${ mode === 'light' ? '#FFFFFF' : '#191919'}`}} class="transition duration-300 svgWave ease-in-out delay-150 block min-[900px]:hidden ">
                          <path d="M 0,400 L 0,150 C 101.28571428571428,173.67857142857144 202.57142857142856,197.35714285714286 324,184 C 445.42857142857144,170.64285714285714 587,120.25 711,119 C 835,117.75 941.4285714285716,165.64285714285714 1060,179 C 1178.5714285714284,192.35714285714286 1309.2857142857142,171.17857142857144 1440,150 L 1440,400 L 0,400 Z"  fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path>
                </svg> */}
                {/* { mode === 'light' ? 
                
                    <SvgIcon  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" sx={{fill:"#FFFFFF", width:"100%", height:"fit-content", bgcolor:"transparent", display:{xs:'block',md:'none'} }}  className='block absolute -bottom-[2px]  left-0 z-10'> 
                   <path  d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                   </SvgIcon> 
                
              : 
              
              <SvgIcon  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" sx={{fill:"#191919", width:"100%", height:"fit-content", bgcolor:"transparent", display:{xs:'block',md:'none'} }}  className='block absolute -bottom-[2px]  left-0 z-10'> 
              <path  d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </SvgIcon>

              } */}

                <img src="https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg" alt="img" style={{ height: 'inherit', width: '100vw', background: "radial-gradient(circle, #202047 0, #020917 100%)" }} className="sm:hidden block" />


                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"  className='h-fit bg-green-800 object-cover w-full block min-[900px]:hidden fill-purple-700'>
                  
                </svg> */}
            </Grid>

            <Grid item xs={12} md={6} lg={6} xl={5} className='h-auto min-[900px]:h-[100vh]' sx={{ width: "100%", paddingBottom: { xs: '0px', md: '30px' }, bgcolor: "applicationTheme.primary" }}>
                <ThemeToggle sx={{ position: 'fixed', right: '10px', top: '10px', zIndex: '50' }} />
                <Stack flexDirection={'column'} justifyContent={{ xs: 'start', md: 'space-around' }} alignItems={'center'} width={"100%"} height={'100%'} spacing={{ xs: 10, md: 0 }} className='h-screen'>

                    <Container className='!w-full min-[500px]:!w-[450px]' component="main" sx={{
                        bgcolor: "transparent",
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                            }}
                        >
                            <Typography component="h1" variant="h1" sx={{ color: "applicationTheme.secondaryColor_1", mt: 3, mb: 2, textAlign: "left" }}>
                                Welcome
                                <Typography component="h1" variant="h1" sx={{ color: "applicationTheme.main" }} >
                                    Back.
                                </Typography>
                            </Typography>
                            <Typography component="h5" variant="h5" sx={{ color: "applicationTheme.secondaryColor_1", fontWeight: "400" }}>
                                Log In
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mb: 6 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"

                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff sx={{ color: "applicationTheme.primaryColor_2" }} /> : <Visibility sx={{ color: "applicationTheme.primaryColor_2" }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />


                                <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "nowrap" }}>

                                    <FormControlLabel
                                        control={<Checkbox value="remember" sx={{ color: "applicationTheme.secondaryColor_1" }} />}
                                        label="Remember me"
                                        sx={{ textAlign: "left", padding: "0px", height: "auto", margin: "0px", whiteSpace: "nowrap", color: "applicationTheme.secondaryColor_1" }}
                                    />


                                    <Link href="#" variant='p' sx={{ color: "applicationTheme.main", fontWeight: '500', textDecoration: "none" }}>
                                        Forgot password ?
                                    </Link>


                                </Box>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mb: 3, padding: "12px 0px", fontSize: "19px", }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In'}
                                </Button>



                                <Typography component="p" variant="p" sx={{ color: "applicationTheme.secondaryColor_1", textAlign: 'center' }}>
                                    Don't have an account?  <Link href="#" variant='p' sx={{ color: "applicationTheme.main", fontWeight: "500", textDecoration: "none" }}> Sign Up </Link>
                                </Typography>

                                <Copyright display="flex" style={{margin:"auto",justifyContent:"center",marginTop:'20px'}} />
                            </Box>
                        </Box>

                    </Container>

                    {/* <Box component={'div'} sx={{display:{xs:'block', sm:'none'},height:"10px", width:"100%",}}> </Box> */}
                </Stack>
            </Grid>
        </Grid>

    );
}