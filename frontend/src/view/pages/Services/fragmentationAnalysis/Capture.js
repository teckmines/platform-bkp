import React, { Component , useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate,Navigate, withRouter } from 'react-router-dom';


function Capture() {
       const [value, setValue] = useState("");
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([]);
    const [mine, setMine] = React.useState('');
    const [blastData, setBlastData] = useState([]);
    const [blast, setBlast] = React.useState('');
    const [streamData, setStreamData] = useState([]);
    const IMGURL = `http://${process.env.REACT_APP_DEVICE_MANAGER}/streamer/video_feed`;
    // const navigate = useNavigate();

    const handleChange = (event) => {
        setMine(event.target.value);
        setBlastData(blastData.filter((row)=>row.mine_reg_no === event.target.value))
    };

    const handleBlastChange = (event) => {
        setBlast(event.target.value);
    };

    useEffect(() =>{
        const url = `/getMineInfo`;
        axios.get(url)
        .then(response => {
            setRowData(response.data.data);
        }).catch(error => {
            console.log(error)
        })

        const url1 = `/getBlastInfo`;
        axios.get(url1)
        .then(response => {
        setBlastData(response.data.data);
        }).catch(error => {
        console.log(error)
        })
    },[IMGURL])

    const handleCapture = () => {
        const url = `http://${process.env.REACT_APP_DEVICE_MANAGER}/deviceManager/fragSense/Capture`;
        const newdata = {
            "blastId":blast,
            "mineId": mine,
            "deviceId":1
        }
        axios({
            method: 'POST',
            url: url,
            data: newdata,
          }).then(response => {
              console.log(response);
              setMine('');
              setBlast('');
          }).catch(error => {
            console.log(error)
          })
    }

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
            <Grid item xs={4}></Grid>
            <Grid item xs={2}></Grid>
                    <Grid item xs={5}>
                        <TextField placeholder="Search" className="filledsearch" type="text" variant="outlined" fullWidth size="small" onChange={(e) => setValue(e.target.value)}
                        value={value} InputProps={{ startAdornment: (<InputAdornment position="start"> <SearchIcon /> </InputAdornment>) }} />
                    </Grid>
                    <Grid item xs={1}>
                    <Button color="primary" style={{background:'linear-gradient(to right, #000046, #1cb5e0)',borderRadius: '1rem',color:"#fff"}} onClick={handleLogout}>
                    <LogoutIcon/></Button>
                    </Grid>
        </Grid>
        <Paper className='formpaper'>
        <Grid container spacing={1} style={{background:'#bfe1f3', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', marginLeft: '0.01rem' , width: 'auto'}}>
            <Grid item xs={6}>
                <Typography className='formHeader'>Capture Image
                </Typography>
            </Grid><Grid item xs={9}></Grid>
        </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={4}>
                        <label>Device</label>
                        <TextField fullWidth size='small' value={"1"} disabled />
                    </Grid>
                    <Grid item xs={4}>
                        <label>Mine</label>
                        <FormControl fullWidth>
                            <Select size="small" labelId="demo-simple-select-label" id="demo-simple-select" value={mine} onChange={handleChange} >
                            {rowData.length > 0 ? rowData.map(row => <MenuItem key={row.mine_reg_no} value={row.mine_reg_no}>{row.mine_reg_no}</MenuItem>):''}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <label>Blast</label>
                        <FormControl fullWidth>
                            <Select size="small" labelId="demo-simple-select-label" id="demo-simple-select" value={blast} onChange={handleBlastChange} >
                            {blastData.length > 0 ? blastData.map(row => <MenuItem key={row._id} value={row.blast_id}>{row.blast_id}</MenuItem>):''}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" style={{marginLeft: '2rem', marginTop: '1rem',marginBottom: '1rem', color: '#fff', background: 'linear-gradient(to right, #000046, #1cb5e0)' , borderRadius: '20px'}} onClick={handleCapture} >Capture</Button><br/>
                 <img src={IMGURL} style={{marginLeft: '2rem', marginTop: '1rem',marginBottom: '1rem',marginRight: '2rem', width:'-webkit-fill-available', borderRadius: '20px'}}></img>
        </Paper> 
        </Box>
        </Box>
    );
}

export default Capture;