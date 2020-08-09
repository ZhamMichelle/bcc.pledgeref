import React, { useState } from 'react';
import { createBrowserHistory } from "history";
import { Switch, Route,  Router, } from "react-router-dom";
import Login from "./login/Login";
import Page from './components/Page'
import {createStore} from 'redux';
import {rootReducer} from './store/Reducers'
import { Provider} from 'react-redux';

export const history = createBrowserHistory();
const store = createStore(rootReducer);
export const AppContext = React.createContext({
  showToastCreate: () => {},
  showToastDelete: () => {},
  showToastEdit: () => {},
  showToastError: (message: string) => console.error(message),
});
export const PATH_REFERENCE_BOOK = "/reference-book";

function App() {
 
  return (
    <Provider store={store} >
    <Router history={history}>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route  path="/" component={Page} />
    </Switch>
  </Router>
  </Provider>
  );
}

export default App;
