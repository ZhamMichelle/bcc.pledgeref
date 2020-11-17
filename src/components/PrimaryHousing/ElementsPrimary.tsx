import React, {useState, useEffect} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { PrimaryAnalysisElements, Services, FormState, UserContext } from '../../api/Services';
import {
  Button,
  Classes,
  Intent,
  Alert,
  InputGroup,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AppContext, history, PATH_REFERENCE_BOOK } from "../../App";
import moment from "moment";
import {FormControl, Select, InputLabel, Grid} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '80%',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    formControl: {
      margin: theme.spacing(1),
    },
  }),
);

export const ElementsPrimary = (props:any) =>{
    const classes = useStyles();
    const [wantDelete, setWantDelete] = useState(false);
    const [idWantDelete, setIdWantDelete] = useState(0);
    const [analysis, setAnalysis] = useState([] as PrimaryAnalysisElements[])
    const [searchSector, setSearchSector] = useState(0);
    const [searchEstate, setSearchEstate] = useState('');
    const [username, setUsername] = useState(new UserContext());
    const [uniqueSector, setUniqueSector] = useState([] as number[]);
    const [uniqueEstate, setUniqueEstate] = useState([] as string[]);
    const [selectHelper, setSelectHelper] = useState('')
    const {
        city,
      formState,
      onSelectedItem,
      filter,
    }: {
        city: string;
      formState: FormState;
      onSelectedItem: (m: PrimaryAnalysisElements) => void;
      filter: [];
    } = props;

    var services = new Services();
    useEffect(()=>{setUsername(JSON.parse(localStorage.getItem("userContext") || '{}'))},[]);
    useEffect(()=>{
      services.getListPrimary(city)
    .then((json)=>{setAnalysis(json); setSelectHelper('Rest')})
    .catch(error => {
    console.log(error.response)
    });
    },[city])
  

    // useEffect(()=>{
    //   if((searchSector!=undefined && searchEstate==undefined ) || (searchSector==undefined && searchEstate!=undefined ) || 
    //   (searchSector!=undefined && searchEstate!=undefined )){
    //     services.getBySearchEstate(city, searchSector, searchEstate).then(json => {
    //       setAnalysis(json);
    //     });
    //   }
    // }, [searchEstate, searchSector])
    
   //useEffect(()=>{console.log('uniqueSector',uniqueSector)},[uniqueSector])

    const onClickItem = (elementPrim: PrimaryAnalysisElements) => {
          history.push(`/${elementPrim.id}/primary`);
      };

      const onConfirm = (showToast: () => void) => {
        services.deleteElementPrimary(idWantDelete, username.user?.fullName || "").then(() => {
          showToast();
          setAnalysis(analysis.filter((m) => m.id !== idWantDelete));
        });
      };

      const onDelete = (id:any) =>{
        var con = window.confirm("Вы действительно хотите удалить?");
        if (con) {
          services.deleteElementPrimary(id, username.user?.fullName || "").then(() => {
            setAnalysis(analysis.filter((m) => m.id !== id)); 
          });
        }
      }
    
return(
    <AppContext.Consumer>
        {({ showToastDelete, showToastError }) => (
    <React.Fragment>
        <Alert
            icon={IconNames.TRASH}
            cancelButtonText="Нет"
            confirmButtonText="Да"
            intent={Intent.DANGER}
            isOpen={wantDelete}
            onCancel={() => setWantDelete(false)}
            onConfirm={() => onConfirm(showToastDelete)}
            onClose={() => setWantDelete(false)}
          >
            <p>
              Внимание!!!
              <br /> Вы уверены что хотите удалить ?
            </p>
          </Alert>
        <Grid item xs={12} className={classes.paper}>
         <table
            style={{ width: "100%", textAlign: 'center', border:'1px solid black', borderCollapse: 'collapse'}}
          >
            <thead>
              <tr>
                <th>№</th>
                <th>Город</th>
                <th>Код наименования ЖК</th>
                <th>Наименование ЖК</th>
                <th>Фактический адрес</th>
                <th>Код уровня качества отделки</th>
                <th>Уровень качества отделки</th>
                <th>Стоимость за кв.м. Min</th>
                <th>Стоимость за кв.м. Max</th>
                <th>Дата начала параметра</th>
                <th>Дата окончания параметра</th>
                <th >Настройки</th>
              </tr>
            </thead>
            <tbody>
              {analysis.map(
                (m, i) =>
                  !filter?.some((f) => f == m.id) && (
                    <tr key={i} onClick={() => onClickItem(m)}>
                      {/* <tr key={i}> */}
                      <td>{i + 1}</td>
                      <td>{m.city}</td>
                      <td>{m.rcNameCode}</td>
                      <td>{m.rcName}</td>
                      <td>{m.actualAdress}</td>
                      <td>{m.finQualityLevelCode}</td>
                      <td>{m.finQualityLevel}</td>
                      <td>{new Intl.NumberFormat('ru-RU').format(m.minCostPerSQM || 0)}</td>
                      <td>{new Intl.NumberFormat('ru-RU').format(m.maxCostPerSQM || 0)}</td>
                      <td>{m.beginDate !=null ?
                        moment(m.beginDate, moment.ISO_8601, true).format("DD.MM.YYYY") : m.beginDate}</td>
                      <td>{m.endDate !=null ?
                        moment(m.endDate, moment.ISO_8601, true).format("DD.MM.YYYY") : m.endDate}</td>
                      
                          <td style={{ width: "88px" }}>
                            <Button
                              className={Classes.MINIMAL}
                              icon={IconNames.EDIT}
                              intent={Intent.PRIMARY}
                              onClick={(e: any) => {
                                history.push(`/${m.id}/primary/edit`);
                                e.stopPropagation();
                              }}
                            />
                            <Button
                              className={Classes.MINIMAL}
                              icon={IconNames.REMOVE}
                              intent={Intent.DANGER}
                              onClick={(e: any) => {
                                // setWantDelete(true);
                                // setIdWantDelete(m.id || 1);
                                onDelete(m.id);
                                e.stopPropagation();
                              }}
                            />
                          </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
          </Grid>
    </React.Fragment>
    )}
    </AppContext.Consumer>
)
}