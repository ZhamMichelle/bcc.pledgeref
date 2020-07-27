import React, {useState, useEffect} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { AnalysisElements, Services, FormState, UserContext } from '../api/Services';
import {
  Button,
  Classes,
  Intent,
  Alert,
  InputGroup,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AppContext, history, PATH_REFERENCE_BOOK } from "../App";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '80%',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
  }),
);

export const Elements = (props:any) =>{
    const classes = useStyles();
    const [wantDelete, setWantDelete] = useState(false);
    const [idWantDelete, setIdWantDelete] = useState(0);
    const [analysis, setAnalysis] = useState([] as AnalysisElements[])
    const [searchSector, setSearchSector] = useState();
    const [searchEstate, setSearchEstate] = useState();
    const [username, setUsername] = useState(new UserContext());
    const {
        city,
      formState,
      onSelectedItem,
      filter,
    }: {
        city: string;
      formState: FormState;
      onSelectedItem: (m: AnalysisElements) => void;
      filter: [];
    } = props;

    var services = new Services();
    useEffect(()=>{setUsername(JSON.parse(localStorage.getItem("userContext") || '{}'))},[]);
    useEffect(()=>{
      services.getList(city)
    .then(json=>setAnalysis(json))
    .catch(error => {
    console.log(error.response)
    });
    },[city])

    useEffect(() => {
      if(searchSector!=null && searchEstate==null){
        services.getBySearchSector(city, searchSector).then(json => {
          setAnalysis(json);
        });
      }
      }, [searchSector]);
    useEffect(()=>{
      if(searchEstate!=null){
        services.getBySearchEstate(city, searchSector, searchEstate).then(json => {
          setAnalysis(json);
        });
      }
    }, [searchEstate, searchSector])

    const onClickItem = (element: AnalysisElements) => {
          history.push(`/${element.id}`);
      };

      const onConfirm = (showToast: () => void) => {
        services.deleteElement(idWantDelete, username.user?.fullName || "").then(() => {
          showToast();
          setAnalysis(analysis.filter((m) => m.id !== idWantDelete));
        });
      };

      const onDelete = (id:any) =>{
        var con = window.confirm("Вы дейтсвительно хотите удалить?");
        if (con) {
          services.deleteElement(id, username.user?.fullName || "").then(() => {
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
        <Grid item xs={11} className={classes.paper}>
         <table
            style={{ width: "100%", textAlign: 'center', border:'1px solid black', borderCollapse: 'collapse'}}
          >
            <thead>
              <tr>
                <th style={{textAlign: 'center'}}>№</th>
                <th style={{textAlign: 'center'}}>Нас. пункт</th>
                <th style={{textAlign: 'center'}}><InputGroup
                    type="search"
                    // leftIcon={IconNames.SEARCH}
                    placeholder="Сектор"
                    value={searchSector}
                    onChange={(e: any) => setSearchSector(e.target.value)}
                  /></th>
                <th style={{textAlign: 'center'}}>Описание сектора</th>
                {/* <th>Тип недвижимости</th> */}
                <th style={{textAlign: 'center'}}><InputGroup
                    type="search"
                    // leftIcon={IconNames.SEARCH}
                    placeholder="Тип недвижимости"
                    value={searchEstate}
                    onChange={(e: any) => setSearchEstate(e.target.value)}
                  /></th>
                <th style={{textAlign: 'center'}}>Особенности строения</th>
                <th style={{textAlign: 'center'}}>Планировка</th>
                <th style={{textAlign: 'center'}}>Материал стен</th>
                <th style={{textAlign: 'center'}}>Стоимость за кв(сотку) Min</th>
                <th style={{textAlign: 'center'}}>Стоимость за кв(сотку) Max</th>
                <th style={{textAlign: 'center'}}>Дата начала параметра</th>
                <th style={{textAlign: 'center'}}>Дата окончания параметра</th>
                <th style={{textAlign: 'center'}}>Настройки</th>
              </tr>
            </thead>
            <tbody>
              {analysis.map(
                (m, i) =>
                  !filter?.some((f) => f == m.id) && (
                    <tr key={i} onClick={() => onClickItem(m)}>
                      {/* <tr key={i}> */}
                      <td style={{textAlign: 'center'}}>{i + 1}</td>
                      <td style={{textAlign: 'center'}}>{m.city}</td>
                      <td style={{textAlign: 'center'}}>{m.sector}</td>
                      <td style={{textAlign: 'center'}}>{m.sectorDescription}</td>
                      <td style={{textAlign: 'center'}}>{m.typeEstate}</td>
                      <td style={{textAlign: 'center'}}>{m.detailArea}</td>
                      <td style={{textAlign: 'center'}}>{m.apartmentLayout}</td>
                      <td style={{textAlign: 'center'}}>{m.wallMaterial}</td>
                      <td style={{textAlign: 'center'}}>{m.minCostPerSQM}</td>
                      <td style={{textAlign: 'center'}}>{m.maxCostPerSQM}</td>
                      <td style={{textAlign: 'center'}}>{m.beginDate !=null ?
                        moment(m.beginDate, moment.ISO_8601, true).format("DD.MM.YYYY") : m.beginDate}</td>
                      <td>{m.endDate !=null ?
                        moment(m.endDate, moment.ISO_8601, true).format("DD.MM.YYYY") : m.endDate}</td>
                      
                          <td style={{ width: "88px" }}>
                            <Button
                              className={Classes.MINIMAL}
                              icon={IconNames.EDIT}
                              intent={Intent.PRIMARY}
                              onClick={(e: any) => {
                                history.push(`/${m.id}/edit`);
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