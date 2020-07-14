import React, {useState, useEffect} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {FormControl, Select, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@material-ui/core";
import { AnalysisElements, ListService, FormState, Element } from '../api/Services';
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


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '80%',
    },
    container: {
      maxHeight: 440,
    },
  }),
);


  interface Column {
    id: 'city' | 'sectorDescription' | 'typeEstate' | 'detailArea' | 'apartmentLayout' | 'wallMaterial' | 'minCostWithBargain' | 'maxCostWithBargain' | 'beginDate' | 'endDate';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: Date) => string;
  }

  const columns: Column[] = [
    { id: "city", label: "Нас. пункт", minWidth: 100 },
    { id: "sectorDescription", label: "Описание сектора", minWidth: 100 },
    { id: "typeEstate", label: "Тип недвижимости", minWidth: 100 },
    { id: "detailArea", label: "Особенности строения/площадь жилого дома", minWidth: 100 },
    { id: "apartmentLayout", label: "Планировка (назначение для участка)", minWidth: 100 },
    { id: "wallMaterial", label: "Материал стен", minWidth: 100 },
    { id: "minCostWithBargain", label: "Стоимость за кв (сотку) Min", minWidth: 100 },
    { id: "maxCostWithBargain", label: "Стоимость за кв (сотку) Max", minWidth: 100 },
    { id: "beginDate", label: "Дата начала параметра", minWidth: 100 },
    { id: "endDate", label: "Дата окончания параметра", minWidth: 100 },
  ];
  
  type CityProps = {
    city: string;
  };
export const AnalysisPagination: React.FC<CityProps> = (city, props:any) =>{
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [analysis, setAnalysis] = useState([] as AnalysisElements[])
    const [searchName, setSearchName] = useState();
    const {
      formState,
      onSelectedItem,
      filter,
    }: {
      formState: FormState;
      onSelectedItem: (m: Element) => void;
      filter: [];
    } = props;

var test = new ListService();
// useEffect(()=>{
// test.getList(city)
// .then(json=>setAnalysis(json.data))
// .catch(error => {
//   console.log(error.response)
// });
// },[])
// useEffect(()=>{
//     console.log("analysis",analysis)
// },[analysis])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    return(
      <React.Fragment>
        <HTMLTable
            striped={true}
            bordered={true}
            interactive={true}
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>№</th>
                <th>
                  <InputGroup
                    type="search"
                    leftIcon={IconNames.SEARCH}
                    placeholder="Поиск названия"
                    value={searchName}
                    onChange={(e: any) => setSearchName(e.target.value)}
                  />
                </th>
                <th>
                  <InputGroup
                    type="search"
                    leftIcon={IconNames.SEARCH}
                    placeholder="Поиск команды"
                    value={searchName}
                    onChange={(e: any) => setSearchName(e.target.value)}
                  />
                </th>
                {formState !== FormState.READ && (
                  <React.Fragment>
                    <th>Описание</th>
                    <th>Активная</th>
                    <th>Настройки</th>
                    <th>Prod</th>
                  </React.Fragment>
                )}
              </tr>
            </thead>
          </HTMLTable>
      </React.Fragment>
    )
}