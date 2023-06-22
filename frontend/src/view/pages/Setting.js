import React, { Component , useState} from 'react';
import Box from '@mui/material/Box';
import Sidebar from '../../Layout/SideBar';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate,Navigate, withRouter } from 'react-router-dom';
import axios from 'axios';

function Setting() {
       const [value, setValue] = useState("");
    const navigate = useNavigate();

 const handleLogout = () =>{
        const url = `/users/logout`
        axios({
          method: 'POST',
          url: url,
          }).then(response => {
            console.log(response);
            localStorage.clear();
            window.location.reload();
            navigate('/login')
          }).catch(error => {
              console.log(error)
          })
      }
    

    return (
        <Box>         
        <Box className="pagebackground">
            <Grid container spacing={1} style={{padding:'2.5rem'}}>
                <Grid item xs={4}>
                    <Typography className='pageHeader'>Profile</Typography>
                </Grid><Grid item xs={3}></Grid>
                <Grid item xs={5}>
                    <TextField placeholder="Search" className="filledsearch" type="text" variant="outlined" fullWidth size="small" onChange={(e) => setValue(e.target.value)}
                    value={value} InputProps={{ startAdornment: (<InputAdornment position="start"> <SearchIcon /> </InputAdornment>) }} />
                </Grid>
            </Grid>
        </Box>
        </Box>
    );
}

export default Setting;