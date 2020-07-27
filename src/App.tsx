import React, { useState } from 'react';
import {MainPage} from './components/MainPage'
import {Element} from './components/Element'
import { createBrowserHistory } from "history";
import { Switch, Route,  Router, } from "react-router-dom";
import { Toaster, Position, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import Login from "./login/Login";
import { FormState, } from './api/Services';
import Page from './components/Page'

export const history = createBrowserHistory();

export const AppContext = React.createContext({
  showToastCreate: () => {},
  showToastDelete: () => {},
  showToastEdit: () => {},
  showToastError: (message: string) => console.error(message),
});
export const PATH_REFERENCE_BOOK = "/reference-book";

function App() {
  let toaster: Toaster;
  const refHandlers = {
    toaster: (ref: Toaster) => (toaster = ref),
  };

  const showToastCreate = () => {
    toaster.show({
      icon: IconNames.SMALL_TICK,
      message: "Успешно зарегистрирован",
      intent: Intent.SUCCESS,
      timeout: 3000,
    });
  };

  const showToastDelete = () => {
    toaster.show({
      icon: IconNames.SMALL_TICK,
      message: "Успешно удален",
      intent: Intent.PRIMARY,
      timeout: 3000,
    });
  };

  const showToastEdit = () => {
    toaster.show({
      icon: IconNames.SMALL_TICK,
      message: "Успешно изменен",
      intent: Intent.SUCCESS,
      timeout: 3000,
    });
  };

  const showToastError = (message: string) => {
    toaster.show({
      icon: IconNames.ERROR,
      message,
      intent: Intent.DANGER,
      timeout: 3000,
    });
  };

  return (
    <div>
      <Toaster position={Position.TOP} ref={refHandlers.toaster} />
      <AppContext.Provider
        value={{
          showToastCreate,
          showToastDelete,
          showToastEdit,
          showToastError,
        }}
      >
    <Router history={history}>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route  path="/" component={Page} />
      {/* <Route exact path="/" component={MainPage} />
      <Route path={`/:id/edit`} component={(props)=> <Element {...props} formState={FormState.EDIT}/> } />
      <Route path='/create' component={(props)=> <Element {...props} formState={FormState.CREATE}/> } />
      <Route path='/:id' component={(props)=> <Element {...props} formState={FormState.READ}/> } /> */}
    </Switch>
  </Router>
  </AppContext.Provider>
  </div>
  );
}

export default App;
