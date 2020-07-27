import React from "react";
import { NavLink } from "react-router-dom";
import logo from './logo-bcc.svg';
import {Grid, Button} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
//import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
  },
  }),
 
);

export const NavbarUp = () =>{
  const classes = useStyles();
  return(
    <React.Fragment>
 
     <Grid container spacing={0}>
        <Grid item xs={9} container spacing={0}>
          <Grid item xs={1}><img src={logo} style={{ paddingLeft: "90px", paddingTop: "14px",  }} /></Grid>
      
      <Grid item xs={7} style={{marginTop:'1px'}}><h2>Справочник</h2></Grid>
       
       </Grid>
       <Grid item xs={3}>
       <Button variant="outlined" color="primary" href="/" style={{color:'#27ae60', marginTop:'12px'}} >Анализ цен</Button>
       &nbsp;&nbsp;
       <Button variant="outlined" color="primary" href="/logging" style={{color:'#27ae60', marginTop:'12px', }} >История</Button>
       &nbsp;&nbsp;
       <Button variant="outlined" color="primary" href="/refsector" style={{color:'#27ae60', marginTop:'12px'}} >
       Справочник по секторам</Button>
        </Grid>
        </Grid>
    </React.Fragment>
)
}