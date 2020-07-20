import React, {useState, useEffect} from 'react'
import { AppContext, history } from "../App";
import {Grid, TextField, Select, InputLabel, FormControl} from '@material-ui/core';
import {  FormState, AnalysisElements, Services } from '../api/Services';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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

  const { match, formState } = props;
var services = new Services();
  useEffect(() => {
    console.log('formstate',formState)
    services.getIdElement(match.params.id).then(json => setAnalysis(json));
  }, []);

  useEffect(()=>{
    if(analysis.city!=null){
      services.getKatoCityCode(analysis.city || "").then(json=>setAnalysis({...analysis, cityCodeKATO:json.toString()}))
    }
    
  },[analysis.city])

  const onSubmit = (e: any, showToast: () => void) => {
    e.preventDefault();
    if (formState === FormState.CREATE) {
      services.postElement(analysis).then(() => {
        showToast();
        history.goBack();
      });
    } else if (formState === FormState.EDIT) {
      services.putElement(analysis).then(() => {
        showToast();
        history.goBack();
      });
    }
  };
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
              <h2 style={{textAlign: 'center'}}>Редактирование</h2>
              <Grid item xs={6} className={classes.paper} container spacing={3}>
                <Grid item xs={6}>
             <TextField  variant="outlined"  label="Код города КАТО" value={analysis.cityCodeKATO || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, cityCodeKATO: e.target.value })
              }/> 
              <br/><br/>
              <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Город</InputLabel>
              <Select
                native
                value={analysis.city || ""}
                onChange={(e: any) => { setAnalysis({ ...analysis, city: e.target.value  })}}
                label="Город"
                style={{width: "450px" }}
              >
                <option>Выберите город</option>
                {cities.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </Select>
            </FormControl>
              <br/><br/>
              <TextField variant="outlined"  label="Код сектора города" value={analysis.sectorCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, sectorCode: e.target.value })
              }/>
              <br/><br/>
              <TextField variant="outlined"  label="Сектор города" value={analysis.sector || 0} type='number' style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, sector: e.target.value})
              }/>
              <br/><br/>
              <TextField variant="outlined"  label="Относительность расположения" value={analysis.relativityLocation || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, relativityLocation: e.target.value })
              }/>
              <br/><br/>
              <TextField variant="outlined" label="Описание сектора города" value={analysis.sectorDescription || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, sectorDescription: e.target.value })
              }/>
              <br/><br/>
             <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Тип недвижимости по справочнику</InputLabel>
              <Select
                native
                value={analysis.typeEstateByRef || ""}
                onChange={(e: any) => { setAnalysis({ ...analysis, typeEstateByRef: e.target.value, typeEstateCode: PropertyType.get(e.target.value)  })}}
                label="Тип недвижимости по справочнику"
                style={{width: "450px" }}
              >
                {/* {Array.from(PropertyType).map(([key,value])=>(<option key={key} value={value}>{key}</option>))} */}
                <option>Выберите тип недвижимости</option>
              {helperPropertyType.map((m,i)=>(<option key={i} value={m}>{m}</option>))}
              </Select>
            </FormControl>
              <br/><br/>
              <TextField variant="outlined"  label="Код Типа недвижимости" value={analysis.typeEstateCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, typeEstateCode: e.target.value })
              }/>
              
              <br/><br/>
              <TextField variant="outlined"  label="Тип недвижимости" value={analysis.typeEstate || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, typeEstate: e.target.value })
              }/>
              <br/><br/>
              <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Планировка квартир</InputLabel>
              <Select
                native
                value={analysis.apartmentLayout || ""}
                onChange={(e: any) => { setAnalysis({ ...analysis, apartmentLayout: e.target.value, apartmentLayoutCode: Layout.get(e.target.value)  })}}
                label="Планировка квартир"
                style={{width: "450px" }}
              >
                <option>{analysis.apartmentLayout || ""}</option>
              {helperLayout.map((m,i)=>(<option key={i} value={m}>{m}</option>))}
              </Select>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
              <TextField variant="outlined"  label="Код Планировка квартир" value={analysis.apartmentLayoutCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, apartmentLayoutCode: e.target.value })
              }/>
              <br/><br/>
              <TextField variant="outlined"  label="Код Материал стен" value={analysis.wallMaterialCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, wallMaterialCode: e.target.value })
              }/>
              <br/><br/>
              <TextField variant="outlined"  label="Материал стен" value={analysis.wallMaterial || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, wallMaterial: e.target.value })
              }/>
              <br/><br/>
              <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Детализация площади по жилому дому</InputLabel>
              <Select
                native
                value={analysis.detailArea || ""}
                onChange={(e: any) => { setAnalysis({ ...analysis, detailArea: e.target.value, detailAreaCode: DetailArea.get(e.target.value) })}}
                label="Детализация площади по жилому дому"
                style={{width: "450px" }}
              >
              <option>Выберите детализацию площади по жилому дому</option>
              {helperDetailArea.map((m,i)=>(<option key={i} value={m}>{m}</option>))}
              </Select>
              </FormControl>
              <br/><br/>
              <TextField variant="outlined"  label="Код детализации площади по жилому дому" value={analysis.detailAreaCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, detailAreaCode: e.target.value })
              }/> 
              <br/><br/>
              <TextField variant="outlined"  label="Стоимость за кв.м., мин значение" value={analysis.minCostPerSQM || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, minCostPerSQM: e.target.value })
              }/>
              <br/><br/>
              <TextField variant="outlined"  label="Стоимость за кв.м. макс значение" value={analysis.maxCostPerSQM || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, maxCostPerSQM: e.target.value })
              }/>
              <br/><br/>
              <TextField variant="outlined"  label="Коридор, %" value={(analysis.corridor || 0)*100} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, corridor: e.target.value })
              }/>
              <br/><br/>
              <TextField variant="outlined"  label="Стоимость за кв.м., минимальное значение c торгом -10%" value={analysis.minCostWithBargain || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, minCostWithBargain: e.target.value })
              }/>
              <br/><br/>
              <TextField variant="outlined"  label="Стоимость за кв.м. максимальное значение c торгом -10%" value={analysis.maxCostWithBargain || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, maxCostWithBargain: e.target.value })
              }/>
              </Grid>
            </Grid>
            <Grid item xs={12}  >
            <div style={{ textAlign: "center" }}>
              <input type="submit" value="Сохранить" className='pxbutton'/>
            </div>
            </Grid>
          </form>
          </fieldset>
        )}
        </AppContext.Consumer>
    )
}