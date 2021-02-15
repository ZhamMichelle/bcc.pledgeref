import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./logo-bcc.svg";
import { Grid, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
    },
    containerStyle: {
      padding: 16,
    },
    btnStyle: {
      color: "#27ae60",
    },
    buttonsContainer: {
      textAlign: "right",
    },
    nameSpace: {
      margin: "0 0 0 12px",
    },
  })
);

export const NavbarUp = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid
        container
        className={classes.containerStyle}
        alignItems="center"
        justify="space-between"
      >
        <Grid item xs={6} container alignItems="center">
          <Grid item>
            <img src={logo} />
          </Grid>
          <Grid item>
            <h2 className={classes.nameSpace}>Справочник</h2>
          </Grid>
        </Grid>
        <Grid item xs={6} className={classes.buttonsContainer}>
          <Button
            variant="outlined"
            color="primary"
            href="/"
            className={classes.btnStyle}
          >
            Анализ цен Вторички
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="outlined"
            color="primary"
            href="/primaryHousing"
            className={classes.btnStyle}
          >
            Анализ цен Первички
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="outlined"
            color="primary"
            href="/secondaryAuto"
            className={classes.btnStyle}
          >
            Анализ цен Вторичного Авто
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="outlined"
            color="primary"
            href="/logging"
            className={classes.btnStyle}
          >
            История
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="outlined"
            color="primary"
            href="/refsector"
            className={classes.btnStyle}
          >
            Справочник по секторам
          </Button>
          {/* &nbsp;&nbsp;
       <Button variant="outlined" color="primary" href="/testsector" style={{color:'#27ae60', marginTop:'12px', }} >Test</Button> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
