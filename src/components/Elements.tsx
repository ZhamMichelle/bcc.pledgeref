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

    var services = new Services();
    useEffect(()=>{
      services.getList(city)
    .then(json=>setAnalysis(json))
    .catch(error => {
    console.log(error.response)
    });
    },[city])

    useEffect(() => {
      if(searchName!=null){
        services.getBySearch(city, searchName).then(json => {
          setAnalysis(json);
        });
      }
      }, [searchName]);
    useEffect(()=>{
        console.log("analysis",analysis)
    },[analysis])

    // const onClickItem = (element: AnalysisElements) => {
    //       history.push(`${PATH_REFERENCE_BOOK}/element/${element.id}`);
    //   };

      const onConfirm = (showToast: () => void) => {
        services.deleteElement(idWantDelete).then(() => {
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
                <th>Настройки</th>
              </tr>
            </thead>
            <tbody>
              {analysis.map(
                (m, i) =>
                  !filter?.some((f) => f == m.id) && (
                    // <tr key={i} onClick={() => onClickItem(m)}>
                      <tr key={i}>
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
                      
                          <td style={{ width: "88px" }}>
                            <Button
                              className={Classes.MINIMAL}
                              icon={IconNames.EDIT}
                              intent={Intent.PRIMARY}
                              onClick={(e: any) => {
                                // history.replace(
                                //   `${PATH_REFERENCE_BOOK}/command/${m.id}/edit`
                                // ); 
                                history.push(`/${m.id}`);  
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