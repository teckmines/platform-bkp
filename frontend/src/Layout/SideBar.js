import React, { Component , useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { makeStyles,withStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import styles from "../Assets/Styles/sidenav.module.css"
import { NavLink } from "react-router-dom";
import LOGO from '../Assets/Images/Logo.png';
import { FcHome, FcAutomatic, FcTemplate, FcInTransit , FcViewDetails } from "react-icons/fc";


const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
      },
      links: {
        textDecoration:'none',
        color: '#333333'
      },
      active: {
        textDecoration:'none',
        color: '#3368FA'
      },
      menuHeader: {
        paddingLeft: '30px'
      }
}));

function MyNavLink(props) {
    return <NavLink {...props} activeclassname="active" />;
}

function Sidebar(props) {
    const classes = useStyles();
    const { window } = props;
    const [open, setopen] = useState(true);
    const [l1Open, setL1Open] = React.useState(true);
    const [l2Open, setL2Open] = React.useState(false);
    const [l3Open, setL3Open] = React.useState(false);
    const [l4Open, setL4Open] = React.useState(false);
    const [l5Open, setL5Open] = React.useState(false);
    const [l6Open, setL6Open] = React.useState(false);
    const [l7Open, setL7Open] = React.useState(false);


    const handleL1Click = () => {
        setL1Open(!l1Open)
        setL3Open(false)
        setL4Open(false)
        setL2Open(false)
        setL5Open(false)
        setL6Open(false)
        setL7Open(false)
    }

    const handleL2Click = () => {
        setL2Open(!l2Open)
        setL1Open(false)
        setL3Open(false)
        setL4Open(false)
        setL5Open(false)
        setL6Open(false)
        setL7Open(false)
    }

    const handleL3Click = () => {
        setL3Open(!l3Open)
        setL2Open(false)
        setL1Open(false)
        setL4Open(false)
        setL5Open(false)
        setL6Open(false)
        setL7Open(false)
    }

    const handleL4Click = () => {
        setL4Open(!l4Open)
        setL3Open(false)
        setL1Open(false)
        setL2Open(false)
        setL5Open(false)
        setL6Open(false)
        setL7Open(false)
    }

    const handleL5Click = () => {
        setL5Open(!l5Open)
        setL3Open(false)
        setL1Open(false)
        setL4Open(false)
        setL6Open(false)
        setL7Open(false)
    }

    const handleL6Click = () => {
        setL6Open(!l6Open)
        setL3Open(false)
        setL1Open(false)
        setL5Open(false)
        setL4Open(false)
        setL7Open(false)
    }

    const handleL7Click = () => {
        setL7Open(!l7Open)
        setL3Open(false)
        setL1Open(false)
        setL5Open(false)
        setL6Open(false)
        setL4Open(false)
    }

  return (
    <Box className='sidebarbox' >
      <CssBaseline />
      <List className={styles.sideitem} sx={{[`& .active`]: { background: "#bfe1f3", borderRadius: "10px", width: '16rem' , "& svg": { fill: "#00b900" }}}}>
        <img src={LOGO} variant='h3'  className="sidebarImg"/>
        <ListItem component={MyNavLink} to="/dashboard" className={ classes.links }>
            <ListItemIcon><FcHome className='svgiconcss'/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItemButton onClick={handleL1Click}>
        <ListItemIcon><FcViewDetails className='svgiconcss'/>
        </ListItemIcon>
        <ListItemText primary="Master Data" />
        {l1Open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={l1Open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem component={MyNavLink} to="/driver" className={ classes.links } style={{left:'1rem'}}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Driver" />
          </ListItem>
        <ListItem component={MyNavLink} to="/truck" className={ classes.links } style={{left:'1rem'}}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Truck" />
          </ListItem>
          <ListItem component={MyNavLink} to="/mine" className={ classes.links } style={{left:'1rem'}}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Mine" />
          </ListItem>
          {/* <ListItem component={MyNavLink} to="/charge" className={ classes.links } style={{left:'1rem'}}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Charge" />
          </ListItem> */}
          <ListItem component={MyNavLink} to="/blast" className={ classes.links } style={{left:'1rem'}}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Blast" />
          </ListItem>
        </List>
        </Collapse>
      <ListItemButton onClick={handleL2Click}>
        <ListItemIcon><FcInTransit className='svgiconcss'/>
        </ListItemIcon>
        <ListItemText primary="Services" />
        {l2Open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
        <Collapse in={l2Open} timeout="auto" unmountOnExit>
            <ListItemButton onClick={handleL5Click}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Fragmentation Analysis" />
                {l5Open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={l5Open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem component={MyNavLink} to="/fragmentationAnalysisCapture" className={ classes.links } style={{left:'1rem'}}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Capture" />
                    </ListItem>
                    <ListItem component={MyNavLink} to="/fragmentationAnalysisRequest" className={ classes.links } style={{left:'1rem'}}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Request" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItemButton onClick={handleL6Click}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Truck Volume Analysis" />
                {l6Open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={l6Open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem component={MyNavLink} to="/volumeCapture" className={ classes.links } style={{left:'1rem'}}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Capture" />
                    </ListItem>
                    <ListItem component={MyNavLink} to="/scanCapture" className={ classes.links } style={{left:'1rem'}}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Scan" />
                    </ListItem>
                    <ListItem component={MyNavLink} to="/truckvolumeanalysis-Report" className={ classes.links } style={{left:'1rem'}}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Report" />
                    </ListItem>
                    {/* <ListItem component={MyNavLink} volumeCaptureto="/cummulativeReport" className={ classes.links } style={{left:'1rem'}}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Cummulative Report" />
                    </ListItem> */}
                </List>
            </Collapse>
            <ListItemButton onClick={handleL7Click}>
                <ListItemIcon>
                </ListItemIcon>
                <ListItemText primary="Truck Boulder Detection" />
                {l7Open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={l7Open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem component={MyNavLink} to="/truckboulderdetection-Report" className={ classes.links } style={{left:'1rem'}}>
                        <ListItemIcon>
                        </ListItemIcon>
                        <ListItemText primary="Report" />
                    </ListItem>
                </List>
            </Collapse>
        </Collapse>
        <ListItemButton onClick={handleL3Click}>
        <ListItemIcon><FcTemplate className='svgiconcss'/>
        </ListItemIcon>
        <ListItemText primary="Reports" />
        {l3Open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={l3Open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
          <ListItem component={MyNavLink} to="/fragmentationAnalysisReport" className={ classes.links } style={{left:'1rem'}}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="Fragmentation Report" />
          </ListItem>
        <ListItem component={MyNavLink} to="/volumeReport" className={ classes.links } style={{left:'1rem'}}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Volume Report" />
        </ListItem>
        <ListItem component={MyNavLink} to="/boulderReport" className={ classes.links } style={{left:'1rem'}}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Boulder Report" />
          </ListItem>
          <ListItem component={MyNavLink} to="/blastReport" className={ classes.links } style={{left:'1rem'}}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Blast Report" />
          </ListItem>
        </List>
        </Collapse>
        <ListItemButton onClick={handleL4Click}>
        <ListItemIcon><FcAutomatic className='svgiconcss'/>
        </ListItemIcon>
        <ListItemText primary="Settings" />
        {l4Open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={l4Open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem component={MyNavLink} to="/settings" className={ classes.links } style={{left:'1rem'}}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
        </Collapse>
        </List>
    </Box>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;