import React, { useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { AnalysisElements, ListService, FormState, Element } from '../api/Services';
import Grid from '@material-ui/core/Grid';
import {FormControl, Select, InputLabel} from "@material-ui/core";
import {Elements} from './Elements'
import { Switch, Route } from "react-router-dom";


  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    }, 
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
  }),
);
export const RouteApi = (props: any)=>{
const { match: _match }: { match: any } = props;
    const classes = useStyles();

return (
        <div>
            <Switch>
            {/* <Route
          exact
          path={`${_match.path}/commands`}
          component={() =>
            Layout(
              Commands,
              "Зарегистрированные команды",
              `${_match.path}/command`
            )
          }
        /> */}
            </Switch>
        </div>
    )
}