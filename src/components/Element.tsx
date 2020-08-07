import React, {useState, useEffect, useContext} from 'react'
import { AppContext, history } from "../App";
import {Grid, TextField, Select, InputLabel, FormControl, Input} from '@material-ui/core';
import {  FormState, AnalysisElements, Services, UserContext,  } from '../api/Services';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import moment from "moment";
import Alert from '@material-ui/lab/Alert';
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}     
      thousandSeparator={" "}
      decimalSeparator={"."}
      isNumericString
      prefix={props.prefix} //"$"      
    />
  );
}



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

const PropertyType: Map<string, string> = new Map([
  ['Квартира', "001"],
  ['Жилой дом', "002"],
  ['Встроенное помещение', "003"]
]);
const helperPropertyType=['Квартира','Жилой дом','Встроенное помещение'];

const Layout: Map<string, string> = new Map([
  ['Обычная (кухня < 8 кв.м)', "001"],
  ['Улучшенная (кухня >= 8 кв.м)', "002"]
]);
const helperLayout=['Обычная (кухня < 8 кв.м)','Улучшенная (кухня >= 8 кв.м)'];

const DetailArea: Map<string, string> = new Map([
  ['до 100 кв.м.', "001"],
  ['от 100-200 кв.м.', "002"],
  ['>200 кв.м.', "003"]
]);
const helperDetailArea=['до 100 кв.м.','от 100-200 кв.м.','>200 кв.м.'];

export const Element = (props: any) =>{
    const classes = useStyles();
    const [analysis, setAnalysis] = useState(new AnalysisElements());
    const [username, setUsername] = useState(new UserContext());
    
  const { match, formState } = props;
  var services = new Services();
  useEffect(() => {
    if (formState === FormState.EDIT || formState === FormState.READ) {
    services.getIdElement(match.params.id).then(json => setAnalysis(json));
    }
    setUsername(JSON.parse(localStorage.getItem("userContext") || '{}'))
  }, []);
  

  useEffect(()=>{
    if(analysis.city!=null){
      services.getKatoCityCode(analysis.city || "").then(json=>setAnalysis({...analysis, cityCodeKATO:json.toString()}))
    }
    
  },[analysis.city])

  const onSubmit = (e: any, showToast: () => void) => {
    e.preventDefault();
    if (formState === FormState.CREATE) {
     
      services.postElement(analysis, username.user?.fullName || "").then(() => {
        // showToast();
        // alert("Успешно добавлен")
        history.goBack();
      });
    
      
    } else if (formState === FormState.EDIT) {
      
      services.putElement(analysis, username.user?.fullName || "").then(() => {
        // alert("Успешно изменен")
        // showToast();
        history.goBack();
      });
    }
  };

  const archAndNew = (e:any) =>{
    e.preventDefault();
    if(!!analysis.beginDate){
      var con = window.confirm("Вы действительно хотите архивировать и создать новый?");
      if (con) {
  services.archAndNewElement(analysis, username.user?.fullName || "").then(() => {
    history.goBack();
  });
}
    }
    else alert('Заполните поле "Дата начала параметра"')
  }

    return(
        <AppContext.Consumer>
 {({ showToastCreate, showToastEdit }) => (
        <fieldset
          style={{ border: 0, padding: 0 }}
          disabled={formState === FormState.READ}
        >
          <form className={classes.input}
            onSubmit={(e: any) =>
              onSubmit(
                e,
                formState === FormState.CREATE ? showToastCreate : showToastEdit
              )
            }
          >
              <h2 style={{textAlign: 'center'}}>{formState==FormState.READ ? <>Просмотр</> 
              : formState==FormState.EDIT ? <>Редактирование</> : <>Добавление</>}</h2>
              <Grid item xs={6} className={classes.paper} container spacing={3}>
                <Grid item xs={6}>
                <TextField required variant="outlined"  label="Код строки" value={analysis.code || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, code: e.target.value })
              }/> 
              <br/><br/>
              <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="city">Город</InputLabel>
              <Select
                native
                required
                value={analysis.city || ""}
                onChange={(e: any) => { setAnalysis({ ...analysis, city: e.target.value  })}}
                label="Город"
                style={{width: "450px" }}
              >
                <option></option>
                {cities.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </Select>
            </FormControl>
            <br/><br/>
            <TextField required variant="outlined"  label="Код города КАТО" value={analysis.cityCodeKATO || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, cityCodeKATO: e.target.value })
              }/> 
              <br/><br/>
              <TextField required variant="outlined"  label="Код сектора города" value={analysis.sectorCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, sectorCode: e.target.value })
              }/>
              <br/><br/>
              <TextField required variant="outlined"  label="Сектор города" value={analysis.sector || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, sector: parseInt(e.target.value)})
              }/>
              <br/><br/>
              <TextField variant="outlined"  label="Относительность расположения" value={analysis.relativityLocation || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, relativityLocation: e.target.value })
              }/>
              <br/><br/>
              <TextField required variant="outlined" label="Описание сектора города" value={analysis.sectorDescription || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, sectorDescription: e.target.value })
              }/>
              <br/><br/>
             <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Тип недвижимости по справочнику</InputLabel>
              <Select
                native
                required
                value={analysis.typeEstateByRef || ""}
                onChange={(e: any) => { setAnalysis({ ...analysis, typeEstateByRef: e.target.value, typeEstateCode: PropertyType.get(e.target.value)  })}}
                label="Тип недвижимости по справочнику"
                style={{width: "450px" }}
              >
                {/* {Array.from(PropertyType).map(([key,value])=>(<option key={key} value={value}>{key}</option>))} */}
                <option></option>
              {helperPropertyType.map((m,i)=>(<option key={i} value={m}>{m}</option>))}
              </Select>
            </FormControl>
              <br/><br/>
              <TextField required variant="outlined"  label="Код Типа недвижимости" value={analysis.typeEstateCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, typeEstateCode: e.target.value })
              }/>
              <br/><br/>
              <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Планировка квартир</InputLabel>
              <Select
                native
                required={analysis.typeEstateByRef=='Квартира' ? true : false}
                value={analysis.apartmentLayout || ""}
                onChange={(e: any) => { setAnalysis({ ...analysis, apartmentLayout: e.target.value, apartmentLayoutCode: Layout.get(e.target.value)  })}}
                label="Планировка квартир"
                style={{width: "450px" }}
              >
                <option></option>
              {helperLayout.map((m,i)=>(<option key={i} value={m}>{m}</option>))}
              </Select> 
              </FormControl>
              <br/><br/>
              <TextField required={analysis.typeEstateByRef=='Квартира' ? true : false} variant="outlined"  label="Код Планировка квартир" value={analysis.apartmentLayoutCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, apartmentLayoutCode: e.target.value })
              }/>
              </Grid>
              <Grid item xs={6}>
              <TextField required={analysis.typeEstateByRef=='Квартира' ? true : false} variant="outlined"  label="Код Материал стен" value={analysis.wallMaterialCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, wallMaterialCode: parseInt(e.target.value) })
              }/>
              <br/><br/>
              <TextField required={analysis.typeEstateByRef=='Квартира' ? true : false} variant="outlined"  label="Материал стен" value={analysis.wallMaterial || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, wallMaterial: e.target.value })
              }/>
              <br/><br/>
              <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Детализация площади по жилому дому</InputLabel>
              <Select
                native
                required={analysis.typeEstateByRef=='Жилой дом' ? true : false}
                value={analysis.detailArea || ""}
                onChange={(e: any) => { setAnalysis({ ...analysis, detailArea: e.target.value, detailAreaCode: DetailArea.get(e.target.value) })}}
                label="Детализация площади по жилому дому"
                style={{width: "450px" }}
              >
              <option></option>
              {helperDetailArea.map((m,i)=>(<option key={i} value={m}>{m}</option>))}
              </Select>
              </FormControl>
              <br/><br/>
              <TextField required={analysis.typeEstateByRef=='Жилой дом' ? true : false} variant="outlined"  label="Код детализации площади по жилому дому" value={analysis.detailAreaCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, detailAreaCode: e.target.value })
              }/> 
              <br/><br/>
              <TextField required variant="outlined"  label="Стоимость за кв.м., мин значение" 
              InputProps={{inputComponent: NumberFormatCustom}}
              value={ analysis.minCostPerSQM || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, minCostPerSQM: parseInt(e.target.value) })
              }/>
              <br/><br/>
              <TextField  InputProps={{inputComponent: NumberFormatCustom}}
              required variant="outlined"  label="Стоимость за кв.м. макс значение"
               value={analysis.maxCostPerSQM || ""} style={{ width: "450px" }}
                onChange={(e: any) =>
                setAnalysis({ ...analysis, maxCostPerSQM: parseInt(e.target.value) })
              }
              />
              <br/><br/>
              <TextField  inputProps={{maxLength: 2, minLength: 1}} 
              required variant="outlined"  label="Торг, %" value={(analysis.bargain || 0)}  style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, bargain: parseFloat(e.target.value) })
              }/>
              <br/><br/>
              <TextField InputProps={{inputComponent: NumberFormatCustom}} required variant="outlined"  label="Стоимость за кв.м., минимальное значение c торгом"
               value={analysis.minCostWithBargain || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, minCostWithBargain: parseInt(e.target.value) })
              }/>
              <br/><br/>
              <TextField InputProps={{inputComponent: NumberFormatCustom}} required variant="outlined"  label="Стоимость за кв.м. максимальное значение c торгом" value={analysis.maxCostWithBargain || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, maxCostWithBargain: parseInt(e.target.value) })
              }/>
              <br/><br/>
              <TextField variant="outlined"  label="Дата начала параметра" type="date" name="date" value={moment(analysis.beginDate, moment.ISO_8601, true).format("YYYY-MM-DD")}
              InputLabelProps={{ shrink: true, required: true }}  style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, beginDate: e.target.value })
              }/>
              <br/><br/>
              <TextField variant="outlined"  label="Дата окончания параметра" type="date" name="date" value={moment(analysis.endDate, moment.ISO_8601, true).format("YYYY-MM-DD")}
              InputLabelProps={{ shrink: true, required: true }}  style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, endDate: e.target.value })
              }/>
              </Grid>
            </Grid>
            <Grid container className={classes.paper}>
            <Grid item xs={2}  >
            <div style={{ textAlign: "left" }}>
              {formState!=FormState.READ && formState!=FormState.CREATE ? 
              <input type="button" value="Архивировать и создать новый" className='pxbutton' 
              onClick={(e: any) => {archAndNew(e)}}/>
              :  <></>}
            </div>
            </Grid>
            <Grid item xs={8}  >
            <div style={{ textAlign: "center" }}>
              {formState!=FormState.READ ? <input type="submit" value="Сохранить" className='pxbutton'/>
              :  <></>}
            </div>
            </Grid>
            </Grid>
          </form>
          </fieldset>
        )}
        </AppContext.Consumer>
    )
}