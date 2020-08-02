import React, {useState, useEffect} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {FormControl, Select, InputLabel} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import moment from "moment";
import { InputGroup, } from "@blueprintjs/core";
import { LoggingElements, Services, FormState, UserContext, PaginationParams } from '../api/Services';
import { saveAs } from 'file-saver';

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
const actions: string[]=["Удаление", "Редактирование", "Добавление", "Excel"];
const status: string[]=["Действ.", "Арх."];
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        textAlign: 'center'
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
    const [searchCode, setSearchCode] = useState('f');
    const [searchStatus, setSearchStatus] = useState();
    const [logData, setLogData] = useState([] as LoggingElements[])
    const [actionType, setActionType]=useState();
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [pagResult, setPagResult] = useState(new PaginationParams());
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


    // useEffect(() => {
    //    // if(!!actionType){
    //      var status = searchStatus=="Действ." ? '0' : searchStatus=="Арх." ? '1' : '' 
    //         services.getBySearchCode(actionType, searchCode, status).then(json => {
    //             setLogData(json);
    //           });
    //    // }
    //     }, [actionType,searchCode,searchStatus]);

    useEffect(()=>{
      var status = null;
      setSearchCode('f')
      services.getLogPage(page, size, searchCode, status).then(json => {
        setPagResult(json);
      });
    },[]);

    useEffect(()=>{
      console.log('pagresult',pagResult);
    },[searchCode,searchStatus]);

    const handleChangePage = (event: unknown, newPage: number) => {
      var status = searchStatus=="Действ." ? '0' : searchStatus=="Арх." ? '1' : '' 
      if (newPage < page) {
        services.getLogPage(newPage, size, searchCode, status)
          .then((json) => setPagResult(json));
      }
      setPage(newPage);
  
      if (newPage > page) {
        services.getLogPage(page + 1, size, searchCode, status)
          .then((json) => setPagResult(json));
      }
    };

    const  extractFileName = (contentDispositionValue) => {
      var filename = "";
      if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
          var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          var matches = filenameRegex.exec(contentDispositionValue);
          if (matches != null && matches[1]) {
              filename = matches[1].replace(/['"]/g, '');
          }
      }
      return filename;
  }
  const  downloadFile = () => {
    services.Download().then((response) => {
        var filename=extractFileName(response.headers['content-disposition']);
        saveAs(response.data, filename);
    }).catch(function (error) {
        console.log(error);
        if (error.response) {
            console.log('Error', error.response.status);
        } else {
            console.log('Error', error.message);
        }
    });
};
    return(
        <>
        <React.Fragment>
        <h2 style={{textAlign: 'center'}}>История действий</h2>
        <button className='pxbutton' onClick={(e:any)=>{downloadFile()}}>Выгрузить данные</button>
        <Grid item xs={12} className={classes.paper}>
         <table
            style={{ width: "100%", textAlign: 'center', border:'1px solid black', borderCollapse: 'collapse'}}
          >
            <thead>
              <tr>
                <th>№</th>
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
                <th><FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    native
                    value={searchStatus}
                    onChange={(e: any) => {
                      setSearchStatus( e.currentTarget.value );
                    }}
                    style={{ height: "30px", width: "100px" }}
                  >
                    <option>Статус</option>
                    {status.map((m, i) => (
                      <option key={i} value={m}>
                        {m}
                      </option>
                    ))}
                  </Select>
                  </FormControl></th>
              </tr>
            </thead>
            <tbody>
              {pagResult.results?.map(
                (m, i) =>
                  !filter?.some((f) => f == m.id) && (
                    <tr key={i}>
                      <td>{m.id}</td>
                      <td>{m.code}</td>
                      <td>{m.city}</td>
                      <td>{m.sector}</td>
                      <td>{m.sectorDescription}</td>
                      <td>{m.typeEstateByRef}</td>
                      <td>{m.apartmentLayout}</td>
                      <td>{m.wallMaterial}</td>
                      <td>{m.detailArea}</td>
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
                    <td>{!!m.isArch && m.isArch=='0' ? <>Действ.</> : <>Арх.</>}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
          </Grid>
          <Grid container className={classes.paper}>
          <Grid item xs={12} className={classes.paper}>
          {page==1 ?  <><button className='pxbuttonPage' onClick={(e:any)=>{handleChangePage(e,page+1)}}>Вперед</button></> 
          : !!pagResult.rowCount && (page*size)>=pagResult?.rowCount 
          ? <><button className='pxbuttonPage' onClick={(e:any)=>{handleChangePage(e,page-1) }}>Назад</button></>
          :<><button className='pxbuttonPage' onClick={(e:any)=>{ handleChangePage(e,page-1)}}>Назад</button>&nbsp;&nbsp;
            <button className='pxbuttonPage' onClick={(e:any)=>{handleChangePage(e,page+1)}}>Вперед</button></>} 
            </Grid>
            </Grid>
        </React.Fragment>
        </>
    )
}