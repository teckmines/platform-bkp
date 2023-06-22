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
import ChargeForm from './ChargeForm';
import { FcEditImage, FcDeleteDatabase } from "react-icons/fc";
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


function Charge(props) {
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

    useEffect(() =>{
      handleRecords();
  },[token])

  const handleRecords =()=>{
    console.log(token)
    const url = `/getChargeInfo`;
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
                    <Typography className='pageHeader'>Charge Details</Typography>
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
                    <Grid item xs={10}></Grid>
                        <Grid item xs={1}>
                            <Button color="primary" variant="contained" style={{marginBottom: '1rem', backgroundColor: '#1cb5e0', color: '#fff', border: '1px solid #1cb5e0' , borderRadius: '20px' , marginLeft: '-1.5rem'}} onClick={handleClick} startIcon={<Add />} >Add</Button>
                        </Grid>
                        <Grid item xs={1}>
                            <Button color="primary" variant="contained" style={{marginBottom: '1rem', backgroundColor: '#fff', color: '#1cb5e0', border: '1px solid #1cb5e0' , borderRadius: '20px', marginLeft: '-1rem'}} startIcon={<GetApp />} ><CSVLink data={rows} headers={headers} filename='TruckDetails.csv' className="btn btn-primary" style={{width:"max-content", color: "#1cb5e0", textDecoration: 'none'}}></CSVLink>CSV</Button>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Charge Id</StyledTableCell>
                                <StyledTableCell>Total Charge Used</StyledTableCell>
                                <StyledTableCell>No of Primers</StyledTableCell>
                                <StyledTableCell>No of Deternators</StyledTableCell>
                                <StyledTableCell>Charge Density</StyledTableCell>
                                <StyledTableCell>Length</StyledTableCell>
                                <StyledTableCell>Angle</StyledTableCell>
                                <StyledTableCell>Diameter</StyledTableCell>
                                <StyledTableCell>stemming</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rowData.map((row) => (
                                <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.charge_id}
                                </StyledTableCell>
                                <StyledTableCell>{row.total_charge_used.$numberDecimal}</StyledTableCell>
                                <StyledTableCell>{row.number_of_primers}</StyledTableCell>
                                <StyledTableCell>{row.number_of_detonators}</StyledTableCell>
                                <StyledTableCell>{row.chagre_density.$numberDecimal}</StyledTableCell>
                                <StyledTableCell>{row.length.$numberDecimal}</StyledTableCell>
                                <StyledTableCell>{row.angle}</StyledTableCell>
                                <StyledTableCell>{row.diameter.$numberDecimal}</StyledTableCell>
                                <StyledTableCell>{row.stemming.$numberDecimal}</StyledTableCell>
                                {/* <StyledTableCell><a href='#' onClick={(e) => handleSvgClick(e.target.id,row,'Edit')}><FcEditImage className='svgiconcss'/></a><FcDeleteDatabase className='svgiconcss'/> </StyledTableCell> */}
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
                    <ChargeForm callback={handleCallback} editData={editData} formState={formState} />
                </Paper>
                }
            </Box>
        </Box>
    );
}

export default Charge;