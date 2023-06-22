import { React, useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router,Route, Routes, Navigate ,useNavigate} from 'react-router-dom';
import Login from './view/auth/Login';
import Box from '@mui/material/Box';
import './Assets/Styles/Style.css';
import Dashboard from './view/pages/Dashboard';
import Truck from './view/pages/Master/Truck';
import Mine from './view/pages/Master/Mine';
import TruckForm from './view/pages/Master/TruckForm';
import Request from './view/pages/Services/fragmentationAnalysis/Request';
import Sidebar from './Layout/SideBar';
import axios from 'axios';
import Capture from './view/pages/Services/fragmentationAnalysis/Capture';
import RequestForm from './view/pages/Services/fragmentationAnalysis/RequestForm';
import TruckBoulderReport from './view/pages/Services/TruckVolumn/TruckBoulderDetection/Report';
import TruckVolumeReport from './view/pages/Services/TruckVolumn/TruckVolumeAnalysis/Report';
import FragmentationReport from './view/pages/Services/fragmentationAnalysis/Report';
import Driver from './view/pages/Master/Driver';
import CummulativeReport from './view/pages/Services/TruckVolumn/TruckVolumeAnalysis/CummulativeReport';
import Blast from './view/pages/Master/Blast';
import Charge from './view/pages/Master/Charge';
import {setLoading, setToast} from "./redux/actions";
import { connect } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import jwt_decode from 'jwt-decode';
import BlastReport from './view/pages/Report/BlastReport';
import VolumeReport from './view/pages/Report/VolumeReport';
import BoulderReport from './view/pages/Report/BoulderReport';
import Setting from './view/pages/Setting';
import VolumeCapture from './view/pages/Services/TruckVolumn/TruckVolumeAnalysis/VolumeCapture';
import ScanCapture from './view/pages/Services/TruckVolumn/TruckVolumeAnalysis/ScanCapture';
import jwtDecode from 'jwt-decode';

function App(props) {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const loggedInUser = localStorage.getItem("userDetails");

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = () => {
    if(loggedInUser) {
      setUserDetails(loggedInUser);
      setIsAuth(true);
      axios.interceptors.request.use(
        request => {
          if (request.url.includes("/")) {
            request.headers['Authorization'] = 'Bearer ' + loggedInUser;
            request.headers['Pragma'] = 'no-cache'
            request.headers['Cache-Control'] = 'no-cache'
          }
          return request;
        },
        error => {
          console.log(error)
          return Promise.reject(error);
        }
      )
      axios.interceptors.response.use(undefined,
        error => {
          if (error.response) {
            if (error.response.status === 401) {
              localStorage.clear();
              caches.keys().then((names) => {
                names.forEach((name) => {
                  caches.delete(name);
                });
              });
            } else if(error.response.data.includes('ECONNREFUSED')) {
              // Request made and server responded
              console.log("1", error.response.data);
              console.log("2", error.response.status);
              console.log("3", error.response.headers);
            }
          } else if (error.request) {
            // The request was made but no response was received
            console.log("4", error.request);
          }
  
          return Promise.reject(error);
        }
      )
      axios.interceptors.response.use((response) => {
        console.log("You are not authorized 0");
        console.log(response)
        if(response.status === 401) {
          console.log("You are not authorized");
          navigate('/login')
          setIsAuth(false);
          localStorage.clear();
          caches.keys().then((names) => {
            names.forEach((name) => {
              caches.delete(name);
            });
          });
        }
        return response;
      }, (error) => {
        if (error.response && error.response.data) {
          console.log("You are not authorized 1");
            navigate('/login')
            setIsAuth(false);
            localStorage.clear();
            caches.keys().then((names) => {
              names.forEach((name) => {
                caches.delete(name);
              });
            });
            return Promise.reject(error.response.data);
        }
        console.log("You are not authorized 2");
        navigate('/login')
        setIsAuth(false);
        localStorage.clear();
        caches.keys().then((names) => {
          names.forEach((name) => {
            caches.delete(name);
          });
        });
        return Promise.reject(error.message);
      });
    }
  };

  console.log(isAuth);
  return (
    <Box className="App" style={{ minHeight: '100vh' }}>
      <Backdrop open={props.loading} style={{ zIndex: 1500 }}><CircularProgress color="inherit" /></Backdrop>
      <main>
      {isAuth && <Sidebar />}
        <Routes>
          <Route path="/" exact element={isAuth ? <Dashboard user={userDetails} /> : <Login/>}>
          </Route>
            <Route path='/login' exact element={<Login/>} />
            <Route path='/dashboard' exact element={isAuth ? <Dashboard user={userDetails} /> : <Login />} />
            <Route path='/truck' exact  element={isAuth ? <Truck user={userDetails} /> : <Login/>} />
            <Route path='/truckForm' exact element={isAuth ? <TruckForm user={userDetails} /> : <Login/>} />
            <Route path='/mine' exact  element={isAuth ? <Mine user={userDetails} /> : <Login/>} />
            <Route path='/driver' exact element={isAuth ? <Driver user={userDetails} /> : <Login/>} />
            <Route path='/blast' exact element={isAuth ? <Blast user={userDetails} /> : <Login/>} />
            <Route path='/charge' exact element={isAuth ? <Charge user={userDetails} /> : <Login/>} />
            <Route path='/blastReport' exact element={isAuth ? <BlastReport user={userDetails} /> : <Login/>} />
            <Route path='/settings' exact element={isAuth ? <Setting user={userDetails} /> : <Login/>} />
            <Route path='/boulderReport' exact element={isAuth ? <BoulderReport user={userDetails} /> : <Login/>} />
            <Route path='/volumeReport' exact element={isAuth ? <VolumeReport user={userDetails} /> : <Login/>} />
            <Route path='/cummulativeReport' exact element={isAuth ? <CummulativeReport user={userDetails} /> : <Login/>} />
            <Route path='/fragmentationAnalysisRequest' exact element={isAuth ? <Request user={userDetails} /> : <Login/>} />
            <Route path='/fragmentationAnalysisReport' exact element={isAuth ? <FragmentationReport user={userDetails} /> : <Login/>} />
            <Route path='/fragmentationAnalysisCapture' exact element={isAuth ? <Capture user={userDetails} /> : <Login/>} />
            <Route path='/volumeCapture' exact element={isAuth ? <VolumeCapture user={userDetails} /> : <Login/>} />
            <Route path='/scanCapture' exact element={isAuth ? <ScanCapture user={userDetails} /> : <Login/>} />
            <Route path='/fragmentationAnalysisRequest-Form' exact element={isAuth ? <RequestForm user={userDetails} /> : <Login/>} />
            <Route path='/truckboulderdetection-Report' exact element={isAuth ? <TruckBoulderReport user={userDetails} /> : <Login/>} />
            <Route path='/truckvolumeanalysis-Report' exact element={isAuth ? <TruckVolumeReport user={userDetails} /> : <Login/>} />
        </Routes>
      </main>
    </Box>
  );
}


const mapStateToProps = state => ({
  loading: state.loading,
  toast: state.toast,
});

const mapDispatchToProps = {
  setLoading,
  setToast,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);