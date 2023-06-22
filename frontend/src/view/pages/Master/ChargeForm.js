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

function ChargeForm(props) {
    console.log(props)
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
    const navigate = useNavigate();


    const onCreate= () =>{
        const newdata = {
            "charge_id": chargeId,
            "total_charge_used": totalCharge,
            "number_of_primers": primeNo,
            "number_of_detonators": detoNo,
            "chagre_density": chargeDensity,
            "length": length,
            "stemming": stemming,
            "diameter": diameter,
            "subdrilling": subdrilling,
            "angle": angle,
            "azimuth": azimuth,
            "water_in_hole": water
        }
        const url = `/addChargeInfo`;
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

    const handleChange = (event) => {
        setWater(event.target.value);
    };


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
                    <Grid item xs={4}>
                        <label>Charge ID <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.charge_id} /> :  <TextField fullWidth size='small' value={chargeId} onChange={(e)=>setChargeId(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Total Charge Used <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.total_charge_used} /> :  <TextField fullWidth size='small' value={totalCharge} onChange={(e)=>setTotalCharge(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Number Of Primers <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.number_of_primers} /> :  <TextField fullWidth size='small' value={primeNo} onChange={(e)=>setPrimeNo(e.target.value)}/> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={4}>
                        <label>Number Of Detonators <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.number_of_detonators}/> :  <TextField fullWidth size='small' value={detoNo} onChange={(e)=>setDetoNo(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Chagre Density <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.chagre_density}/> :  <TextField fullWidth size='small' value={chargeDensity} onChange={(e)=>setChargeDensity(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Length <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.length}/> :  <TextField fullWidth size='small' value={length} onChange={(e)=>setLength(e.target.value)}/> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={4}>
                        <label>Stemming <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.stemming}/> :  <TextField fullWidth size='small' value={stemming} onChange={(e)=>setStemming(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Diameter <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.diameter}/> :  <TextField fullWidth size='small' value={diameter} onChange={(e)=>setDiameter(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Subdrilling <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.subdrilling}/> : 
                        <FormControl fullWidth>
                        <Select size="small" labelId="demo-simple-select-label" id="demo-simple-select"  placeholder="Driver" value={subdrilling} onChange={(e)=>setSubdrilling(e.target.value)} >
                            <MenuItem value="false">False</MenuItem>
                            <MenuItem value="true">True</MenuItem>
                        </Select>
                        </FormControl> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={4}>
                        <label>Angle <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.angle}/> :  <TextField fullWidth size='small' value={angle} onChange={(e)=>setAngle(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Azimuth <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.azimuth}/> :  <TextField fullWidth size='small' value={azimuth} onChange={(e)=>setAzimuth(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Water in Hole <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.water_in_hole}/> :  
                        <FormControl fullWidth>
                        <Select size="small" labelId="demo-simple-select-label" id="demo-simple-select"  placeholder="Driver" value={water} onChange={(e)=>setWater(e.target.value)} >
                            <MenuItem value="false">False</MenuItem>
                            <MenuItem value="true">True</MenuItem>
                        </Select>
                        </FormControl> }
                    </Grid>
                </Grid>
                {update ? <Button color="primary" variant="contained" style={{marginLeft: '2rem', marginTop: '1rem',marginBottom: '1rem', color: '#fff', background: 'linear-gradient(to right, #000046, #1cb5e0)' , borderRadius: '20px'}} >Save</Button>:
                <Button color="primary" variant="contained" style={{marginLeft: '2rem', marginTop: '1rem',marginBottom: '1rem', color: '#fff', background: 'linear-gradient(to right, #000046, #1cb5e0)' , borderRadius: '20px'}} onClick={onCreate}>Submit</Button>}
        </Box>    
    );
}

export default ChargeForm;