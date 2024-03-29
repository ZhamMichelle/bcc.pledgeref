import React from "react";
import { Switch, Route } from "react-router-dom";
import { NavbarUp } from "./NavbarUp";
import { MainPage } from "./SecondaryHousing/MainPage";
import { MainPagePrimary } from "./PrimaryHousing/MainPagePrimary";
import { MainPageSecondaryAuto } from "./SecondaryAutomobiles/MainPageSecondaryAuto";
import { ElementPrimary } from "./PrimaryHousing/ElementPrimary";
import { Element } from "./SecondaryHousing/Element";
import { FormState } from "../api/Services";
import { Logging } from "./Logging";
import { RefSector } from "./RefSector";
import { ElementSecondaryAuto } from "./SecondaryAutomobiles/ElementSecondaryAuto";

const Page = () => {
  return (
    <React.Fragment>
      <NavbarUp />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/primaryHousing" component={MainPagePrimary} />
        <Route exact path="/secondaryAuto" component={MainPageSecondaryAuto} />
        <Route path="/logging" component={Logging} />
        <Route path="/refsector" component={RefSector} />
        <Route
          path={`/:id/secauto/edit`}
          component={(props) => (
            <ElementSecondaryAuto {...props} formState={FormState.EDIT} />
          )}
        />
        <Route
          path={`/:id/secauto`}
          component={(props) => (
            <ElementSecondaryAuto {...props} formState={FormState.READ} />
          )}
        />
        <Route
          path="/secauto/create"
          component={(props) => (
            <ElementSecondaryAuto {...props} formState={FormState.CREATE} />
          )}
        />
        <Route
          path={`/:id/primary/edit`}
          component={(props) => (
            <ElementPrimary {...props} formState={FormState.EDIT} />
          )}
        />
        <Route
          path="/primary/create"
          component={(props) => (
            <ElementPrimary {...props} formState={FormState.CREATE} />
          )}
        />
        <Route
          path={"/:id/primary"}
          component={(props) => (
            <ElementPrimary {...props} formState={FormState.READ} />
          )}
        />
        <Route
          path={`/:id/edit`}
          component={(props) => (
            <Element {...props} formState={FormState.EDIT} />
          )}
        />
        <Route
          path="/create"
          component={(props) => (
            <Element {...props} formState={FormState.CREATE} />
          )}
        />
        <Route
          path="/secondaryAuto/create"
          component={(props) => (
            <ElementSecondaryAuto {...props} formState={FormState.CREATE} />
          )}
        />
        <Route
          path="/:id"
          component={(props) => (
            <Element {...props} formState={FormState.READ} />
          )}
        />
      </Switch>
    </React.Fragment>
  );
};

export default Page;
