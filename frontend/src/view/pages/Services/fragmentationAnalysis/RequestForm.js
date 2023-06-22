import React, { Component , useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate,Navigate, withRouter } from 'react-router-dom';

function RequestForm(props) {
    console.log(props)
    const fetchCallBack = props.callback;
    const [value, setValue] = useState(0);
    const row = props.data;
    const frag_id = props.data.frag_id;
    const [blurImg, setBlurImg] = useState("");
    const [thresh, setThresh] = useState(0);
    const [limit, setLimit] = useState(1.25);
    const [enhanceImg, setEnhanceImg] = useState("");
    const [analyseImg, setAnalyseImg] = useState("");
    const [blur, setBlur] = useState(false);
    const [enhance, setEnhance] = useState(false);
    const [analyze, setAnalyze] = useState(false);
    const [low, setLow] = useState(100);
    const [high, setHigh] = useState(200);
    const [kernel, setKernel] = useState(3);
    const [iteration1, setIteration1] = useState(5);
    const [iteration2, setIteration2] = useState(3);
    const [analyzeData, setAnalyzeData] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{

    },[props])

    const handleBlur =()=>{
        setEnhance(false)
        const newData={
            "image": row.image,
            "blur": parseInt(value)
        }
        const url=`http://${process.env.REACT_APP_SERVICE}/services/fragSense/blurSharpen`;
        axios({
            url: url,
            method: 'POST',
            data: newData
        }).then(response => {
            setBlurImg(response.data.data[0])
            if(response.data.data.length>0){
                setBlur(true);
            }
        }).catch(error => {
          console.log(error)
        })
    }

    const handleEnhance =()=>{
        const newData={
            "image":blurImg,
            "thresh": parseInt(thresh),
            "clip_limit": parseInt(limit)
        }
        const url=`http://${process.env.REACT_APP_SERVICE}/services/fragSense/clahe`;
        axios({
            url: url,
            method: 'POST',
            data: newData
        }).then(response => {
            setEnhanceImg(response.data.data[0])
            if(response.data.data.length>0){
                setEnhance(true);
                setBlur(false);
            }
        }).catch(error => {
          console.log(error)
        })
    }

    const handleAnalyse =()=>{
        const newData={
            "imageProcessed":blurImg,
            "imageRaw":row.image,
            "lowCanny": parseInt(low),
            "highCanny": parseInt(high),
            "kernelMorph": parseInt(kernel),
            "morphIterations": parseInt(iteration1),
            "dilateIterations": parseInt(iteration2),
            "blastId" : row.blastId,
            "mineId" : row.mineId,
            "fragId": frag_id
        }
        const url=`http://${process.env.REACT_APP_SERVICE}/services/fragSense/analyze`;
        axios({
            url: url,
            method: 'POST',
            data: newData
        }).then(response => {
            console.log(response.data)
            setAnalyzeData(response.data.data[0])
            setAnalyseImg(response.data.data[0].image)
            if(response.data.data.length>0){
                setAnalyze(true);
                setBlur(false);
                setEnhance(false);
            }
        }).catch(error => {
          console.log(error)
        })
    }

    const handleSubmit =()=>{
        console.log(analyzeData)
        const newData={
            frag_id: frag_id,
            mine_reg_no: row.mineId,
            is_processed: true,
            blur: parseFloat(value),
            clahe_threshold: parseFloat(thresh),
            clahe_clip_limit: parseFloat(limit),
            mosper_iteration: parseFloat(iteration1),
            kernel: parseFloat(kernel),
            dilate_iteration: parseFloat(iteration2),
            image_desc: row.fileName,
            x_axis_data: analyzeData.graph.x_axis,
            y_axis_data: analyzeData.graph.y_axis,
            blast_efficiency: analyzeData.blast_efficiency
        }
        const url=`/updateFragById`;
        axios({
            url: url,
            method: 'PATCH',
            data: newData
        }).then(response => {
            console.log(response.data)
            fetchCallBack();
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
            <Grid container spacing={3} className='formtextfield'>
                <Grid item xs={6} key={row.fileName}>
                    <label>Mine ID : {row.mineId}</label>
                    {blur ? <img src={`${blurImg}`} className='requestImg2'/>: enhance ? <img src={`${enhanceImg}`} className='requestImg2'/> : analyze ? <img src={`${analyseImg}`} className='requestImg2'/>:<img src={`${row.image}`} className='requestImg2'/>}
                </Grid>
                <Grid item xs={6} key={row.fileName} style={{marginTop:'2rem'}}>
                    <label>Intensity : </label>
                    <TextField type='number' size="small" value={value}  onChange={(e)=>setValue(e.target.value)} style={{marginTop:'0.5rem'}} />
                    <Button type='submit' variant="contained" size="small" onClick={handleBlur} style={{marginTop:'0.5rem',borderRadius: '20px', float:'right'}}>Blur/Sharpen</Button><br/><br/>
                    <label>Threshold : </label>
                    <TextField type='number' size="small" value={thresh} onChange={(e)=>setThresh(e.target.value)} style={{marginTop:'0.5rem'}} /><br/><br/>
                    <label>Limit : </label>
                    <TextField type='number' size="small" value={limit} onChange={(e)=>setLimit(e.target.value)} style={{marginTop:'0.5rem'}} />
                    <Button type='submit' variant="contained" size="small" onClick={handleEnhance} disabled={blurImg!=""?false:true} style={{marginTop:'0.5rem',borderRadius: '20px', float:'right'}}>Enhance</Button>
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{paddingLeft:"2rem"}}>
                <Grid item xs={2.3}>
                    <label>Low : </label>
                    <TextField type='number' size="small" value={low}  onChange={(e)=>setLow(e.target.value)} style={{marginTop:'0.5rem'}} />
                </Grid>
                <Grid item xs={2.3}>
                    <label>High : </label>
                    <TextField type='number' size="small" value={high}  onChange={(e)=>setHigh(e.target.value)} style={{marginTop:'0.5rem'}} />
                </Grid>
                <Grid item xs={2.3}>
                    <label>Kernel : </label>
                    <TextField type='number' size="small" value={kernel}  onChange={(e)=>setKernel(e.target.value)} style={{marginTop:'0.5rem'}} />
                </Grid>
                <Grid item xs={2.3}>
                    <label>Iteration 1 : </label>
                    <TextField type='number' size="small" value={iteration1}  onChange={(e)=>setIteration1(e.target.value)} style={{marginTop:'0.5rem'}} />
                </Grid>
                <Grid item xs={2.3}>
                    <label>Iteration 2 : </label>
                    <TextField type='number' size="small" value={iteration2}  onChange={(e)=>setIteration2(e.target.value)} style={{marginTop:'0.5rem'}} />
                </Grid><br/>
                <Button type='submit' variant="contained" size="small" onClick={handleAnalyse} disabled={enhanceImg!=""?false:true} style={{marginTop:'1rem',marginLeft: '2rem',borderRadius: '20px', marginBottom: '2rem'}}>Analyse</Button> &nbsp;
                <Button type='submit' variant="contained" size="small" onClick={handleSubmit} disabled={enhanceImg!=""?false:true} style={{marginTop:'1rem',borderRadius: '20px', marginBottom: '2rem'}}>Submit</Button>
            </Grid>
        </Box> 
    );
}

export default RequestForm;