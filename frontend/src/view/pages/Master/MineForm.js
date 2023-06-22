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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const mineTypeList = [
    {
        id:1,
        label: 'Surface'
    }, 
    {
        id:2,
        label: 'Underground'
    },
    {
        id:3,
        label: 'Undersea'
    },
    {
        id:4,
        label: 'Open-cast'
    }, 
    {
        id:5,
        label: 'Sea Mining'
    },
    {
        id:6,
        label: 'Quarry'
    }
]

const mineMaterialList = [
    {
        id:1,
        label: 'Aggregate'
    }, 
    {
        id:2,
        label: 'Coal'
    },
    {
        id:3,
        label: 'Metal'
    }, 
    {
        id:4,
        label: 'Others'
    }
]

const landTypeList = [
    {
        id:1,
        label: 'Government'
    }, 
    {
        id:2,
        label: 'Private'
    },
    {
        id:3,
        label: 'Forestland'
    }, 
    {
        id:4,
        label: 'Others'
    }
]

const crusherCapacityList = [
    {
        id:1,
        label: 200
    }, 
    {
        id:2,
        label: 3000
    }
]

const crusherTypeList = [
    {
        id:1,
        label: 'Jaw'
    }, 
    {
        id:2,
        label: 'Cone'
    },
    {
        id:3,
        label: 'VSI'
    }, 
    {
        id:4,
        label: 'Impact Crusher'
    }, 
    {
        id:5,
        label: 'Gyratory'
    }
]

const rockTypeList = [
    {
        id:1,
        label: 'Sand'
    }, 
    {
        id:2,
        label: 'Gravel'
    },
    {
        id:3,
        label: 'Crushed Stone'
    }, 
    {
        id:4,
        label: 'Igneous'
    },
    {
        id:4,
        label: 'Sedimentary'
    },
    {
        id:4,
        label: 'Metamorphic'
    }
]

function MineForm(props) {
    const update = props.formState === 'Edit' ? true :false
    const editData = props.editData;
    const fetchCallBack = props.callback;
    const [mineName, setMineName] = useState('');
    const [mineLeasingArea, setMineLeasingArea] = useState('');
    const [mineRegNo, setMineRegNo] = useState('');
    const [surveyNumber, setSurveyNumber] = useState('');
    const [mineRegion, setMineRegion] = useState('');
    const [mineAddress, setMineAddress] = useState('');
    const [mineLat, setMineLat] = useState('');
    const [mineLong, setMineLong] = useState('');
    const [mineDetails, setMineDetails] = useState('');
    const [mineType, setMineType] = useState('');
    const [landType, setLandType] = useState('');
    const [materialQuality, setMaterialQuality] = useState('');
    const [mineMaterial, setMineMaterial] = useState('');
    const [crusherSize, setCrusherSize] = useState('');
    const [leaseValidity, setLeaseValidity] = useState('');
    const [show, setShow] = useState(false);
    const [landShow, setLandShow] = useState(false);
    const [comment, setComment] = useState('');
    const [landComment, setLandComment] = useState('');
    const [rockType, setRockType] = useState('');
    const [crusherType, setCrusherType] = useState('');
    const [crusherCapacity, setCrusherCapacity] = useState('');
    const navigate = useNavigate();

    const onCreate= () =>{
        const newdata = {
            mine_name: mineName,
            leasing_area: mineLeasingArea,
            mine_region: mineRegion,
            mine_address: mineAddress,
            mine_loc_lat: parseFloat(mineLat),
            mine_loc_long: parseFloat(mineLong),
            mine_reg_no: surveyNumber,
            lease_validity: leaseValidity,
            mine_addtnl_dtls: mineDetails,
            user_id: "",
            mine_material: mineMaterial == 'Others' ? comment : mineMaterial,
            land_type:  landType == 'Others' ? landComment : landType,
            mine_type: mineType,
            rock_type: rockType,
            crusher_type: crusherType,
            crusher_capacity: crusherCapacity
        }
        const url = `/addMineInfo`;
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

    const handleMineMaterialChange = (e) => {
        setMineMaterial(e.target.value)
        if(e.target.value == 'Others'){
            setShow(true)
        }else{
            setShow(false)
        }
    }

    const handleLandTypeChange = (e) => {
        setLandType(e.target.value)
        if(e.target.value == 'Others'){
            setLandShow(true)
        }else{
            setLandShow(false)
        }
    }

    const handleMineTypeChange = (e) => {
        setMineType(e.target.value)
    }

    const handleRockTypeChange = (e) => {
        setRockType(e.target.value)
    }

    const handleCrusherTypeChange = (e) => {
        setCrusherType(e.target.value)
    }

    const handleCrusherCapacityChange = (e) => {
        setCrusherCapacity(e.target.value)
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
                    <Grid item xs={4}>
                        <label>Mine Name <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.mine_name} /> :  <TextField fullWidth size='small' value={mineName} onChange={(e)=>setMineName(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Mine Leasing Area <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.leasing_area} /> :  <TextField fullWidth size='small' value={mineLeasingArea} onChange={(e)=>setMineLeasingArea(e.target.value)} /> }
                    </Grid>
                    {/* <Grid item xs={4}>
                        <label>Mine Registration No <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.mine_reg_no} /> :  <TextField fullWidth size='small' value={mineRegNo} onChange={(e)=>setMineRegNo(e.target.value)} /> }
                    </Grid> */}
                    <Grid item xs={4}>
                        <label>Mine Region <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.mine_region} /> :  <TextField fullWidth size='small' value={mineRegion} onChange={(e)=>setMineRegion(e.target.value)}/> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={4}>
                        <label>Mine Address <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.mine_address}/> :  <TextField fullWidth size='small' value={mineAddress} onChange={(e)=>setMineAddress(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Mine Location Latitude <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.mine_loc_lat.$numberDecimal}/> :  <TextField fullWidth size='small' value={mineLat} onChange={(e)=>setMineLat(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={4}>
                        <label>Mine Location Longitude <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.mine_loc_long.$numberDecimal}/> :  <TextField fullWidth size='small' value={mineLong} onChange={(e)=>setMineLong(e.target.value)}/> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={6}>
                        <label>Survey Number of Quarry/Mine<span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.survey_number}/> :  <TextField fullWidth size='small' value={surveyNumber} onChange={(e)=>setSurveyNumber(e.target.value)} /> }
                    </Grid>
                    <Grid item xs={6}>
                        <label>Validity of Lease <span style={{color: 'red'}}> *</span></label>
                        {update ? <TextField fullWidth size='small' value={editData.lease_validity}/> :  <TextField fullWidth size='small' value={leaseValidity} onChange={(e)=>setLeaseValidity(e.target.value)} /> }
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                     <Grid item xs={6}>
                     <label>Mine Material <span style={{color: 'red'}}> *</span></label>
                        <FormControl fullWidth>
                        {update ?<Select size="small" labelId="demo-simple-select-label" placeholder="Mine Material" id="demo-simple-select" value={mineMaterial} onChange={handleMineMaterialChange} >
                            { mineMaterialList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>
                            :<Select size="small" labelId="demo-simple-select-label" placeholder="Mine Material" id="demo-simple-select" defaultValue={editData.mine_material} value={mineMaterial} onChange={handleMineMaterialChange} >
                            { mineMaterialList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <label>Type of Land<span style={{color: 'red'}}> *</span></label>
                        <FormControl fullWidth>
                        {update ?<Select size="small" labelId="demo-simple-select-label" placeholder="Type of Land" id="demo-simple-select" value={landType} onChange={handleLandTypeChange} >
                            { landTypeList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>
                            :<Select size="small" labelId="demo-simple-select-label" placeholder="Land Type" id="demo-simple-select" defaultValue={editData.land_type} value={landType} onChange={handleLandTypeChange} >
                            { landTypeList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={6}>
                    {show ?
                        <>
                            <label>Tell us More about the mine material <span style={{color: 'red'}}> *</span></label>
                            <TextField fullWidth size='small' value={comment} onChange={(e)=>setComment(e.target.value)} /> 
                         </>
                    : ""}
                    </Grid>
                    <Grid item xs={6}>
                    {landShow ?
                        <>
                            <label>Tell us More about the Type of land <span style={{color: 'red'}}> *</span></label>
                            <TextField fullWidth size='small' value={landComment} onChange={(e)=>setLandComment(e.target.value)} /> 
                         </>
                    : ""}
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                     <Grid item xs={6}>
                     <label>Mine Type <span style={{color: 'red'}}> *</span></label>
                        <FormControl fullWidth>
                        {update ?<Select size="small" labelId="demo-simple-select-label" placeholder="Mine Type" id="demo-simple-select" value={mineType} onChange={handleMineTypeChange} >
                            { mineTypeList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>
                            :<Select size="small" labelId="demo-simple-select-label" placeholder="Mine Type" id="demo-simple-select" defaultValue={editData.mine_type} value={mineType} onChange={handleMineTypeChange} >
                            { mineTypeList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                     <label>Rock Type <span style={{color: 'red'}}> *</span></label>
                        <FormControl fullWidth>
                        {update ?<Select size="small" labelId="demo-simple-select-label" placeholder="Rock Type" id="demo-simple-select" value={rockType} onChange={handleRockTypeChange} >
                            { rockTypeList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>
                            :<Select size="small" labelId="demo-simple-select-label" placeholder="Rock Type" id="demo-simple-select" defaultValue={editData.rock_type} value={rockType} onChange={handleRockTypeChange} >
                            { rockTypeList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                     <Grid item xs={6}>
                     <label>Crusher Type <span style={{color: 'red'}}> *</span></label>
                        <FormControl fullWidth>
                        {update ?<Select size="small" labelId="demo-simple-select-label" placeholder="Crusher Type" id="demo-simple-select" value={crusherType} onChange={handleCrusherTypeChange} >
                            { crusherTypeList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>
                            :<Select size="small" labelId="demo-simple-select-label" placeholder="Crusher Type" id="demo-simple-select" defaultValue={editData.crusher_type} value={crusherType} onChange={handleCrusherTypeChange} >
                            { crusherTypeList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                     <label>Crusher of Capacity <span style={{color: 'red'}}> *</span></label>
                        <FormControl fullWidth>
                        {update ?<Select size="small" labelId="demo-simple-select-label" placeholder="Crusher Capacity" id="demo-simple-select" value={crusherCapacity} onChange={handleCrusherCapacityChange} >
                            { crusherCapacityList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>
                            :<Select size="small" labelId="demo-simple-select-label" placeholder="Crusher Capacity" id="demo-simple-select" defaultValue={editData.crusher_capacity} value={crusherCapacity} onChange={handleCrusherCapacityChange} >
                            { crusherCapacityList.map(row => <MenuItem key={row.id} value={row.label}>{row.label}</MenuItem>)}
                            </Select>}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={3} className='formtextfield'>
                    <Grid item xs={12}>
                        <label>Mine Additional Details </label>
                        {update ? <TextField fullWidth value={editData.mine_addtnl_dtls} multiline rows={4} /> :  <TextField fullWidth multiline rows={4} value={mineDetails} onChange={(e)=>setMineDetails(e.target.value)}/> }
                    </Grid>
                </Grid>
                {update ? <Button color="primary" variant="contained" style={{marginLeft: '2rem', marginTop: '1rem',marginBottom: '1rem', color: '#fff', background: 'linear-gradient(to right, #000046, #1cb5e0)' , borderRadius: '20px'}} >Save</Button>:
                <Button color="primary" variant="contained" style={{marginLeft: '2rem', marginTop: '1rem',marginBottom: '1rem', color: '#fff', background: 'linear-gradient(to right, #000046, #1cb5e0)' , borderRadius: '20px'}} onClick={onCreate}>Submit</Button>}
        </Box>    
    );
}

export default MineForm;