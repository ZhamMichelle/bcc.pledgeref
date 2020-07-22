import React, {useState, useEffect} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { AnalysisElements, Services, FormState,  } from '../api/Services';
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
    container: {
      maxHeight: 440,
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
        services.deleteElement(idWantDelete).then(() => {
          showToast();
          setAnalysis(analysis.filter((m) => m.id !== idWantDelete));
        });
      };

      const onDelete = (id:any) =>{
        var con = window.confirm("Вы дейтсвительно хотите удалить?");
        if (con) {
          services.deleteElement(id).then(() => {
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
                <th>№</th>
                <th>Нас. пункт</th>
                <th><InputGroup
                    type="search"
                    // leftIcon={IconNames.SEARCH}
                    placeholder="Сектор"
                    value={searchSector}
                    onChange={(e: any) => setSearchSector(e.target.value)}
                  /></th>
                <th>Описание сектора</th>
                {/* <th>Тип недвижимости</th> */}
                <th><InputGroup
                    type="search"
                    // leftIcon={IconNames.SEARCH}
                    placeholder="Тип недвижимости"
                    value={searchEstate}
                    onChange={(e: any) => setSearchEstate(e.target.value)}
                  /></th>
                <th>Особенности строения</th>
                <th>Планировка</th>
                <th>Материал стен</th>
                <th>Стоимость за кв(сотку) Min</th>
                <th>Стоимость за кв(сотку) Max</th>
                <th>Дата начала параметра</th>
                <th>Дата окончания параметра</th>
                <th>Настройки</th>
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
                      <td>{m.sector}</td>
                      <td>{m.sectorDescription}</td>
                      <td>{m.typeEstate}</td>
                      <td>{m.detailArea}</td>
                      <td>{m.apartmentLayout}</td>
                      <td>{m.wallMaterial}</td>
                      <td>{m.minCostPerSQM}</td>
                      <td>{m.maxCostPerSQM}</td>
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