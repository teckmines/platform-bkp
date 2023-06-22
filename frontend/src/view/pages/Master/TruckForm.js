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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const rowData = [
    {
        volume: 161.28,
        label : '7 L x 4.8 W x 4.8 H'
    },
    {
        volume: 184.32,
        label : '8 L x 4.8 W x 4.8 H'
    },
    {
        volume: 247.5,
        label : '9 L x 5.5 W x 5 H'
    },
    {
        volume: 546,
        label : '14 L x 6 W x 6.5 H'
    },
    {
        volume: 714,
        label : '17 L x 6 W x 7 H'
    },
    {
        volume: 931,
        label : '19 L x 7 W x 7 H'
    },
    {
        volume: 161.28,
        label : '22 L x 7.5 W x 7 H'
    },
    {
        volume: 1155,
        label : '17.5 L x 7 W x 7 H'
    },
    {
        volume: 857.5,
        label : '21 L x 7.2 W x 7 H'
    },
    {
        volume: 1058.4,
        label : '24 L x 7.3 W x 7 H'
    },
    {
        volume: 1226.4,
        label : '24 L x 7.3 W x 7 H'
    },
    {
        volume: 1528.8,
        label : '28 L x 7.8 W x 7 H'
    },
    {
        volume: 1280,
        label : '20 L x 8 W x 8 H'
    },
    {
        volume: 2048,
        label : '32 L x 8 W x 8 H'
    },
    {
        volume: 2560,
        label : '40 L x 8 W x 8 H'
    },


]

function TruckForm(props) {
    const update = props.formState === 'Edit' ? true :false
    const editData = props.editData;
    const editVolume = props.formState === 'Edit'
    const fetchCallBack = props.callback;
    const [truckNumber, setTruckNumber] = useState('');
    const [truckBrand, setTruckBrand] = useState('');
    const [truckModel, setTruckModel] = useState('');
    const [truckOwner, setTruckOwner] = useState('');
    const [contractorCompany, setContractorCompany] = useState('');
    const [contractorPIC, setContractorPIC] = useState('');
    const [contractorAddress, setContractorAddress] = useState('');
    const [contractorGSTIN, setContractorGSTIN] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [RFIDNO, setRFIDNO] = useState(null);
    const [Remarks, setRemarks] = useState('');
    const [underload, setUnderLoad] = useState('');
    const [overload, setOverload] = useState('');
    const [cutoffVolume, setCutoffVolume] = useState('');
    const [size, setSize] = useState('');
    const [volume, setVolume] = useState('')
    const navigate = useNavigate();
    


    const onCreate= () =>{
        const newdata = {
            rfid_tag_no: RFIDNO,
            truck_number: truckNumber,
            truck_brand: truckBrand,
            truck_model: truckModel,
            truck_owner: truckOwner,
            contractor_company: contractorCompany,
            contractor_pic: contractorPIC,
            contractor_address: contractorAddress,
            contractor_gstin: contractorGSTIN,
            contract_start_date: startDate,
            contract_end_date: endDate,
            remarks: Remarks,
            user_id: "",
            corresponding_volume: volume,
            cutoff_value: parseFloat(cutoffVolume)
        }
        const url = `/addTruckInfo`;
        axios({
          method: 'POST',
          url: url,
          data: newdata
        }).then(response => {
            fetchCallBack();
        }).catch(error => {
          console.log(error)
        })
    }


    const handleTruckSizeChange = (event) => {
        // rowData.filter((obj) => obj.volume == editData.cutoff_volume)[0]['label']
        setVolume(rowData.filter((obj) => obj.label == event.target.value)[0]['volume'])
        setSize(event.target.value);
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
                        <label>Truck Number <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.truck_number} /> :  <TextField fullWidth size='small' value={truckNumber} onChange={(e)=>setTruckNumber(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Truck Brand <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.truck_brand} /> :  <TextField fullWidth size='small' value={truckBrand} onChange={(e)=>setTruckBrand(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Truck Model <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.truck_model}/> :  <TextField fullWidth size='small' value={truckModel} onChange={(e)=>setTruckModel(e.target.value)} /> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={4}>
                        <label>Truck Owner <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.truck_owner}/> :  <TextField fullWidth size='small' value={truckOwner} onChange={(e)=>setTruckOwner(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Contractor Company <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.contractor_company}/> :  <TextField fullWidth size='small' value={contractorCompany} onChange={(e)=>setContractorCompany(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Contractor PIC <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.contractor_pic}/> :  <TextField fullWidth size='small' value={contractorPIC} onChange={(e)=>setContractorPIC(e.target.value)} /> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={8}>
                        <label>Contractor Address <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.contractor_address}/> :  <TextField fullWidth size='small' value={contractorAddress} onChange={(e)=>setContractorAddress(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Contractor GSTIN <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.contractor_gstin}/> :  <TextField fullWidth size='small' value={contractorGSTIN} onChange={(e)=>setContractorGSTIN(e.target.value)} /> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    {/* <Grid item xs={6}>
                        <label>Overload Limit <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.overload_limit}/> :  <TextField fullWidth size='small' value={overload} onChange={(e)=>setOverload(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={6}>
                        <label>Underload Limit <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.underload_limit}/> :  <TextField fullWidth size='small' value={underload} onChange={(e)=>setUnderLoad(e.target.value)} /> }
                    </Grid> */}
                     <Grid item xs={6}>
                        <label>Truck Size <span style={{color: 'red'}}> *</span></label>
                        <FormControl fullWidth>
                        {update ?<Select size="small" labelId="demo-simple-select-label" placeholder="Truck Size" id="demo-simple-select" value={size} onChange={handleTruckSizeChange} >
                            { rowData.map(row => <MenuItem key={row.volume} value={row.label}>{row.label}</MenuItem>)}
                            </Select>
                            :<Select size="small" labelId="demo-simple-select-label" placeholder="Truck Size" id="demo-simple-select" defaultValue={editVolume} value={size} onChange={handleTruckSizeChange} >
                            { rowData.map(row => <MenuItem key={row.volume} value={row.label}>{row.label}</MenuItem>)}
                            </Select>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <label>Cutoff Volume <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' type="number"  value={editData.cutoff_value.$numberDecimal}/> :  <TextField fullWidth size='small' type="number"  value={cutoffVolume} onChange={(e)=>setCutoffVolume(e.target.value)} /> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={4}>
                        <label>Contract Start Date <span style={{color: 'red'}}> *</span></label>
                        {update ? 
                        <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                        <DatePicker size="small" value={editData.contract_start_date} onChange={(newValue) =>setEndDate(newValue)} renderInput={(params) => <TextField size="small" {...params} helperText={null} style={{backgroundColor:"#fff"}}/>} /></LocalizationProvider>:  
                        <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                        <DatePicker size="small" value={startDate} onChange={(newValue) =>setStartDate(newValue)} renderInput={(params) => <TextField size="small" {...params} helperText={null} style={{backgroundColor:"#fff"}}/>} /></LocalizationProvider>
                        }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Contract End Date <span style={{color: 'red'}}> *</span></label>
                        {update ?
                        <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                        <DatePicker size="small"  value={editData.contract_end_date} onChange={(newValue) =>setEndDate(newValue)} renderInput={(params) => <TextField size="small" {...params} helperText={null} style={{backgroundColor:"#fff"}}/>} /></LocalizationProvider>:
                        <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                        <DatePicker size="small" value={endDate} onChange={(newValue) =>setEndDate(newValue)} renderInput={(params) => <TextField size="small" {...params} helperText={null} style={{backgroundColor:"#fff"}}/>} /></LocalizationProvider>
                        }
                    </Grid>
                    <Grid item xs={4}>
                        <label>RFID No <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.rfid_tag_no}/> :  <TextField fullWidth size='small' value={RFIDNO} onChange={(e)=>setRFIDNO(e.target.value)}/> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={12}>
                        <label>Remarks </label>
                        {update ? <TextField fullWidth value={editData.remarks} multiline rows={4} /> :  <TextField fullWidth multiline rows={4} value={Remarks} onChange={(e)=>setRemarks(e.target.value)}/> }
                    </Grid>
                </Grid>
                {update ? <Button color="primary" variant="contained" style={{marginLeft: '2rem', marginTop: '1rem',marginBottom: '1rem', color: '#fff', background: 'linear-gradient(to right, #000046, #1cb5e0)' , borderRadius: '20px'}} >Save</Button>:
                <Button color="primary" variant="contained" style={{marginLeft: '2rem', marginTop: '1rem',marginBottom: '1rem', color: '#fff', background: 'linear-gradient(to right, #000046, #1cb5e0)' , borderRadius: '20px'}} onClick={onCreate}>Submit</Button>}
        </Box>    
    );
}

export default TruckForm;