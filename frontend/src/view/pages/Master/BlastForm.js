import React, { Component , useEffect, useState} from 'react';
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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const blastPatternList = [
    {
        id:1,
        label: 'Wedge, plough or V-cut'
    }, 
    {
        id:2,
        label: 'Pyramid or Diamond Cut'
    },
    {
        id:3,
        label: 'Drag and fan cuts'
    },
    {
        id:4,
        label: 'Breast Cut or Slashing'
    },
    {
        id:5,
        label: 'Burn or parallel-hole cuts'
    },
    {
        id:6,
        label: 'Others'
    }
]

const delayTypeList = [
    {
        id:1,
        label: '17ms (hdd)'
    },
    {
        id:2,
        label: '25ms'
    },
    {
        id:3,
        label: '42ms'
    },
    {
        id:4,
        label: '76ms'
    },
    {
        id:5,
        label: '200ms (Bottom DTH)'
    },
]

const explosiveChargeList = [
    {
        id:1,
        label: 'SME/SMS'
    },
    {
        id:2,
        label: 'Boost'
    },
    {
        id:3,
        label: 'Column'
    },
    {
        id:4,
        label: 'Anfo'
    }
]

const drillingPatternList = [
    {
        id:1,
        label: 'Square Pattern'
    },
    {
        id:2,
        label: 'Rectangle Pattern'
    },
    {
        id:3,
        label: 'Staggered Pattern'
    }
]

function BlastForm(props) {
    console.log(props)
    const update = props.formState === 'Edit' ? true :false
    const editData = props.editData;
    const fetchCallBack = props.callback;
    const [chargeId, setChargeId] = useState('');
    const [blastId, setBlastID] = useState('');
    const [numberOfHoles, setNumberOfHoles] = useState('');
    const [blastPattern, setBlastPattern] = useState('');
    const [mineNo, setMineNo] = useState('');
    const [blastingIncharge, setBlastingIncharge] = useState('');
    const [spacing, setSpacing] = useState('')
    const [burden, setBurden] = useState('');
    const [chargeData,setCharge ]= useState(props.chargeData);
    const [rowData, setRow]= useState(props.rowData);
    const [bench, setBench] = useState('');
    const [delayType, setDelayType] = useState('');
    const [chargePerDelay, setChargePerDelay] = useState('');
    const [comment, setComment] = useState('')
    const [show, setShow] = useState(false)
    const [blastTimestamp, setBlastTimestamp] = useState(new Date());
    const navigate = useNavigate();

    const [depthOfHoles, setDepthOfHoles] = useState('');
    const [heightOfBench, setHeightOfBench] = useState('');
    const [subgradeDrilling, setSubgradeDrilling] = useState('');

    const [explosiveCharge, setExplosiveCharge] = useState('');
    const [drillingPattern, setDrillingPattern] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [stemmingLength, setStemmingLength] = useState('');
    const [numberOfDetonators, setNumberOfDetonators] = useState('');
    const [numberOfNonels, setNumberOfNonels] = useState('');

    const [value, setValue] = React.useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const onCreate= () =>{
        const newdata = {
            "blast_id": blastId,
            "number_of_holes": numberOfHoles,
            "spacing":spacing,
            "blast_pattern": blastPattern,
            "mine_reg_no": mineNo,
            "blasting_incharge": blastingIncharge,
            "burden": burden,
            "depth_of_holes": depthOfHoles,
            "stemming_length": stemmingLength,
            "number_of_detonators": numberOfDetonators,
            "number_of_nonels":numberOfNonels,
            "bench":bench,
            "delay_type" : delayType,
            "charge_per_delay": chargePerDelay,
            "latitude":latitude,
            "longitude":longitude,
            "explosive_charge":explosiveCharge,
            "drilling_pattern": drillingPattern,
            "blast_date_time":blastTimestamp
        }
        const url = `/addBlastInfo`;
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

    const handleMineChange = (event) => {
        setMineNo(event.target.value);
    };

    const handleChargeChange = (event) => {
        setChargeId(event.target.value);
    };

    const handleBlastPatternChange = (e) => {
        if(e.target.value == "Others"){
            setShow(true)
        }else{
            setShow(false)
        }
        setBlastPattern(e.target.value)
    }

    const handleDelayType = (e) => {
        setDelayType(e.target.value)
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
    
    const handleHeightOfBench = (val) => {
        setHeightOfBench(val)
        setDepthOfHoles(parseInt(val)+parseInt(subgradeDrilling))
    }

    const handleSubgradeDrilling = (val) => {
        setSubgradeDrilling(val)
        setDepthOfHoles(parseInt(val)+parseInt(heightOfBench))
    }

    const handleExplosiveCharge = (e) => {
        setExplosiveCharge(e.target.value)
    }

    const handleDrillingPattern = (e) => {
        setDrillingPattern(e.target.value)
    }
    

    return (
            <Box>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={4}>
                        <label>Blast Number <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.blast_id} /> :  <TextField fullWidth size='small' value={blastId} onChange={(e)=>setBlastID(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>No. of Holes <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.number_of_holes} /> :  <TextField fullWidth size='small' value={numberOfHoles} onChange={(e)=>setNumberOfHoles(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Spacing <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.spacing} /> :  <TextField fullWidth size='small' value={spacing} onChange={(e)=>setSpacing(e.target.value)}/> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={4}>
                        <label>Blast Pattern <span style={{color: 'red'}}> *</span></label>
                        <FormControl fullWidth>
                        {update ?<Select size="small" labelId="demo-simple-select-label" placeholder="Blast Pattern" id="demo-simple-select" value={blastPattern} onChange={handleBlastPatternChange} >
                            { blastPatternList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>
                            :<Select size="small" labelId="demo-simple-select-label" placeholder="Blast Pattern" id="demo-simple-select" defaultValue={editData.blast_pattern} value={blastPattern} onChange={handleBlastPatternChange} >
                            { blastPatternList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <label>Blasting Incharge <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.blasting_incharge}/> :  <TextField fullWidth size='small' value={blastingIncharge} onChange={(e)=>setBlastingIncharge(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Burden <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.burden}/> :  <TextField fullWidth size='small' value={burden} onChange={(e)=>setBurden(e.target.value)}/> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={6}>
                        {show ?
                        <>
                        <label>Tell us more about your Blast Pattern <span style={{color: 'red'}}> *</span></label>
                        <TextField fullWidth size='small' value={comment} onChange={(e)=>setComment(e.target.value)}/>
                        </> : ""}
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={4}>
                        <label>Depth of Holes <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth disabled={true} size='small' value={editData.depth_of_holes} /> :  <TextField fullWidth size='small' value={depthOfHoles} disabled={true} /> }
                    </Grid>
                    <Grid item xs={3.8}>
                        <label>Height of Bench <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth type="number" size='small' value={editData.height_of_bench} /> :  <TextField fullWidth type="number" size='small' value={heightOfBench} onChange={(e)=>handleHeightOfBench(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={0.4} style={{justifyItems:'center', display:'inline-grid', marginTop:'1rem'}}>
                        <span style={{paddingTop:'10px'}}> + </span>
                    </Grid>
                    <Grid item xs={3.8}>
                        <label>Subgrade Drilling <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth type="number" size='small' value={editData.subgrade_drilling} /> :  <TextField fullWidth type="number" size='small' value={subgradeDrilling} onChange={(e)=>handleSubgradeDrilling(e.target.value)} /> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={4}>
                        <label>Stemming Length <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth type="number" size='small' value={editData.stemming_length} /> :  <TextField fullWidth type="number" size='small' value={stemmingLength} onChange={(e)=>setStemmingLength(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>No. of Detonators <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth type="number" size='small' value={editData.number_of_detonators} /> :  <TextField fullWidth type="number" size='small' value={numberOfDetonators} onChange={(e)=>setNumberOfDetonators(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>No. of Nonels / No. of Decord <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth type="number" size='small' value={editData.number_of_nonels} /> :  <TextField fullWidth type="number" size='small' value={numberOfNonels} onChange={(e)=>setNumberOfNonels(e.target.value)}/> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={4}>
                        <label>Bench <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.bench} /> :  <TextField fullWidth size='small' value={bench} onChange={(e)=>setBench(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                    <label>Delay Type <span style={{color: 'red'}}> *</span></label>
                        <FormControl fullWidth>
                        {update ?<Select size="small" labelId="demo-simple-select-label" placeholder="Delay Type" id="demo-simple-select" value={delayType} onChange={handleDelayType} >
                            { delayTypeList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>
                            :<Select size="small" labelId="demo-simple-select-label" placeholder="Blast Pattern" id="demo-simple-select" defaultValue={editData.delay_type} value={delayType} onChange={handleDelayType} >
                            { delayTypeList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <label>Charge per Delay <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.charge_per_delay} /> :  <TextField fullWidth size='small' type="number" value={chargePerDelay} onChange={(e)=>setChargePerDelay(e.target.value)} /> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={6}>
                        <label>Latitude of Blast Location <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth type="number" size='small' value={editData.latitude} /> :  <TextField fullWidth type="number" size='small' value={latitude} onChange={(e)=>setLatitude(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={6}>
                        <label>Longitude of Blast Location <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth type="number" size='small' value={editData.longitude} /> :  <TextField fullWidth type="number" size='small' value={longitude} onChange={(e)=>setLongitude(e.target.value)} /> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={6}>
                        <label>Explosive Charge per hole (kg) <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.explosive_charge}/> : 
                        <FormControl fullWidth>
                        <Select size="small" labelId="demo-simple-select-label" id="demo-simple-select"  placeholder="Explosive Charge" value={explosiveCharge} onChange={handleExplosiveCharge} >
                            {explosiveChargeList.length > 0 ? explosiveChargeList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>):''}
                        </Select>
                        </FormControl> }
                    </Grid>
                    <Grid item xs={6}>
                        <label>Drilling Pattern <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.drilling_pattern}/> : 
                        <FormControl fullWidth>
                        <Select size="small" labelId="demo-simple-select-label" id="demo-simple-select"  placeholder="Drilling Pattern" value={drillingPattern} onChange={handleDrillingPattern} >
                            {drillingPatternList.length > 0 ? drillingPatternList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>):''}
                        </Select>
                        </FormControl> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                <Grid item xs={6}>
                        <label>Mine Register No <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.mine_reg_no}/> : 
                        <FormControl fullWidth>
                        <Select size="small" labelId="demo-simple-select-label" id="demo-simple-select"  placeholder="Driver" value={mineNo} onChange={handleMineChange} >
                            {rowData.length > 0 ? rowData.map(row => <MenuItem key={row.mine_reg_no} value={row.mine_reg_no}>{row.mine_reg_no}</MenuItem>):''}
                        </Select>
                        </FormControl> }
                    </Grid>
                    <Grid item xs={6}>
                    <label>Blast Date & Time <span style={{color: 'red'}}> *</span></label>
                        {update ? 
                        <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                        <DateTimePicker size="small" value={blastTimestamp} onChange={(newValue) =>setBlastTimestamp(newValue)} renderInput={(params) => <TextField size="small" {...params} helperText={null} style={{backgroundColor:"#fff"}}/>} /></LocalizationProvider>:  
                        <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                        <DateTimePicker size="small" value={blastTimestamp} onChange={(newValue) =>setBlastTimestamp(newValue)} renderInput={(params) => <TextField size="small" {...params} helperText={null} style={{backgroundColor:"#fff"}}/>} /></LocalizationProvider>
                        }
                    </Grid>
                </Grid>
                {update ? <Button color="primary" variant="contained" style={{marginLeft: '2rem', marginTop: '1rem',marginBottom: '1rem', color: '#fff', background: 'linear-gradient(to right, #000046, #1cb5e0)' , borderRadius: '20px'}} >Save</Button>:
                <Button color="primary" variant="contained" style={{marginLeft: '2rem', marginTop: '1rem',marginBottom: '1rem', color: '#fff', background: 'linear-gradient(to right, #000046, #1cb5e0)' , borderRadius: '20px'}} onClick={onCreate}>Submit</Button>}
        </Box>    
    );
}

export default BlastForm;