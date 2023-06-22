import React, { Component , useEffect, useState} from 'react';
import Box from '@mui/material/Box';
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
import { Add, GetApp, Report } from '@mui/icons-material';
import { FcProcess, FcDocument } from "react-icons/fc";
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import BarChart from '../../../Components/BarChart'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      background: '#258bc0',
      color: theme.palette.common.white,
      fontWeight: 'bold'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: '#bfe1f3',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function BoulderReport() {
     const [value, setValue] = useState("");
    const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addform, setAddform] = useState(false);
  const [editData, setEditData] = useState([]);
  const [formState, setFormState] = useState('Add');
  const[viewFlag, setViewFlag]=useState(false);
  const [mine, setMine] = React.useState('');
  const [period, setPeriod] = React.useState('daily');
  const [category, setCategory] = React.useState('contractor');
  const [rowData, setRowData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [otherData, setOtherData] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/getContractorList`,
      }).then(response => {
        setRowData(response.data.data);
      }).catch(error => {
          console.log(error)
      })
  },[])

  const handleMineChange = (event) => {
    setMine(event.target.value);
    setStartDate(null)
    setEndDate(null)
    setGraphData([])
  };

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
    setStartDate(null)
    setEndDate(null)
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    handleTripInfo(event.target.value);
    setStartDate(null)
    setEndDate(null)
  };

  const handleTripInfo = () => {
    let url = ``;
    if(value==='contractor'){
      url=`/getContractorList`
    }else {
      url = `/getTruckList`
    }
    if(url!=``){
    axios({
    method: 'GET',
    url: url,
    }).then(response => {
      setRowData(response.data.data);
    }).catch(error => {
        console.log(error)
    })}
  }

  const handleChangeStart = (value) =>{
    setStartDate(value);
  }

  const handleChangeLast = (value) =>{
    setEndDate(value);
    let newdata = [];
    let url = ``;
    if(category === 'contractor'){
        url = `/getBoulderByContractor`;
        newdata.push({"contractor": mine,
        "period": period,
        "start_date": moment(startDate.toISOString()).format('YYYY-MM-DD'),
        "end_date": moment(value.toISOString()).format('YYYY-MM-DD')})
    }else{
        url = `/getBoulderByTruck`;
        newdata.push({"truck_num": mine,
        "period": period,
        "start_date": moment(startDate.toISOString()).format('YYYY-MM-DD'),
        "end_date": moment(value.toISOString()).format('YYYY-MM-DD')})
    }
    axios({
      method: 'GET',
      url: url,
      params: newdata[0],
    }).then(response => {
      const newState = [];
      const otherState = [];
      console.log(response)
      if(response.data.data.boulder.length>0&&response.data.data.boulder){
        const getValues = response.data.data.boulder.map((obj) => {
          console.log(obj)
          return {...obj, value: parseFloat(obj.value), date: obj.date}
      })
      console.log(getValues)
      setGraphData(getValues)
        newState.push([...getValues]);
        }else{
        setGraphData([])}
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
                    <Grid item xs={4}>
                    </Grid><Grid item xs={2}></Grid>
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
                <Typography className='formHeader'>Boulder Report
                </Typography>
            </Grid><Grid item xs={9}></Grid>
        </Grid>
                <Box className='formpaper' >
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                          <label>Category</label>
                            <FormControl fullWidth>
                                <Select size="small" labelId="demo-simple-select-label" placeholder="Truck" id="demo-simple-select" value={category} onChange={handleCategoryChange} >
                                    <MenuItem value="contractor">By Contractor</MenuItem>
                                    <MenuItem value="truck">By Truck</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                          <label>Category List</label>
                            <FormControl fullWidth>
                                <Select size="small" labelId="demo-simple-select-label" placeholder="Truck" id="demo-simple-select" value={mine} onChange={handleMineChange} >
                                  {rowData.length > 0 && rowData.map(row => <MenuItem key={row} value={row}>{row}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                          <label>Period</label>
                            <FormControl fullWidth>
                                <Select size="small" labelId="demo-simple-select-label" placeholder="Truck" id="demo-simple-select" value={period} onChange={handlePeriodChange} >
                                    <MenuItem value="daily">Daily</MenuItem>
                                    <MenuItem value="weekly">Weekly</MenuItem>
                                    <MenuItem value="monthly">Monthly</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                        <label>Start Date</label>
                        <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                        <DatePicker size="small" value={startDate} inputFormat="YYYY-MM-DD" onChange={(newValue) =>handleChangeStart(newValue)} renderInput={(params) => <TextField size="small" {...params} helperText={null} style={{backgroundColor:"#fff"}}/>} /></LocalizationProvider>
                        </Grid>
                        <Grid item xs={2}>
                        <label>End Date</label>
                        <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                        <DatePicker size="small" value={endDate} inputFormat="YYYY-MM-DD" onChange={(newValue) =>handleChangeLast(newValue)} renderInput={(params) => <TextField size="small" {...params} helperText={null} style={{backgroundColor:"#fff"}}/>} /></LocalizationProvider>
                        </Grid>
                  </Grid><br></br>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {(graphData.length>0)?<div style={{marginBottom:'30px'}}>
                        <BarChart data={graphData}></BarChart>
                      </div>:<span style={{textAlign:'center'}}>{}</span>}
                    </Grid>
                  </Grid>
                </Box>
                </Paper>
            </Box>
        </Box>
    );
}

export default BoulderReport;