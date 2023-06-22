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
import LineChart from "../../../../Components/LineChart";
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


function TruckBoulderReportDialog(props) {
       const [value, setValue] = useState("");
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [addform, setAddform] = useState(false);
    const [editData, setEditData] = useState([]);
    const [formState, setFormState] = useState('Add');
    const [price, setPrice] = useState([...props.data.x_axis_data])
    const [fruits, setFruits] = useState([...props.data.y_axis_data])


  const data = props.data

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
        <Box className="tablepaper" style={{minHeight:'450px'}}>            
          <div style={{marginBottom:'30px'}}>
            <span style={{fontWeight:'bold'}}>Request Id: </span> 
            <span style={{color:'#000046'}}>{data.frag_id}</span>
          </div>
          <div style={{marginBottom:'30px'}}>
              <LineChart data={fruits.map((fr, i) => ({"x-axis":parseFloat(fr.$numberDecimal),"y-axis":parseFloat(price[i].$numberDecimal)}))} />
          </div>
      </Box>
    );
}

export default TruckBoulderReportDialog;