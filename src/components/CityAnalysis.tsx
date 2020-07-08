import React, {useState} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {FormControl, Select, InputLabel} from "@material-ui/core";
import {AnalysisPagination} from './AnalysisPagination'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
  }),
);
const cities: string[] = [
    "Алматы",
    "Актау",
    "Нур-Султан",
    "Нур-Султан Элит",
    "Актобе",
    "Атырау",
    "Жезказган",
    "Караганда",
    "Кокшетау",
    "Костанай",
    "Кызылорда",
    "Павлодар",
    "Петропавловск",
    "Рудный",
    "Семей",
    "Талдыкорган",
    "Тараз",
    "Усть-Каменогорск",
    "Уральск",
    "Шымкент",
    "Туркестан",
  ];


  
export const CityAnalysis = () =>{
    const classes = useStyles();
    const [city, setCity] = useState("");

    return(
        <div className={classes.root}>
      <Grid container spacing={3} >
      <Grid item xs={12} className={classes.paper}>
          <h2 style={{textAlign: 'center'}}>Заполнение и корректировка справочника</h2>
        </Grid>
        <Grid item xs={12} >
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Город</InputLabel>
        <Select
          native
          value={city}
          onChange={(e: any) => {
            setCity( e.currentTarget.value );
          }}
          label="Филиал"
          style={{ height: "50px", width: "280px" }}
        >
          <option>Выберите город</option>
          {cities.map((m, i) => (
            <option key={i} value={m}>
              {m}
            </option>
          ))}
        </Select>
      </FormControl>
      <button className="pxbutton">Вывести справочник</button>
        </Grid>
          <Grid item xs={3}>{<AnalysisPagination city={city}/>}</Grid>
       
      </Grid>
    </div>
    )
}