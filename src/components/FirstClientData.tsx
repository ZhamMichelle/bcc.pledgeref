import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
        alignItems: 'center'
    },
   inputs: {
    width: 500,
    
   },
  }),
);

export const FirstClientData = () =>{
    const classes = useStyles();
    return(
        <div className={classes.root}>
      <Grid container spacing={3} >
      <Grid item xs={12} className={classes.paper}>
          <h2 style={{textAlign: 'center'}}>Первичное заведение данных по предполагаемому обеспечению</h2>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <TextField id="outlined-basic" label="ИИН" variant="outlined" inputProps={{ pattern: '[0-9]' }} className={classes.inputs}/>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <TextField id="outlined-basic" label="ФИО" variant="outlined" className={classes.inputs}/>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <TextField id="outlined-basic" label="Тип недвижимости" variant="outlined" className={classes.inputs}/>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <TextField id="outlined-basic" label="Месторасположение" variant="outlined" className={classes.inputs}/>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <TextField id="outlined-basic" label="Общая площадь, кв.м." variant="outlined"  className={classes.inputs}/>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <TextField id="outlined-basic" label="Площадь прилегающего земельного участка, га" variant="outlined"  className={classes.inputs}/>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <TextField id="outlined-basic" label="Материал стен" variant="outlined"  className={classes.inputs}/>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <TextField id="outlined-basic" label="Дата оценки" variant="outlined"  className={classes.inputs}/>
        </Grid>
        <Grid item xs={12} className={classes.paper}>
          <TextField id="outlined-basic" label="Стоимость, тг" variant="outlined"  className={classes.inputs}/>
        </Grid>
      </Grid>
    </div>
    )
}