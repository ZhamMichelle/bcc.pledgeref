import React, { useState, useEffect } from 'react'
import {Grid, TextField, Select, InputLabel, FormControl, Input} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from "axios";
import { Pos,Services} from '../api/Services';

const typeStreetSelect=['ул','мкр','проспект', 'переулок', 'жилой массив'];
const cities: string[] = [
    "Алматы",
    "Актау",
    "Нур-Султан",
    "Актобе",
    "Атырау",
    "Жезказган",
    "Караганда",
    "Кокшетау",
    "Костанай",
    "Кызылорда",
    "Павлодар",
    "Петропавловск",
    "Семей",
    "Талдыкорган",
    "Тараз",
    "Усть-Каменогорск",
    "Уральск",
    "Шымкент",
    "Туркестан",
  ];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '80%',
    },
    container: {
      maxHeight: 440,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    input: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);
export const RefSector = () =>{
    const classes = useStyles();
    const [city, setCity] = useState("Актобе");

    const [typeStreet, setTypeStreet] = useState("");
    const [street, setStreet] = useState("");
    const [house, setHouse] = useState();
    const [sector, setSector] = useState();
    const [result, setResult] = useState();

    const [pos, setPos] = useState([] as Pos[]);
    var services = new Services();
const onSubmit = (e:any) =>{
    e.preventDefault();
    
  services.YandexApi(city,typeStreet.replace(" ", "+"),street.replace(" ", "+"),house).then(str=>setResult(str))
}

useEffect(()=>{
     var XMLParser = require('react-xml-parser');
     if(!!result){
     var xml = new XMLParser().parseFromString(result);  
     setPos(xml.getElementsByTagName('pos'))
    }
},[result])

useEffect(()=>{
if(!!pos[0]?.value){
  services.getSector(pos[0]?.value, city).then(json=>setSector(json))
}
},[pos])

    return(
        <>
        <React.Fragment>
            
        <h2 style={{textAlign: 'center'}}>Тест секторов</h2>
        <form onSubmit={(e: any) =>
              onSubmit( e)}>
        <Grid className={classes.paper} container spacing={3}>
                <Grid item xs={1}>
                <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="city">Город</InputLabel>
              <Select
                native
                required
                value={city}
                onChange={(e: any) => {setCity(e.target.value)}}
                label="Город"
                style={{width: "150px" }}
              >
                <option></option>
                {cities.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={1}>
             <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Тип улицы</InputLabel>
              <Select
                native
                required
                value={typeStreet}
                onChange={(e: any) => { setTypeStreet(e.target.value)}}
                label="Тип улицы"
                style={{width: "150px" }}
              >
                <option></option>
              {typeStreetSelect.map((m,i)=>(<option key={i} value={m}>{m}</option>))}
              </Select>
            </FormControl>
            </Grid>
            <Grid item xs={2} className={classes.formControl}>
              <TextField required id="outlined-basic" variant="outlined" label="Улица" value={street} style={{ width: "350px" }} 
              onChange={(e: any) =>  setStreet(e.target.value)}/>
              </Grid>
             {/* <br/><br/> */}
             <Grid item xs={2} className={classes.formControl}>
              <TextField required id="outlined-basic" variant="outlined" label="Дом" value={house} style={{ width: "350px" }} 
              onChange={(e: any) => setHouse(e.target.value)}/>
              </Grid>
              <Grid item xs={12}>
              <div style={{ textAlign: 'center' }}>
                         <input type="submit" value="Получить сектор" className='pxbutton'/>  
            </div> 
              </Grid>
              </Grid>
              </form>
<Grid item xs={12}>
                {!!sector || sector==0 ? <h2 style={{ textAlign: 'center' }}>Сектор {sector!=0 ? sector : " отсутствует!"}</h2> : <></>}
</Grid>

        </React.Fragment>
        </>
    )
}