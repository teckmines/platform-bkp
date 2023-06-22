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
import { Add, GetApp } from '@mui/icons-material';
import DriverForm from './DriverForm';
import { FcEditImage, FcDeleteDatabase } from "react-icons/fc";
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


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
  
  function createData(id, truck_no, rfid_no, truck_owner, contractor_company, contractor_gstin) {
    return { id, truck_no, rfid_no, truck_owner, contractor_company, contractor_gstin };
  }
  
  const rows = [
    createData(1, 12345, 2322, 'name', 'dsfdsfd', 123213 ),
    createData(2, 12345, 2322, 'name', 'dsfdsfd', 123213 ),
    createData(3, 12345, 2322, 'name', 'dsfdsfd', 123213 ),
    createData(4, 12345, 2322, 'name', 'dsfdsfd', 123213 ),
    createData(5, 12345, 2322, 'name', 'dsfdsfd', 123213 ),
  ];


function Driver(props) {
  // console.log(props.user)
       const [value, setValue] = useState("");
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [addform, setAddform] = useState(false);
    const [editData, setEditData] = useState([]);
    const [formState, setFormState] = useState('Add');
    const [rowData, setRowData] = useState([]);
    const token = props.user;
    const [mine, setMine] = React.useState('');
    const [charge, setCharge] = React.useState('');
    const [chargeData, setChargeData] = useState([]);

    useEffect(() =>{
      handleRecords();
      const url = `/getTruckInfo`;
      axios({
          method: 'GET',
          url: url,
      }).then(response => {
          console.log(response.data.data)
          setChargeData(response.data.data);
      }).catch(error => {
          console.log(error)
      })
  },[token])


    const handleAssignClick = (event) => {
        const url = `/assignTruck`;
        const newdata = {
            "driving_license": charge,
            "assigned_truck_number": mine
        }
        axios({
            method: 'POST',
            url: url,
            data: newdata
          }).then(response => {
            console.log(response)
            handleRecords();
          }).catch(error => {
            console.log(error)
          })
    };

  const handleMineChange = (event) => {
    setMine(event.target.value);
};

const handleChargeChange = (event) => {
    setCharge(event.target.value);
};

  const handleRecords =()=>{
    console.log(token)
    const url = `/getDriverInfo`;
    axios.get(url)
    .then(response => {
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

  const handleCallback =()=>{
    if(addform === true){
        setAddform(false);
        setFormState('Add')
      }else{
        setAddform(true);
        setFormState('Add')
      }
      handleRecords();
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
      { label: "Truck Number", key: "truck_no" },
      { label: "RFID No", key: "rfid_no" },
      { label: "Truck Owner", key: "truck_owner" },
      { label: "Contractor Company", key: "contractor_company" },
      { label: "Contractor GSTIN", key: "contractor_gstin" }
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
        <Box>           
            <Box className="pagebackground">
            <Grid container spacing={1} style={{padding:'2.5rem'}}>
                <Grid item xs={4}>
                    <Typography className='pageHeader'>Driver Details</Typography>
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
            {!addform ? <Paper className='tablepaper'>
                    <Grid container spacing={2}>
                    <Grid item xs={2.4}></Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Truck</InputLabel>
                                <Select size="small" labelId="demo-simple-select-label" label='Truck' placeholder="Truck" id="demo-simple-select" value={mine} onChange={handleMineChange} >
                                {chargeData.length > 0 ? chargeData.map(row => <MenuItem key={row.truck_number} value={row.truck_number}>{row.truck_number}</MenuItem>):''}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Driver</InputLabel>
                                <Select size="small" labelId="demo-simple-select-label" label='Driver' id="demo-simple-select"  placeholder="Driver" value={charge} onChange={handleChargeChange} >
                                {rowData.length > 0 ? rowData.map(row => <MenuItem key={row.driving_license} value={row.driving_license}>{row.driving_license}</MenuItem>):''}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={1.3}>
                            <Button color="primary" variant="contained" style={{marginBottom: '1rem', backgroundColor: '#1cb5e0', color: '#fff', border: '1px solid #1cb5e0' , borderRadius: '20px' }} onClick={handleAssignClick} >Assign</Button>
                        </Grid>
                        <Grid item xs={1.3}>
                            <Button color="primary" variant="contained" style={{marginBottom: '1rem', backgroundColor: '#1cb5e0', color: '#fff', border: '1px solid #1cb5e0' , borderRadius: '20px' }} onClick={handleClick} startIcon={<Add />} >Add</Button>
                        </Grid>
                        <Grid item xs={1}>
                            <Button color="primary" variant="contained" style={{marginBottom: '1rem', backgroundColor: '#fff', color: '#1cb5e0', border: '1px solid #1cb5e0' , borderRadius: '20px', marginLeft: '-1rem'}} startIcon={<GetApp />} ><CSVLink data={rows} headers={headers} filename='TruckDetails.csv' className="btn btn-primary" style={{width:"max-content", color: "#1cb5e0", textDecoration: 'none'}}></CSVLink>CSV</Button>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Fullname</StyledTableCell>
                                <StyledTableCell>Driving License</StyledTableCell>
                                <StyledTableCell>Driver</StyledTableCell>
                                <StyledTableCell>Address</StyledTableCell>
                                <StyledTableCell>Assigned Truck</StyledTableCell>
                                {/* <StyledTableCell>Mine Address</StyledTableCell>
                                <StyledTableCell>Mine Region</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell> */}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rowData.map((row) => (
                                <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.fullname}
                                </StyledTableCell>
                                <StyledTableCell>{row.driving_license}</StyledTableCell>
                                <StyledTableCell><Stack direction="row" spacing={2}><Avatar alt="Remy Sharp" src={row.image} /></Stack></StyledTableCell>
                                <StyledTableCell>{row.address}</StyledTableCell>
                                <StyledTableCell>{row.assigned_truck_number}</StyledTableCell>
                                {/* <StyledTableCell>{row.mine_address}</StyledTableCell>
                                <StyledTableCell>{row.mine_region}</StyledTableCell>
                                <StyledTableCell><a href='#' onClick={(e) => handleSvgClick(e.target.id,row,'Edit')}><FcEditImage className='svgiconcss'/></a><FcDeleteDatabase className='svgiconcss'/> </StyledTableCell> */}
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>:
                <Paper className='formpaper'>
                    <Grid container spacing={1} style={{background:'#bfe1f3', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', marginLeft: '0.01rem' , width: 'auto'}}>
                        <Grid item xs={2}>
                            <Typography className='formHeader'>
                               {formState === 'Edit' ? 'Edit Info' : 'Add Info' }
                            </Typography>
                        </Grid><Grid item xs={9}></Grid>
                        <Grid item xs={1}>
                            <Button variant="outlined" style={{background: 'linear-gradient(to right, #000046, #1cb5e0)' ,color:'#fff', borderRadius: '20px' , marginLeft: '-2rem'}} onClick={handleClick} >Back</Button>
                        </Grid>
                    </Grid>
                    <DriverForm callback={handleCallback} editData={editData} />
                </Paper>
                }
            </Box>
        </Box>
    );
}

export default Driver;