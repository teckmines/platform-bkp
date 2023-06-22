import React, { Component , useState} from 'react';
import Box from '@mui/material/Box';
import Sidebar from '../../Layout/SideBar';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate,Navigate, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { textAlign } from '@mui/system';
import LineChart from "../../Components/LineChart";

function Dashboard() {
       const [value, setValue] = useState("");
       const navigate = useNavigate();
       const price = [
        {$numberDecimal: '11.798068308354065'},
        {$numberDecimal: '13.474742368144181'},
        {$numberDecimal: '14.521857342611417'},
        {$numberDecimal: '16.691186547366513'},
        {$numberDecimal: '16.857211303826876'},
        {$numberDecimal: '18.071083415220404'},
        {$numberDecimal: '49.87687602539193'},
        {$numberDecimal: '77.25145363615562'},
        {$numberDecimal: '88.05341056194513'},
        {$numberDecimal: '88.22848398396295'},
        {$numberDecimal: '88.63073173347787'},
        {$numberDecimal: '88.63073173347787'},
        {$numberDecimal: '100.2214414347729'},
        {$numberDecimal: '104.44309278494224'},
        {$numberDecimal: '106.55669294889486'},
        {$numberDecimal: '113.04532315470294'},
        {$numberDecimal: '114.00899842410853'},
        {$numberDecimal: '132.69884108613957'},
        {$numberDecimal: '139.33346022916788'},
        {$numberDecimal: '142.46610053507595'},
        {$numberDecimal: '142.46610053507595'},
        {$numberDecimal: '145.6802926939861'},
        {$numberDecimal: '168.64516460372698'},
        {$numberDecimal: '222.07322014405622'},
        {$numberDecimal: '223.07685206467895'},
        {$numberDecimal: '242.13334668900293'},
        {$numberDecimal: '296.351002221613'},
        {$numberDecimal: '296.845390883177'},
        {$numberDecimal: '317.7251134657654'},
        {$numberDecimal: '325.6588973483802'},
        {$numberDecimal: '339.8476734723493'},
        {$numberDecimal: '446.85415082432934'},
        {$numberDecimal: '451.30254827507196'},
        {$numberDecimal: '595.46973416958'},
        {$numberDecimal: '719.8508716005797'},
        {$numberDecimal: '846.5208807846174'},
        {$numberDecimal: '928.1362762915086'},
        {$numberDecimal: '931.8401865734294'},
        {$numberDecimal: '973.8104479519644'},
        {$numberDecimal: '1021.8003679065139'},
        {$numberDecimal: '1171.9615687819628'},
        {$numberDecimal: '1175.1245607770431'},
        {$numberDecimal: '1193.7188415197845'},
        {$numberDecimal: '1474.0481004875023'}, 
        {$numberDecimal: '1512.1559848693191'},
        {$numberDecimal: '1527.8818632925409'},
        {$numberDecimal: '1574.9426755148857'},
        {$numberDecimal: '1749.2950885337382'}, 
        {$numberDecimal: '1848.8282932391107'},
        {$numberDecimal: '1875.7925027556823'},
        {$numberDecimal: '1927.7883795226153'},
        {$numberDecimal: '1933.6201853457312'}]

        const fruits = [
            {$numberDecimal: '11.798068308354065'},
            {$numberDecimal: '13.474742368144181'},
            {$numberDecimal: '14.521857342611417'},
            {$numberDecimal: '16.691186547366513'},
            {$numberDecimal: '16.857211303826876'},
            {$numberDecimal: '18.071083415220404'},
            {$numberDecimal: '49.87687602539193'},
            {$numberDecimal: '77.25145363615562'},
            {$numberDecimal: '88.05341056194513'},
            {$numberDecimal: '88.22848398396295'},
            {$numberDecimal: '88.63073173347787'},
            {$numberDecimal: '88.63073173347787'},
            {$numberDecimal: '100.2214414347729'},
            {$numberDecimal: '104.44309278494224'},
            {$numberDecimal: '106.55669294889486'},
            {$numberDecimal: '113.04532315470294'},
            {$numberDecimal: '114.00899842410853'},
            {$numberDecimal: '132.69884108613957'},
            {$numberDecimal: '139.33346022916788'},
            {$numberDecimal: '142.46610053507595'},
            {$numberDecimal: '142.46610053507595'},
            {$numberDecimal: '145.6802926939861'},
            {$numberDecimal: '168.64516460372698'},
            {$numberDecimal: '222.07322014405622'},
            {$numberDecimal: '223.07685206467895'},
            {$numberDecimal: '242.13334668900293'},
            {$numberDecimal: '296.351002221613'},
            {$numberDecimal: '296.845390883177'},
            {$numberDecimal: '317.7251134657654'},
            {$numberDecimal: '325.6588973483802'},
            {$numberDecimal: '339.8476734723493'},
            {$numberDecimal: '446.85415082432934'},
            {$numberDecimal: '451.30254827507196'},
            {$numberDecimal: '595.46973416958'},
            {$numberDecimal: '719.8508716005797'},
            {$numberDecimal: '846.5208807846174'},
            {$numberDecimal: '928.1362762915086'},
            {$numberDecimal: '931.8401865734294'},
            {$numberDecimal: '973.8104479519644'},
            {$numberDecimal: '1021.8003679065139'},
            {$numberDecimal: '1171.9615687819628'},
            {$numberDecimal: '1175.1245607770431'},
            {$numberDecimal: '1193.7188415197845'},
            {$numberDecimal: '1474.0481004875023'}, 
            {$numberDecimal: '1512.1559848693191'},
            {$numberDecimal: '1527.8818632925409'},
            {$numberDecimal: '1574.9426755148857'},
            {$numberDecimal: '1749.2950885337382'}, 
            {$numberDecimal: '1848.8282932391107'},
            {$numberDecimal: '1875.7925027556823'},
            {$numberDecimal: '1927.7883795226153'},
            {$numberDecimal: '1933.6201853457312'}]

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
                    <Typography className='pageHeader'>Dashboard</Typography>
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
            <Grid container spacing={1} style={{padding:'2.5rem'}}>
                <Grid item xs={4}>
                    <Card sx={{ width: 275}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 40, fontWeight:'bold' }} style={{textAlign:'center'}} color="text.secondary" gutterBottom>
                            540
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} style={{textAlign:'center'}} color="text.secondary" gutterBottom>
                            Pit Area (acres)
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ width: 275}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 40, fontWeight:'bold' }} style={{textAlign:'center'}} color="text.secondary" gutterBottom>
                            $26000
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} style={{textAlign:'center'}} color="text.secondary" gutterBottom>
                            Value of Stockpile
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ width: 275}}>
                    <CardContent>
                        <Typography sx={{ fontSize: 40, fontWeight:'bold' }} style={{textAlign:'center'}} color="text.secondary" gutterBottom>
                            5000 
                        </Typography>
                        <Typography sx={{ fontSize: 20 }} style={{textAlign:'center'}} color="text.secondary" gutterBottom>
                            Volume (m3)
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container>
                <Grid xs={11} style={{padding:'2.5rem', marginLeft:'30px'}}>
                <LineChart data={fruits.map((fr, i) => ({"x-axis":parseFloat(fr.$numberDecimal),"y-axis":parseFloat(price[i].$numberDecimal)}))} />
                </Grid>
            </Grid>
        </Box>
        </Box>
    );
}

export default Dashboard;