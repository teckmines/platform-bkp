import React, { Component , useState,useEffect} from 'react';
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
import IMG from "../../../../../Assets/Images/Img.jpeg";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from 'axios';


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

function TruckVolumeReportDialog(props) {
     const [value, setValue] = useState("");
    const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addform, setAddform] = useState(false);
  const [editData, setEditData] = useState([]);
  const [formState, setFormState] = useState('Add');

  console.log(props);

  useEffect(()=>{
  if(props != undefined){
  const url = `/getVolumeReport/${props.data.trip_id}`
    axios({
    method: 'GET',
    url: url,
    }).then(response => {
      setEditData(response.data.data);
    }).catch(error => {
        console.log(error)
    })
  }
  },[props])

  const data = props.data
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
    if(addform === true){
      setAddform(false);
      setEditData(data)
      setFormState(type)
    }else{
      setAddform(true);
      setEditData(data)
      setFormState(type)
    }
}

  const headers = [
    { label: "Time & Date", key: "timestamp" },
    { label: "Request ID", key: "request_id" },
    { label: "Status", key: "status" }
  ];

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
        <Box className="tablepaper"> 
            <div style={{float:'right'}}>
              <span style={{fontWeight:'bold'}}>Trip ID: </span> 
              <span style={{color:'#000046'}}>{editData.trip_id}</span>
            </div>
            <div style={{float:'left'}}>
                    <span style={{fontWeight:'bold'}}>Mine Name: </span> 
                    <span style={{color:'#000046'}}>{editData.mine_name}</span>
                  </div><br></br><br></br>
                  <div style={{marginBottom:'30px'}}>
                    <span style={{fontWeight:'bold'}}>Mine ID: </span> 
                    <span style={{color:'#000046'}}>{editData.mine_reg_no}</span>
                  </div>
         <Grid container spacing={3}>  
          <Grid item xs={6}>
          <img src={data.truck_image} className='requestImg2' />
          </Grid>  
          <Grid item xs={6}>
          <div style={{marginBottom:'30px', marginTop:'1rem'}}>
                    <span style={{fontWeight:'bold'}}>Truck Volume: </span> 
                    <span style={{color:'#000046'}}>{parseFloat(data.calculated_volume.$numberDecimal/1000000000).toFixed(11)} m3</span>
                  </div>
          <div style={{marginBottom:'30px'}}>
                    <span style={{fontWeight:'bold'}}>Truck No: </span> 
                    <span style={{color:'#000046'}}>{editData.truck_number}</span>
                  </div>
                  <div style={{marginBottom:'30px'}}>
                    <span style={{fontWeight:'bold'}}>Truck Driver: </span> 
                    <span style={{color:'#000046'}}>{editData.truck_driver}</span>
                  </div>
                  <div style={{marginBottom:'30px'}}>
                    <span style={{fontWeight:'bold'}}>Driver License: </span> 
                    <span style={{color:'#000046'}}>{editData.driving_license}</span>
                  </div>
                  <div style={{marginBottom:'30px'}}>
                    <span style={{fontWeight:'bold'}}>Time and Date: </span> 
                    <span style={{color:'#000046'}}>{editData.createdAt}</span>
                  </div>
                  <Stack direction="row">
                    {editData.is_overloaded===true?<Chip label="Overload" style={{width:"10rem",backgroundColor:'red',color:'#fff'}}/>:editData.is_underloaded===true?<Chip label="Underload" style={{width:"10rem",backgroundColor:'red',color:'#fff'}}/>:''}&nbsp;&nbsp;
                    {/* {editData.is_underloaded===null?<Chip label="Underload" style={{width:"10rem"}}/>:?:<Chip label="Underload" style={{width:"10rem",backgroundColor:'green',color:'#fff'}}/>} */}
                    {/* {data.is_overloaded===null &&<Chip label="Overload" style={{width:"10rem"}}/>}
                    {data.is_underloaded===null&&<Chip label="UnderLoad" style={{width:"10rem"}}/>} */}
                  </Stack>
          </Grid>  
          </Grid>       
            </Box>
    );
}

export default TruckVolumeReportDialog;
