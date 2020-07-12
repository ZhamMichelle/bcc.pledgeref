import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Grid, TextField} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    adds: {
        padding: theme.spacing(2),
      },
  }),
);

export const AddAnalysis = () =>{
    const classes = useStyles();
    return(
        <div className={classes.root}>
<Grid container spacing={2} className={classes.paper}>
    <Grid item xs={12} className={classes.paper}>
        <h2>Добавить новый элемент</h2> 
    </Grid>
   
<Grid item xs={3}>
<TextField id="standard-basic" label="Код города КАТО" />
</Grid>
<Grid item xs={3}>
<TextField id="standard-basic" label="Город" />
</Grid>
<Grid item xs={3}>
<TextField id="standard-basic" label="Код сектора города" />
</Grid>
<Grid item xs={3}>
<TextField id="standard-basic" label="Сектор города" />
</Grid>

<Grid item xs={3}>
<TextField id="standard-basic" label="Относительность расположения" />
</Grid>
<Grid item xs={3}>
<TextField id="standard-basic" label="Описание сектора города" />
</Grid>
<Grid item xs={3}>
<TextField id="standard-basic" label="Код Типа недвижимости" />
</Grid>
<Grid item xs={3}>
<TextField id="standard-basic" label="Тип недвижимости по справочнику" />
</Grid>

<Grid item xs={3}>
<TextField id="standard-basic" label="Тип недвижимости" />
</Grid>
<Grid item xs={3}>
<TextField id="standard-basic" label="Код Планировка квартир" />
</Grid>
<Grid item xs={3}>
<TextField id="standard-basic" label="Планировка квартир" />
</Grid>
<Grid item xs={3}>
<TextField id="standard-basic" label="Код Материал стен" />
</Grid>

<Grid item xs={3}>
<TextField id="standard-basic" label="Материал стен" />
</Grid>
<Grid item xs={3}>
<TextField id="standard-basic" label="Код детализации площади по жилому дому" />
</Grid>
<Grid item xs={3}>
<TextField id="standard-basic" label="Детализация площади по жилому дому" />
</Grid>
<Grid item xs={3}>
<TextField id="standard-basic" label="Стоимость за кв.м., минимальное значение" />
</Grid>
</Grid>
        </div>
    )
}