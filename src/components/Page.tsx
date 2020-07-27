import React from "react";
import { Switch, Route, } from "react-router-dom";
import { NavbarUp } from "./NavbarUp";
import {MainPage} from './MainPage'
import {Element} from './Element'
import { FormState, } from '../api/Services';
import {Logging} from './Logging';
import {RefSector} from './RefSector';

const Page = () => {
  return (
    <React.Fragment>
      <NavbarUp />
        <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path='/logging' component={Logging} />
        <Route path='/refsector' component={RefSector} />
        <Route path={`/:id/edit`} component={(props)=> <Element {...props} formState={FormState.EDIT}/> } />
        <Route path='/create' component={(props)=> <Element {...props} formState={FormState.CREATE}/> } />
        <Route path='/:id' component={(props)=> <Element {...props} formState={FormState.READ}/> } />
        </Switch>
    </React.Fragment>
  );
};

export default Page;