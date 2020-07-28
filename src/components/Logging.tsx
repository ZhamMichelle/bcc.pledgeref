import React, {useState, useEffect} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {FormControl, Select, InputLabel} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import moment from "moment";
import { InputGroup, } from "@blueprintjs/core";
import { LoggingElements, Services, FormState, UserContext } from '../api/Services';
import { act } from 'react-dom/test-utils';

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
const actions: string[]=["Удаление", "Редактирование", "Добавление"];
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
export const Logging = (props:any) =>{
    const classes = useStyles();
    const [city, setCity] = useState("");
    const [searchCode, setSearchCode] = useState();
    const [logData, setLogData] = useState([] as LoggingElements[])
    const [actionType, setActionType]=useState();
    const {
      formState,
      onSelectedItem,
      filter,
    }: {
      formState: FormState;
      onSelectedItem: (m: LoggingElements) => void;
      filter: [];
    } = props;

    var services = new Services();
    
    // useEffect(()=>{
    //     if(!!actionType){
    //   services.getLogList(actionType)
    // .then(json=>setLogData(json))
    // .catch(error => {
    // console.log(error.response)
    // });}
    // },[actionType])
    useEffect(()=>{console.log("logData",logData)},[logData])

    useEffect(() => {
       // if(!!actionType){
            services.getBySearchCode(actionType, searchCode).then(json => {
                setLogData(json);
              });
       // }
        }, [actionType,searchCode]);
    return(
        <>
        <React.Fragment>
        <h2 style={{textAlign: 'center'}}>История действий</h2>
        {/* <FormControl variant="outlined" className={classes.formControl}>
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
        </FormControl> */}
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Действие</InputLabel>
        <Select
          native
          value={actionType}
          onChange={(e: any) => {
            setActionType( e.currentTarget.value );
          }}
          label="Действие"
          style={{ height: "50px", width: "280px" }}
        >
          <option>Выберите действие</option>
          {actions.map((m, i) => (
            <option key={i} value={m}>
              {m}
            </option>
          ))}
        </Select>
        </FormControl>
        <Grid item xs={12} className={classes.paper}>
         <table
            style={{ width: "100%", textAlign: 'center', border:'1px solid black', borderCollapse: 'collapse'}}
          >
            <thead>
              <tr>
              <th><InputGroup
                    type="search"
                    placeholder="Код"
                    value={searchCode}
                    onChange={(e: any) => setSearchCode(e.target.value)}
                  /></th>
                <th>Город</th>
                <th>Сектор</th>
                <th>Описание сектора</th>
                <th>Тип недвижимости по справочнику</th>
                <th >Планировка</th>
                <th >Материал стен</th>
                <th >Детализация площади по жилому дому</th>
                <th >Стоимость за кв.м. Min</th>
                <th >Стоимость за кв.м. Max</th>
                <th>Стоимость за кв.м., min значение c торгом </th>
                <th>Стоимость за кв.м. max значение c торгом</th>
                <th >Дата начала параметра</th>
                <th >Дата окончания параметра</th>
                <th >Действие</th>
                <th >Исполнитель</th>
                <th >Дата изменения</th>
              </tr>
            </thead>
            <tbody>
              {logData.map(
                (m, i) =>
                  !filter?.some((f) => f == m.id) && (
                    <tr key={i}>
                      <td >{m.previousId}</td>
                      <td >{m.city}</td>
                      <td >{m.sector}</td>
                      <td >{m.sectorDescription}</td>
                      <td >{m.typeEstateByRef}</td>
                      <td >{m.apartmentLayout}</td>
                      <td >{m.wallMaterial}</td>
                      <td >{m.detailArea}</td>
                      <td>{new Intl.NumberFormat('ru-RU').format(m.minCostPerSQM || 0)}</td>
                      <td>{new Intl.NumberFormat('ru-RU').format(m.maxCostPerSQM || 0)}</td>
                      <td>{new Intl.NumberFormat('ru-RU').format(m.minCostWithBargain || 0)}</td>
                      <td>{new Intl.NumberFormat('ru-RU').format(m.maxCostWithBargain || 0)}</td>
                      <td >{m.beginDate !=null ?
                        moment(m.beginDate, moment.ISO_8601, true).format("DD.MM.YYYY") : m.beginDate}</td>
                      <td>{m.endDate !=null ?
                        moment(m.endDate, moment.ISO_8601, true).format("DD.MM.YYYY") : m.endDate}</td>
                    <td >{m.action}</td>
                    <td >{m.username}</td>
                    <td>{m.changeDate !=null ?
                        moment(m.changeDate, moment.ISO_8601, true).format("DD.MM.YYYY") : m.changeDate}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
          </Grid>
        </React.Fragment>
        </>
    )
}