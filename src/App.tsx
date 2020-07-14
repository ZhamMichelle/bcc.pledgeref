import React from 'react';
import { CityAnalysis } from './components/CityAnalysis';
import {MainPage} from './components/MainPage'
import { createBrowserHistory } from "history";
import { BrowserRouter, Switch, Route, Link, Router } from "react-router-dom";
import { Toaster, Position, IToastProps, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export const history = createBrowserHistory();

export const AppContext = React.createContext({
  showToastCreate: () => {},
  showToastDelete: () => {},
  showToastEdit: () => {},
  showToastError: (message: string) => console.error(message),
});

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
      intent: Intent.WARNING,
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
      {/* <Route exact path="/login" component={Login} /> */}
      <Route path="/" component={MainPage} />
    </Switch>
  </Router>
  </AppContext.Provider>
  </div>
  );
}

export default App;
