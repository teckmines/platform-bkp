import React, { Component , useState} from 'react';
import Box from '@mui/material/Box';
import IMG from '../../Assets/Images/Img.jpeg';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    Checkbox,
    TextField,
    FormControlLabel,
    Button,
    Typography
} from '@mui/material';
import LOGO from '../../Assets/Images/Logo.png';
import Slide from '@mui/material/Slide';
import { useNavigate,Navigate, withRouter } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router'

const myStyle={
    backgroundImage: `url(${IMG})`,
    height:'100vh',
    width: 'auto',
    // filter: 'blur(2px)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

function Login() {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginDetails, setLoginDetails] = useState([]);
    const loggedInUser = localStorage.getItem("userDetails");

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    React.useEffect(() => {
        console.log(loggedInUser)
    }, []);

    const routeChange = () =>{
        const newdata = {
            email: email,
            password: password
        }
        const url = `/users/login`;
        axios({
          method: 'POST',
          url: url,
          data: newdata
        }).then(response => {
            console.log(response.data)
            setLoginDetails(response.data);
            localStorage.setItem('userDetails', response.data.token)
            if(response.data.status === "SUCCESS"){
                navigate('/dashboard')
                window.location.reload()
            }else{
                navigate('/login')
            }
        }).catch(error => {
          console.log(error)
        })
    }

    return (
    <Box>
        <Box style={myStyle}></Box>
        <Slide direction="down" in={true} >
            <Paper className='logindiv'>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <img src={LOGO} variant='h3' className='logoimage'/>
                    </Grid>
                    <Grid item xs={12}>
                        <label className='textalign'>Email Address </label>
                        <TextField fullWidth placeholder="username@address.com" type={'email'} value={email} onChange={(e)=> setEmail(e.target.value)} className="inputRounded"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <label className='textalign'>Password </label>
                        <TextField fullWidth placeholder="Enter your password" type={'password'} value={password} onChange={(e)=> setPassword(e.target.value)} className="inputRounded"></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel className='textalign' control={<Checkbox
                            checked={checked}
                            onChange={handleChange}
                            label={'Remember Me'}
                            inputProps={{ 'aria-label': 'primary checkbox' }}/>} 
                        label="Remember Me" />
                    </Grid>
                    <Grid item xs={12} sx={{margin: 'auto'}}>
                        <Button className='loginbtn' onClick={routeChange} fullWidth> Sign In </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Slide>
    </Box>
    );
}

export default Login;