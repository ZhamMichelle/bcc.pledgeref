import React, { useState, useEffect, ChangeEvent } from 'react'
import {Grid, TextField, Select, InputLabel, FormControl, Input} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from "axios";
import { Pos,Services, UserContext} from '../api/Services';

const typeStreetSelect=['ул','мкр','проспект', 'переулок', 'жилой массив', 'квартал', 
'аллея',
'бульвар',
'воинская часть',
'дорога',
'заимка',
'застава',
'лесхоз','линия','набережная','площадь','проезд','трасса','тупик','шоссе','зимовка',];
const cities: string[] = [
    "Алматы",
    "Актау",
    "Нур-Султан",
    "Актобе",
    "село Каргалы",
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
  const localities: string[] = [
    "Каргалы",
    "Акжар",
    "Кызылжар",
  ];
  const typeLocalities: string[] =[
    "село",
    "поселок",
  ]

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
    const [typeLocCity, setTypeLocCity] = useState('Город')
    const [typeLocality, setTypeLocality] = useState('')
    const [locality, setLocality] = useState('')
    const [typeStreet, setTypeStreet] = useState('');
    const [street, setStreet] = useState('');
    const [house, setHouse] = useState('');
    const [sector, setSector] = useState('');
    const [result, setResult] = useState('');
    const [uploadResult, setUploadResult] = useState("");
    const [username, setUsername] = useState(new UserContext());
    const [helperAlert, setHelperAlert] = useState(false);
    const [pos, setPos] = useState([] as Pos[]);
    const [cityDelete, setCityDelete] = useState("")
    const [typeDelete, setTypeDelete] = useState("")
    const [fileName, setFileName] = useState("")
    var services = new Services();
const onSubmit = (e:any) =>{
  e.preventDefault();
  services.YandexApi(typeLocCity,typeLocality,locality,city,typeStreet.replace(" ", "+"),street.replace(" ", "+"),house).then(str=>setResult(str)) 
}

const onDeleteSector = (e:any)=>{
  e.preventDefault();
  services.DeleteSector(cityDelete, typeDelete).then(json=>{setUploadResult(json); setHelperAlert(!helperAlert)})
}

useEffect(()=>{setUsername(JSON.parse(localStorage.getItem("userContext") || '{}'))},[]);
useEffect(()=>{
     var XMLParser = require('react-xml-parser');
     if(!!result){
     var xml = new XMLParser().parseFromString(result);  
     setPos(xml.getElementsByTagName('pos'))
    }
},[result])

useEffect(()=>{
if(!!pos[0]?.value){
  services.getSector(pos[0]?.value, city, typeLocCity).then(json=>setSector(json))
}
},[pos])

const onFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //debugger;
  const obj = {hello: 'world'};
  const blob1 = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
  var file = e.target.files;
  setFileName(file?.[0]?.name || "");
  var formData = new FormData();
  formData.append('body', file?.[0] || blob1);
  if(!!file){
    services.postExcelCoordinates(formData, username.user?.fullName || "").then(json=>{setUploadResult(json); setHelperAlert(!helperAlert)})
  }
}
useEffect(()=>{
  if(uploadResult==="Ok") {
    alert("Файл загружен")
  }
  else if(uploadResult.includes("Пустое")) alert( `Ошибка! ${uploadResult}`)
  else if(uploadResult.includes("формат")) alert( `Ошибка! ${uploadResult}`)
  else if(uploadResult==="Error") alert("Ошибка в формате данных!")
  else if(uploadResult==="Deleted") alert("Удалено успешно!")
  else if(uploadResult==="NoData") alert("Не найден данный сектор!")
  else if(uploadResult==="Error delete") alert("Произошла ошибка!")
  },[ helperAlert])
    return(
        <>
        <React.Fragment>
            
        <h2 style={{textAlign: 'center'}}>Тест и загрузка секторов</h2>
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
              <InputLabel htmlFor="locality">Тип нас. пункта</InputLabel>
              <Select
                native
                required
                value={typeLocCity}
                onChange={(e: any) => {setTypeLocCity(e.target.value)}}
                label="Тип нас. пункта"
                style={{width: "160px" }}
              >
                  <option key={1} value={"Город"}>Город</option>
                  <option key={2} value={"Нас. пункт"}>Нас. пункт</option>
              </Select>
            </FormControl>
            </Grid>
            {typeLocCity!="Город" ? 
            <>
            <Grid item xs={1}>
            <TextField required id="outlined-basic" variant="outlined" label="Тип адм. центра" value={typeLocality} style={{ width: "170px" }} 
              onChange={(e: any) =>  setTypeLocality(e.target.value)}/>
            </Grid>
            <Grid item xs={1}>
            <TextField required id="outlined-basic" variant="outlined" label="Нас. пункт" value={locality} style={{ width: "160px" }} 
              onChange={(e: any) =>  setLocality(e.target.value)}/>
            </Grid> </> : <></>
          }
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
              
             
              <Grid item xs={12} className={classes.formControl}>
              {/* <div id="my_bar">
               <input id="test" type="text" name="example" list="exampleList" style={{ width: "350px"  }} />
              <datalist id="exampleList">
                <option value="A"/>  
                <option value="B"/>
              </datalist> 
              </div> */}
              </Grid>
              <Grid item xs={12}>
              <div style={{ textAlign: 'center' }}>
                         <input type="submit" value="Получить сектор" className='pxbutton'/>  
            </div> 
              </Grid>
              </Grid>
              </form>
<Grid item xs={12}>
                {!!sector ? <h2 style={{ paddingLeft: '40px' }}>Сектор {sector}</h2> : <></>}
</Grid>
<hr/>
<br/><br/><br/><br/>
<form onSubmit={(e: any) =>
              onDeleteSector( e)}>
<Grid><div style={{paddingLeft: "20px"}}>Выберите город и тип нас. пункта для удаления указанного сектора(ов):</div></Grid>
<br/>
<Grid item xs={12} className={classes.formControl}>  <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="city">Город</InputLabel>
              <Select
                native
                required
                value={cityDelete}
                onChange={(e: any) => {setCityDelete(e.target.value)}}
                label="Город"
                style={{width: "150px"}}
              >
                <option></option>
                {cities.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="locality">Тип нас. пункта</InputLabel>
              <Select
                native
                required
                value={typeDelete}
                onChange={(e: any) => {setTypeDelete(e.target.value)}}
                label="Тип нас. пункта"
                style={{width: "160px" }}
              >
                <option></option>
                  <option key={1} value={"Город"}>Город</option>
                  <option key={2} value={"Нас. пункт"}>Нас. пункт</option>
              </Select>
            </FormControl>
            <input type='submit' value='Удалить сектор' className='pxbutton' style={{ height: "55px"}}/>  
            </Grid>
            </form>
            <br/><br/><br/><br/>
            <Grid><div style={{paddingLeft: "20px"}}>Загрузить сектор(а):</div> 
            <br/>   
            <input type='file' id='input' style={{paddingLeft: "20px"}} onChange={(e)=>onFileChange(e)}/></Grid>
        </React.Fragment>
        </>
    )
}