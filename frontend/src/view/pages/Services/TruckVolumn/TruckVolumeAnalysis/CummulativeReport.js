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
import TruckVolumeReportDialog from './ReportDialog';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import BarChart from '../../../../../Components/BarChart'


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

function CummulativeReport() {
     const [value, setValue] = useState("");
    const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addform, setAddform] = useState(false);
  const [editData, setEditData] = useState([]);
  const [formState, setFormState] = useState('Add');
  const[viewFlag, setViewFlag]=useState(false);
  const [mine, setMine] = React.useState('');
  const [rowData, setRowData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [otherData, setOtherData] = useState([]);

  useEffect(() => {
    handleTripInfo()
  },[])

  const handleMineChange = (event) => {
    setMine(event.target.value);
  };

  const handleTripInfo = () => {
    const url = `/getTruckInfo`
    axios({
    method: 'GET',
    url: url,
    }).then(response => {
      let count = 0
      response.data.data = response.data.data.map(w => 
        { count+=1;
          return { ...w, id: count } })
      setRowData(response.data.data);
    }).catch(error => {
        console.log(error)
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick =()=>{
    if(addform === true){
      setAddform(false);
      setFormState('Add')
    }else{
      setAddform(true);
      setFormState('Add')
    }
}

const handleSvgClick =(id,data,type)=>{
  setViewFlag(!viewFlag)
  setSelectedRowData(data)
}

  const headers = [
    { label: "Time & Date", key: "timestamp" },
    { label: "Request ID", key: "request_id" },
    { label: "Status", key: "status" }
  ];

  const handleChangeStart = (value) =>{
    setStartDate(value);
  }

  const handleChangeLast = (value) =>{
    setEndDate(value);
    const url = `/getVolumeAnalysis/${mine}/${moment(startDate.toISOString()).format('YYYY-MM-DD')}/${moment(value.toISOString()).format('YYYY-MM-DD')}`
    axios({
    method: 'GET',
    url: url,
    }).then(response => {
      const newState = [];
      const otherState = [];
      if(response.data.data.volume_data){
        const getValues = response.data.data.volume_data.map((obj) => {
          return {...obj, volume: parseFloat(obj.volume.$numberDecimal),date:new Date(obj.date)}
      })
        newState.push([...getValues]);
        }
        if(response.data.data){
          const getValues = {avg_volume: parseFloat(response.data.data.avg_volume), total_volume: parseFloat(response.data.data.total_volume)}
          otherState.push([getValues]);
          }
          console.log(otherState[0])
      setGraphData(newState[0])
      setOtherData(otherState[0])
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
                    </Grid><Grid item xs={3}></Grid>
                    <Grid item xs={5}>
                        <TextField placeholder="Search" className="filledsearch" type="text" variant="outlined" fullWidth size="small" onChange={(e) => setValue(e.target.value)}
                        value={value} InputProps={{ startAdornment: (<InputAdornment position="start"> <SearchIcon /> </InputAdornment>) }} />
                    </Grid>
                </Grid>
                <Paper className='formpaper'>
        <Grid container spacing={1} style={{background:'#bfe1f3', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', marginLeft: '0.01rem' , width: 'auto'}}>
            <Grid item xs={6}>
                <Typography className='formHeader'>Cumulative Report
                </Typography>
            </Grid><Grid item xs={9}></Grid>
        </Grid>
                <Box className='formpaper' >
                <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <label>Truck No</label>
                            <FormControl fullWidth>
                                <Select size="small" labelId="demo-simple-select-label" placeholder="Truck" id="demo-simple-select" value={mine} onChange={handleMineChange} >
                                {rowData.length > 0 ? rowData.map(row => <MenuItem key={row.truck_brand} value={row.truck_number}>{row.truck_brand}</MenuItem>):''}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                        <label>From Date</label>
                        <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                        <DatePicker size="small" value={startDate} inputFormat="YYYY-MM-DD" onChange={(newValue) =>handleChangeStart(newValue)} renderInput={(params) => <TextField size="small" {...params} helperText={null} style={{backgroundColor:"#fff"}}/>} /></LocalizationProvider>
                        </Grid>
                        <Grid item xs={4}>
                        <label>To Date</label>
                        <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                        <DatePicker size="small" value={endDate} inputFormat="YYYY-MM-DD" onChange={(newValue) =>handleChangeLast(newValue)} renderInput={(params) => <TextField size="small" {...params} helperText={null} style={{backgroundColor:"#fff"}}/>} /></LocalizationProvider>
                        </Grid>
                  </Grid><br></br>
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      {(graphData.length>0&&otherData.length>0)?<div style={{marginBottom:'30px'}}>
                        <BarChart data={graphData} other={otherData}></BarChart>
                      </div>:""}
                    </Grid>
                    <Grid item xs={3}>
                    {otherData.length>0?<Box className="divclass">
                          <Typography style={{textAlign:'center',marginTop:"2.5rem"}}><strong>Total:</strong> {otherData[0].total_volume}</Typography><br/>
                          <Typography style={{textAlign:'center'}}><strong>Average:</strong> {otherData[0].avg_volume}</Typography>
                        </Box>:""}
                    </Grid>
                  </Grid>
                </Box>
                </Paper>
            </Box>
        </Box>
    );
}

export default CummulativeReport;