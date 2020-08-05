import React, { useState, useEffect } from 'react'
import {Grid, TextField, Select, InputLabel, FormControl, Input} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from "axios";

const typeStreetSelect=['ул','мкр','проспект'];
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
    const [typeStreet, setTypeStreet] = useState("ул");
    const [street, setStreet] = useState("Шабыт");
    const [house, setHouse] = useState(135);
    const [sector, setSector] = useState();
    const [result, setResult] = useState();
const onSubmit = (e:any) =>{
    e.preventDefault();
    console.log("onsubmit")
    console.log("url", `https://geocode-maps.yandex.ru/1.x/?apikey=91c2baf4-ae67-4844-b63b-0ae832e8b051&geocode=${city}+${typeStreet}+${street}+${house}`,
    )
      axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=91c2baf4-ae67-4844-b63b-0ae832e8b051&geocode=${city}+${typeStreet}+${street}+${house}`,
        // `https://geocode-maps.yandex.ru/1.x/?apikey=91c2baf4-ae67-4844-b63b-0ae832e8b051&geocode=Алматы+Жарокова+169`,
        ).then(json=>setResult(json.data));
}

useEffect(()=>{
    console.log("result",result)
    
    console.log("typeStreet",typeStreet)
    
    console.log("street",street)
    console.log("house",house)

},[result])

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


        </React.Fragment>
        </>
    )
}