import React, {useState, useEffect, ChangeEvent} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {FormControl, Select, InputLabel} from "@material-ui/core";
import {AnalysisPagination} from './AnalysisPagination'
import {AddAnalysis} from './AddAnalysis'
import { UploadService } from '../api/Services';

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
    const [boolka, setBoolka] = useState(false)
    const [addBool, setAddBool] = useState(false)
    const [exitResult, setExitResult] = useState();
    const [uploadResult, setUploadResult] = useState();
    var uploadFile = new UploadService();

    const onFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const obj = {hello: 'world'};
      const blob1 = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
      var file = e.target.files;
      var formData = new FormData();
      formData.append('body', file?.[0] || blob1);
      if(!!file){
        uploadFile.getList(formData).then(json=>setUploadResult(json.data))
      }
  }
  useEffect(()=>{
    console.log("uploadResult",uploadResult);
    if(uploadResult==="Ok") {
      alert("Файл загружен")
    }
    else if(uploadResult==="Error") alert("Произошла ошибка. Попробуйте изменить содержимое файла.");
},[uploadResult])
    // useEffect(()=>{
    //   axios(
    //     `https://geocode-maps.yandex.ru/1.x/?apikey=91c2baf4-ae67-4844-b63b-0ae832e8b051&geocode=Алматы+Жарокова+169`,
    //   ).then(json=>setExitResult(json.data));
    // },[])
    // useEffect(()=>{
    //   console.log('coordinates', exitResult)
    // },[exitResult])
const getList = (e:any) =>{
    e.preventDefault();
    setBoolka(true);

    
}
    return(
        <div className={classes.root}>
      <Grid container spacing={3} >
      <Grid item xs={12} className={classes.paper}>
          <h2 style={{textAlign: 'center'}}>Заполнение и корректировка справочника</h2>
        </Grid>
        <Grid item xs={11} >
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Город</InputLabel>
        <Select
          native
          value={city}
          onChange={(e: any) => {
            setCity( e.currentTarget.value );
            setBoolka(!boolka)
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
      <button className="pxbutton" onClick={(e:any)=>{getList(e)}}>Вывести справочник</button>
      <input type='file' id='input' style={{float: "right"}} onChange={(e)=>onFileChange(e)}/>
    
        </Grid>
   {boolka ? <Grid item xs={12} container justify = "center">{<AnalysisPagination city={city}/>}</Grid> : <></>}
          {/* {city  ? <Grid item xs={12} container justify = "center">{<AnalysisPagination city={city}/>}</Grid> : <></>} */}
         <Grid item xs={12}>
         <hr className='hrtrait' />
         </Grid>
         <Grid item xs={12}>
         <AddAnalysis/>
         </Grid>
      </Grid>
    </div>
    )
}