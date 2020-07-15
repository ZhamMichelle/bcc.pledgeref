import React, {useState, useEffect} from 'react'
import { AppContext, history } from "../App";
import {Grid, TextField} from '@material-ui/core';
import {  FormState, AnalysisElements, GetIdService, PostService, PutService } from '../api/Services';
import {
    InputGroup,
    Checkbox,
    NumericInput,
    Button,
    HTMLSelect,
    Classes,
    Intent,
    HTMLTable,
    Divider,
    Position,
    Drawer,
    Spinner,
    TextArea,
  } from "@blueprintjs/core";
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
  }),
);

export const Element = (props: any) =>{
    const classes = useStyles();
    const [analysis, setAnalysis] = useState(new AnalysisElements());

  const { match, formState } = props;
var getIdService = new GetIdService();
  useEffect(() => {
        getIdService.getIdElement(match.params.id).then(json => setAnalysis(json.data));
   
  }, []);
  useEffect(()=>{console.log("element",analysis)},[analysis])
var postService = new PostService();
var putService = new PutService();

  const onSubmit = (e: any, showToast: () => void) => {
    e.preventDefault();
    if (formState === FormState.CREATE) {
      postService.postElement(analysis).then(() => {
        showToast();
        history.back();
      });
    } else if (formState === FormState.EDIT) {
      putService.putElement(analysis).then(() => {
        showToast();
        history.back();
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
             <TextField id="outlined-search" label="Код города КАТО" value={analysis.cityCodeKATO || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, cityCodeKATO: e.target.value })
              }/>  
              <br/><br/>
              <TextField id="outlined-search" label="Город" value={analysis.city || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, city: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Код сектора города" value={analysis.sectorCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, sectorCode: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Сектор города" value={analysis.sector || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, sector: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Относительность расположения" value={analysis.relativityLocation || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, relativityLocation: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Описание сектора города" value={analysis.sectorDescription || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, sectorDescription: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Код Типа недвижимости" value={analysis.typeEstateCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, typeEstateCode: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Тип недвижимости по справочнику" value={analysis.typeEstateByRef || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, typeEstateByRef: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Тип недвижимости" value={analysis.typeEstate || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, typeEstate: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Код Планировка квартир" value={analysis.apartmentLayoutCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, apartmentLayoutCode: e.target.value })
              }/>
              </Grid>
              <Grid item xs={6}>
              <TextField id="standard-basic" label="Планировка квартир" value={analysis.apartmentLayout || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, apartmentLayout: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Код Материал стен" value={analysis.wallMaterialCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, wallMaterialCode: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Материал стен" value={analysis.wallMaterial || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, wallMaterial: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Код детализации площади по жилому дому" value={analysis.detailAreaCode || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, detailAreaCode: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Детализация площади по жилому дому" value={analysis.detailArea || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, detailArea: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Стоимость за кв.м., мин значение" value={analysis.minCostPerSQM || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, minCostPerSQM: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Стоимость за кв.м. макс значение" value={analysis.maxCostPerSQM || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, maxCostPerSQM: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Коридор, %" value={analysis.corridor || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, corridor: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Стоимость за кв.м., минимальное значение c торгом -10%" value={analysis.minCostWithBargain || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, minCostWithBargain: e.target.value })
              }/>
              <br/><br/>
              <TextField id="standard-basic" label="Стоимость за кв.м. максимальное значение c торгом -10%" value={analysis.maxCostWithBargain || ""} style={{ width: "450px" }} onChange={(e: any) =>
                setAnalysis({ ...analysis, maxCostWithBargain: e.target.value })
              }/>
              </Grid>
            </Grid>
          </form>
          </fieldset>
        )}
        </AppContext.Consumer>
    )
}