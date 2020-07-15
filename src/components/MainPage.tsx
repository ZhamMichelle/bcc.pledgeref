import React, { useState, ChangeEvent, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AnalysisElements, ListService, FormState, Element, UploadService } from '../api/Services';
import Grid from '@material-ui/core/Grid';
import {FormControl, Select, InputLabel} from "@material-ui/core";
import {Elements} from './Elements'
import { Switch, Route } from "react-router-dom";

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
export const MainPage = (props: any)=>{
const { match: _match }: { match: any } = props;
    const classes = useStyles();
const [city, setCity] = useState("");
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
return (
        <React.Fragment>
<h2 style={{textAlign: 'center'}}>Заполнение и корректировка справочника</h2>
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
        <input type='file' id='input' style={{float: "right"}} onChange={(e)=>onFileChange(e)}/>
        <Elements city="Актау"
        // filter={(elements || []).map(m => m.id)}
              formState={FormState.READ}
            />
        </React.Fragment>
    )
}