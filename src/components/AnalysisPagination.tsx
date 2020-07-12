import React, {useState, useEffect} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {FormControl, Select, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@material-ui/core";
import { AnalysisElements, ListService } from '../api/Services';
import moment from "moment";


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
export const AnalysisPagination: React.FC<CityProps> = (city) =>{
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [analysis, setAnalysis] = useState([] as AnalysisElements[])
var test = new ListService();
useEffect(()=>{
test.getList(city)
.then(json=>setAnalysis(json.data))
.catch(error => {
  console.log(error.response)
});
},[])
useEffect(()=>{
    console.log("analysis",analysis)
},[analysis])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    return(
        <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {analysis.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={i}  >
                  {columns.map((column) => {
                    var value = row[column.id];
                    if (column.id === "beginDate" || column.id === "endDate") {
                        var momentVar = moment(value, moment.ISO_8601, true);
                        if (momentVar.isValid()) {
                          value = momentVar.format("MM.DD.YYYY, HH:mm");
                        }
                      }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={analysis.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    )
}