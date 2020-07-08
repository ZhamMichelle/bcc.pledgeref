import React, {useState} from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {FormControl, Select, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@material-ui/core";
import { AnalysisElements } from '../api/Services';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  }),
);


  interface Column {
    id: 'City' | 'SectorDesc' | 'EstateType' | 'Construction' | 'Layout' | 'WallMaterial' | 'MinCost' | 'MaxCost' | 'BeginDate' | 'EndDate';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    { id: "City", label: "Нас. пункт", minWidth: 100 },
    { id: "SectorDesc", label: "Описание сектора", minWidth: 100 },
    { id: "EstateType", label: "Тип недвижимости", minWidth: 100 },
    { id: "Construction", label: "Особенности строения/площадь жилого дома", minWidth: 100 },
    { id: "Layout", label: "Планировка (назначение для участка)", minWidth: 100 },
    { id: "WallMaterial", label: "Материал стен", minWidth: 100 },
    { id: "MinCost", label: "Стоимость за кв (сотку) Min", minWidth: 100 },
    { id: "MaxCost", label: "Стоимость за кв (сотку) Max", minWidth: 100 },
    { id: "BeginDate", label: "Дата начала параметра", minWidth: 100 },
    { id: "EndDate", label: "Дата окончания параметра", minWidth: 100 },
  ];
  
  type CityProps = {
    city: string;
  };
export const AnalysisPagination: React.FC<CityProps> = (city) =>{
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [analysis, setAnalysis] = useState([] as AnalysisElements[])
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
            {analysis.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.Id}>
                  {columns.map((column) => {
                    const value = 1; //row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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