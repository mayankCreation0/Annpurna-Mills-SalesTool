import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { loginApi } from '../Api/Apis';
import { CircularProgress, IconButton, InputAdornment, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Logobg from '../Assets/login_bg.jpg';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://annpurna-mills.vercel.app/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const logoInInputFieldTheme = {
    "& .MuiOutlinedInput-root": {
        color: { xs: "white", lg: "black" },
        // Class for the border around the input field
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: { xs: "white", lg: "black" },
        },
        "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: { xs: "white", lg: "black" },
            },

        },
        "&:hover:not(.Mui-focused)": {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: { xs: "white", lg: "black" },
            },
        },
    },
    "& .MuiInputLabel-outlined": {
        color: { xs: "white", lg: "black" },

        "&.Mui-focused": {
            color: { xs: "white", lg: "black" },
        }
    }
}

export default function LoginPage() {
    const [showPassword ,setShowPassword] = React.useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(state => state.loading)


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

        <Grid container sx={{ height: '100vh', width: "100%" }}>
            <Grid item display={{ xs: "none", lg: "block" }} lg={6} xl={7}>
                <img src={Logobg} alt="" className='logoBg' />
            </Grid>

            <Grid item xs={12} lg={6} xl={5} sx={{ width: "100%", height: "100%", bgcolor: { xs: "none", lg: "applicationTheme.bgColor" }, backgroundImage: { xs: `url(https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`, lg: "none" }, backgroundAttachment: { xs: "fixed", lg: "initial" }, backgroundRepeat: { xs: "no-repeat", lg: "inherit" }, backgroundPosition: { xs: 'center' }, backgroundSize: { xs: 'cover' } }}>
                <Stack flexDirection={'column'} justifyContent={'space-around'} alignItems={'center'} width={"100%"} height={'100%'}>

                    {/*  <img src={Logo} alt="" className='' width={150}  />
 */}
                    <Box display={{ xs: "none", lg: "block" }}>

                    </Box>

                    <Container component="main" sx={{
                        bgcolor: { xs: "rgba( 255, 255, 255, 0.1 )", lg: "transparent" },

                        backdropFilter: "blur( 50px )",

                        borderRadius: "10px",

                        width: "auto"

                    }}>
                        <Box
                            sx={{

                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >


                            <Typography component="h1" variant="h3" sx={{ color: { xs: "white", lg: "black" }, mt: 3 }}>
                                Log In
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mb: 6 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    sx={{
                                        ...logoInInputFieldTheme
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    sx={{
                                        ...logoInInputFieldTheme
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />


                                <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "nowrap" }}>

                                    <FormControlLabel
                                        control={<Checkbox value="remember" sx={{ color: { xs: "applicationTheme.textColor2", lg: "applicationTheme.textColor" } }} />}
                                        label="Remember me"
                                        sx={{ textAlign: "left", padding: "0px", height: "auto", margin: "0px", whiteSpace: "nowrap", color: { xs: "applicationTheme.textColor2", lg: "applicationTheme.textColor" } }}
                                    />


                                    <Link href="#" sx={{ color: "applicationTheme.primary", fontSize: "15px", fontWeight: "500" }}>
                                        Forgot password?
                                    </Link>


                                </Box>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        bgcolor: "applicationTheme.main",
                                        mb: 2,
                                        padding: "15px",
                                        color: "white",
                                        borderRadius: "30px",
                                        fontSize: "15px",
                                        transition: "background-color 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: "applicationTheme.primary"
                                        },
                                        "&:disabled": {
                                            backgroundColor: "applicationTheme.main",
                                            opacity: 0.7
                                        }
                                    }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Sign In'}
                                </Button>



                                <Typography component="p" variant="p" sx={{ color: { xs: "applicationTheme.textColor2", lg: "applicationTheme.textColor" } }}>
                                    Don't have an account?  <Link href="#" sx={{ color: "applicationTheme.primary", fontSize: "15px", fontWeight: "500" }}> Sign Up </Link>

                                </Typography>

                            </Box>
                        </Box>

                    </Container>

                    <Copyright display={{ xs: "none", lg: "block" }} sx={{ mt: 8, mb: 4 }} />
                </Stack>
            </Grid>
        </Grid>

    );
}