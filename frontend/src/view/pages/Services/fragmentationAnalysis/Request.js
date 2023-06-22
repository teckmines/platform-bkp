import React, { Component , useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Sidebar from '../../../../Layout/SideBar';
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
import IMG from '../../../../Assets/Images/Img.jpeg';
import axios from 'axios';
import RequestForm from './RequestForm';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Request(props) {
       const [value, setValue] = useState("");
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([]);
    const [imgData, setImgData] = useState([]);
    const [requestform, setRequestForm] = useState(false);
    const [eachData, setEachData] = useState([]);
    const [fragId, setFragID] = useState([]);
    const token = props.user;

    const [mineData, setMineData] = useState([]);
    const [mine, setMine] = React.useState('');
    const [blastData, setBlastData] = useState([]);
    const [blast, setBlast] = React.useState('');
    const [blastFilteredData, setBlastFilteredData] = useState([]);

    // useEffect(()=>{
    //     handleRequests();
    // },[token])

    useEffect(() =>{
        const url = `/getMineInfo`;
        axios.get(url)
        .then(response => {
            setMineData(response.data.data);
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
    },[])

    const handleMineChange = (event) => {
        console.log(event.target.value, event)
        setMine(event.target.value);
        setBlastFilteredData(blastData.filter((row)=>row.mine_reg_no === event.target.value))
    };

    const handleBlastChange = (event) => {
        setBlast(event.target.value);
    };

    const handleImageData = (params) => {
        const data = [];
        data.push(params.filter(rows => rows.mine_reg_no == mine).map(newrow => newrow.image_desc))
        const newData = {
            "blastId":blast,
            "mineId": mine,
            "filename": data[0]
        }
        const url=`http://${process.env.REACT_APP_DEVICE_MANAGER}/deviceManager/fragSense/fetch/multiple`;
        axios({
            url: url,
            method: 'POST',
            data: newData
        }).then(response => {
            console.log(response.data.data)
            const newState = [];
            if(response.data.data.length>0){
                for (let i = 0; i < response.data.data.length; i++) {
                    params.filter(rows => rows.image_desc == response.data.data[i].fileName).map(newrow => newState.push({...response.data.data[i],"frag_id" : newrow.frag_id}))
                }
            }
            setImgData([...newState]);
        }).catch(error => {
        console.log(error)
        })
    }

    const handleRequests = () =>{
        const url=`/getFragResult?mine_reg_no=${mine}&blast_id=${blast}`;
        axios({
            url: url,
            method: 'GET'
        }).then(response => {
            setRowData(response.data.data.filter((rows)=>rows.is_captured==true));
            handleImageData(response.data.data.filter((rows)=>rows.is_captured==true));
        }).catch(error => {
          console.log(error)
        })
    }

    const handleBack = () =>{
        if(requestform === true){
            setRequestForm(false);
        }else{
            setRequestForm(true);
        }
        const url=`/getFragResult`;
        axios({
            url: url,
            method: 'GET'
        }).then(response => {
            setRowData(response.data.data.filter((rows)=>rows.is_captured==true));
            // handleImageData(response.data.data.filter((rows)=>rows.is_captured==true));
        }).catch(error => {
          console.log(error)
        })
    }

    const handleClick = (params) =>{
        setEachData(params)
        if(requestform === true){
            setRequestForm(false);
        }else{
            setRequestForm(true);
        }
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
                    {/* <Grid item xs={7}></Grid> */}
                    <Grid item xs={6}></Grid>
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
                <Typography className='formHeader'>Fragmentation Analysis - Request
                </Typography>
            </Grid><Grid item xs={5}></Grid>
            {
                console.log(requestform)
            }
            {requestform == true && <Grid item xs={1}>
                <Button variant="outlined" style={{background: 'linear-gradient(to right, #000046, #1cb5e0)' ,color:'#fff', borderRadius: '20px' , marginLeft: '-2rem'}} onClick={handleClick} >Back</Button>
            </Grid>}
        </Grid>
        <Grid container spacing={3} style={{minHeight:'150px'}} className='formtextfield'>
        <Grid item xs={4}>
                <label>Mine</label>
                <FormControl fullWidth>
                    <Select size="small" labelId="demo-simple-select-label" id="demo-simple-select" value={mine} onChange={handleMineChange} >
                    {mineData.length > 0 ? mineData.map(row => <MenuItem key={row.mine_reg_no} value={row.mine_reg_no}>{row.mine_reg_no}</MenuItem>):''}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <label>Blast</label>
                <FormControl fullWidth>
                    <Select size="small" labelId="demo-simple-select-label" id="demo-simple-select" value={blast} onChange={handleBlastChange} >
                    {blastFilteredData.length > 0 ? blastFilteredData.map(row => <MenuItem key={row._id} value={row.blast_id}>{row.blast_id}</MenuItem>):''}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <Button color="primary" variant="contained" onClick={handleRequests} style={{ marginTop: '2rem', color: '#fff', background: 'linear-gradient(to right, #000046, #1cb5e0)' , borderRadius: '20px'}} >Filter</Button><br/>
            </Grid>
        </Grid>
        {requestform == false ? 
                <Grid container spacing={3} className='formtextfield'>
                    {imgData.map((row) => (<Grid item xs={3} key={row.fileName}>
                        <label>Mine ID : {row.mineId}</label>
                        <img src={`${row.image}`} className='requestImg'/>
                        <Button color="primary" variant="contained" style={{width: '-webkit-fill-available', marginTop: '-4rem',marginBottom: '1rem', color: '#fff', background: 'linear-gradient(#1cb5e0)' , borderRadius: '20px', fontWeight: 'bold'}} onClick={(e)=>handleClick(row)} >SELECT</Button>
                    </Grid>))}
                </Grid> 
        :<RequestForm data={eachData} callback={handleBack} />}
        </Paper>  
        </Box> 
        </Box> 
    );
}

export default Request;
