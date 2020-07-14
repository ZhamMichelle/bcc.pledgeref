import React, {useState, useEffect} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {FormControl, Select, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@material-ui/core";
import { AnalysisElements, ListService, FormState, Element, SearchService, DeleteService } from '../api/Services';
import moment from "moment";
import {
  HTMLTable,
  Button,
  Classes,
  Intent,
  Switch,
  Alert,
  InputGroup,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AppContext, history } from "../App";

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

type CityProps = {
    city: string;
  };
export const Elements = (props:any) =>{
    const classes = useStyles();
    const [wantDelete, setWantDelete] = useState(false);
    const [idWantDelete, setIdWantDelete] = useState(0);
    const [analysis, setAnalysis] = useState([] as AnalysisElements[])
    const [searchName, setSearchName] = useState();
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

    var getListing = new ListService();
    useEffect(()=>{
        getListing.getList(city)
    .then(json=>setAnalysis(json.data))
    .catch(error => {
    console.log(error.response)
    });
    },[])

    var getSearchList=new SearchService();
    useEffect(() => {
    getSearchList.getBySearch(city, searchName).then(json => {
          setAnalysis(json.data);
        });
      }, [searchName]);
    useEffect(()=>{
        console.log("analysis",analysis)
    },[analysis])

    const onClickItem = (element: AnalysisElements) => {
        if (formState === FormState.READ) {
          !!onSelectedItem && onSelectedItem(element);
        } else {
          history.push(`/element/${element.id}`);
        }
      };

      var deleteService = new DeleteService();
      const onConfirm = (showToast: () => void) => {
        deleteService.deleteElement(idWantDelete).then(() => {
          showToast();
          setAnalysis(analysis.filter((m) => m.id !== idWantDelete));
        });
      };
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
         <Table
            className='bp3-html-table-bordered'
            style={{ width: "100%", textAlign: 'center'}}
          >
            <thead>
              <tr>
                <th>№</th>
                <th>Нас. пункт</th>
                <th><InputGroup
                    type="search"
                    // leftIcon={IconNames.SEARCH}
                    placeholder="Сектор"
                    value={searchName}
                    onChange={(e: any) => setSearchName(e.target.value)}
                  /></th>
                <th>Описание сектора</th>
                <th>Тип недвижимости</th>
                <th>Особенности строения</th>
                <th>Планировка</th>
                <th>Материал стен</th>
                <th>Стоимость за кв(сотку) Min</th>
                <th>Стоимость за кв(сотку) Max</th>
                <th>Дата начала параметра</th>
                <th>Дата окончания параметра</th>
                {formState !== FormState.READ && (
                  <React.Fragment>
                    <th>Настройки</th>
                  </React.Fragment>
                )}
              </tr>
            </thead>
            <tbody>
              {analysis.map(
                (m, i) =>
                  !filter?.some((f) => f == m.id) && (
                    <tr key={i} onClick={() => onClickItem(m)}>
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
                      <td>{m.beginDate}</td>
                      <td>{m.endDate}</td>
                      {formState !== FormState.READ && (
                        <React.Fragment>
                          
                          <td style={{ width: "88px" }}>
                            <Button
                              className={Classes.MINIMAL}
                              icon={IconNames.EDIT}
                              intent={Intent.PRIMARY}
                              onClick={(e: any) => {
                                history.push(
                                  `element/${m.id}/edit`
                                );
                                e.stopPropagation();
                              }}
                            />
                            <Button
                              className={Classes.MINIMAL}
                              icon={IconNames.REMOVE}
                              intent={Intent.DANGER}
                              onClick={(e: any) => {
                                setWantDelete(true);
                                setIdWantDelete(m.id || 1);
                                e.stopPropagation();
                              }}
                            />
                          </td>
                        </React.Fragment>
                      )}
                    </tr>
                  )
              )}
            </tbody>
          </Table>
          </Grid>
    </React.Fragment>
    )}
    </AppContext.Consumer>
)
}