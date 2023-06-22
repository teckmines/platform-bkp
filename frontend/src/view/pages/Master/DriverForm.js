import React, { Component , useState} from 'react';
import Box from '@mui/material/Box';
import Sidebar from '../../../Layout/SideBar';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate,Navigate, withRouter } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { Button } from '@mui/material';
import { CSVLink } from "react-csv";
import { GetApp } from '@mui/icons-material';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PublishIcon from '@mui/icons-material/Publish';


function DriverForm(props) {
    console.log(props)
    const navigate = useNavigate();
    const update = props.formState === 'Edit' ? true :false
    const editData = props.editData;
    const fetchCallBack = props.callback;
    const [chargeId, setChargeId] = useState('');
    const [totalCharge, setTotalCharge] = useState('');
    const [primeNo, setPrimeNo] = useState('');
    const [angle, setAngle] = useState('');
    const [azimuth, setAzimuth] = useState('');
    const [subdrilling, setSubdrilling] = useState(false);
    const [water, setWater] = useState(false);
    const [detoNo, setDetoNo] = useState('');
    const [chargeDensity, setChargeDensity] = useState('');
    const [length, setLength] = useState('');
    const [stemming, setStemming] = useState('');
    const [diameter, setDiameter] = useState('');
    const hiddenFileInput = React.useRef(null);


    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const onCreate= () =>{
        const newdata = {
            "driving_license": totalCharge,
            "fullname": chargeId,
            "address": primeNo,
            image: detoNo
        }
        const url = `/addDriverInfo`;
        axios({
          method: 'POST',
          url: url,
          data: newdata
        }).then(response => {
            fetchCallBack();
        }).catch(error => {
          console.log(error)
          fetchCallBack();
        })
    }


    const onBtnUpload = (data) => {
        const fileUploaded = data.target.files[0];
        let formData = new FormData();
        formData.append("file", fileUploaded);
        let reader = new FileReader();
        reader.readAsDataURL(fileUploaded);
        reader.onload = function () {
            setDetoNo(reader.result)
        };
        // setDetoNo(fileUploaded);
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
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={6}>
                        <label>Fullname <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.fullname} /> :  <TextField fullWidth size='small' value={chargeId} onChange={(e)=>setChargeId(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={6}>
                        <label>Driving License  <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.driving_license} /> :  <TextField fullWidth size='small' value={totalCharge} onChange={(e)=>setTotalCharge(e.target.value)} /> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={6}>
                        <label>Address <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.address}/> :  <TextField fullWidth size='small' value={primeNo} onChange={(e)=>setPrimeNo(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={6}>
                        <label>Image <span style={{color: 'red'}}> *</span></label>
                            <input type="file" accept=".jpeg" ref={hiddenFileInput} hidden onChange={onBtnUpload} onClick={(event)=> { event.target.value = null }} /> <Button variant="contained" style={{background:"#00b900",marginLeft:"4.5rem"}} startIcon={<PublishIcon />} onClick={handleClick} >Upload Image</Button>
                         {/* <TextField fullWidth size='small' value={chargeDensity} onChange={(e)=>setChargeDensity(e.target.value)} />  */}
                    </Grid>
                </Grid>
                {update ? <Button color="primary" variant="contained" style={{marginLeft: '2rem', marginTop: '1rem',marginBottom: '1rem', color: '#fff', background: 'linear-gradient(to right, #000046, #1cb5e0)' , borderRadius: '20px'}} >Save</Button>:
                <Button color="primary" variant="contained" style={{marginLeft: '2rem', marginTop: '1rem',marginBottom: '1rem', color: '#fff', background: 'linear-gradient(to right, #000046, #1cb5e0)' , borderRadius: '20px'}} onClick={onCreate}>Submit</Button>}
        </Box>    
    );
}

export default DriverForm;