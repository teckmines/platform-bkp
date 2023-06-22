import React, { Component ,useEffect, useState} from 'react';
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
import TruckBoulderReportDialog from './ReportDialog';
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

function TruckBoulderReport() {
     const [value, setValue] = useState("");
    const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addform, setAddform] = useState(false);
  const [editData, setEditData] = useState([]);
  const [formState, setFormState] = useState('Add');
  const [viewFlag, setViewFlag]=useState(false);
  const [eachRowData, setEachRowData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);

  useEffect(() => {
    handleTripInfo()
  },[])

  const handleTripInfo = () => {
    const url = `/getTripInfo`
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
    // let newdata = [];
    // newdata.push(data)
    if(data != undefined){
    const url = `/getBoulderReport/${data.trip_id}`
      axios({
      method: 'GET',
      url: url,
      }).then(response => {
        setEachRowData(response.data.data)
        // setEachRowData(newdata);
      }).catch(error => {
          console.log(error)
      })
  }
}

  const headers = [
    { label: "Time & Date", key: "timestamp" },
    { label: "Request ID", key: "request_id" },
    { label: "Status", key: "status" }
  ];

  console.log(rowData);

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
        <Box >         
            <Box className="pagebackground" >
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
                {!viewFlag?
                <Paper className='formpaper'>
                <Grid container spacing={1} style={{background:'#bfe1f3', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', marginLeft: '0.01rem' , width: 'auto'}}>
                    <Grid item xs={6}>
                        <Typography className='formHeader'>Truck Boulder Detection - Report
                        </Typography>
                    </Grid><Grid item xs={9}></Grid>
                </Grid>
                <Paper className='formpaper'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>#</StyledTableCell>
                                <StyledTableCell>Time & Date</StyledTableCell>
                                <StyledTableCell>Request ID</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rowData.map((row) => (
                                <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell>{row.createdAt}</StyledTableCell>
                                <StyledTableCell>{row.trip_id}</StyledTableCell>
                                <StyledTableCell>
                                    {row.is_processed?<><a href='#' onClick={(e) => handleSvgClick(e.target.id,row,'Edit')}><FcDocument className='svgiconcss'/>View Report</a> </>:<><a href='#' onClick={(e) => handleSvgClick(e.target.id,row,'Edit')}><FcProcess className='svgiconcss'/>In Progress</a></>}
                                </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rowData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                </Paper>
                :<Paper className='formpaper'>
                    <Grid container spacing={1} style={{background:'#bfe1f3', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', marginLeft: '0.01rem' , width: 'auto'}}>
                    <Grid item xs={6} alignContent="flex-start">
                        <Typography className='formHeader'>Truck Boulder Detection - Report
                        </Typography>
                        
                    </Grid> <Grid item xs={5}></Grid>
                    <Grid item xs={1} alignContent="flex-end">
                    <Button variant="contained" style={{background: 'linear-gradient(to right, #000046, #1cb5e0)' , width:'6rem', fontWeight:'bold' ,color:'#fff', borderRadius: '20px' , marginLeft: '-2rem'}} onClick={handleSvgClick} >
                        Back
                    </Button>
                    </Grid>
                </Grid>
                <TruckBoulderReportDialog data={eachRowData}/>
                </Paper>

            }
            </Box>
        </Box>
    );
}

export default TruckBoulderReport;