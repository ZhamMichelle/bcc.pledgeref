import React, { useState, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Grid, TextField, MenuItem} from '@material-ui/core';
import {FormControl, Select, InputLabel} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    adds: {
        padding: theme.spacing(2),
      },
  }),
);

export const AddAnalysis = () =>{
  debugger;
  const PropertyType: Map<string, string> = new Map([
    ['Квартира', "001"],
    ['Жилой дом', "002"],
    ['Встроенное помещение', "003"]
  ]);
  var PropertyTypes = {'Квартира': "001", 'Жилой дом': "002", 'Встроенное помещение': "003"}
    const classes = useStyles();
    const [prType, setPrType] = useState();
useEffect(()=>{console.log("test",PropertyType.keys());
PropertyType.forEach((value,key,map)=>{
  console.log("key",map)
})
},[])
    return(
        <div className={classes.root}>
    <Grid container spacing={2} className={classes.paper}>
    <Grid item xs={12} className={classes.paper}>
        <h2>Добавить новый элемент</h2> 
    </Grid>
   

<Grid item xs={12}>
<TextField id="standard-basic" label="Город" />
</Grid>
<Grid item xs={12}>
<TextField id="standard-basic" label="Сектор города" />
</Grid>

<Grid item xs={12}>

{/* <InputLabel htmlFor="demo-simple-select-label">Тип недвижимости по справочнику</InputLabel> */}
        <Select
          native
          value={prType}
          onChange={(e: any) => {
            setPrType( e.currentTarget.value );
          }}
          label="Тип недвижимости по справочнику"
          style={{ height: "50px", width: "280px" }}
        >
      <option>Выберите тип недвижимости</option>
      {Object.entries(PropertyTypes)
  .map( ([key, value]) => (
  <option key={key} value={value}>{key}</option>
  ))}
     
        </Select>
</Grid>
</Grid>
        </div>
    )
}