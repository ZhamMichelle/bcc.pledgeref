import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Elements} from './Elements'
import {Element} from './Element'
import { Switch, Route } from "react-router-dom";
import Layout from '../hoc/Layout'
import { MainPage } from './MainPage';
import {  FormState } from '../api/Services';

const RouteApi = (props: any)=>{
const { match: _match }: { match: any } = props;

return (
        <div>
            <Switch>
            <Route
          exact
          path={`${_match.path}/elements`}
          component={() =>
            Layout(
              MainPage,
              "Список",
              `${_match.path}/elements`
            )
          }
        />
        <Route
          exact
          path={`${_match.path}/element`}
          component={() =>
            Layout(
              () => Element({ formState: FormState.CREATE }),
              "Добавление элемента"
            )
          }
        />
        <Route
          exact
          path={`${_match.path}/element/:id`}
          render={props =>
            Layout(
              () => Element({ ...props, formState: FormState.READ }),
              "Просмотр элемента"
            )
          }
        />
        <Route
          exact
          path={`${_match.path}/element/:id/edit`}
          render={props =>
            Layout(
              () => Element({ ...props, formState: FormState.EDIT }),
              "Изменение элемента"
            )
          }
        />
            </Switch>
        </div>
    )
}

export default RouteApi;