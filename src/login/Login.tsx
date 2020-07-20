import React, { useState, useEffect } from "react";
import { InputGroup, Button, Intent, Card} from "@blueprintjs/core";
import Header from "./Header";
import {LoginServer, UserParams} from "../api/Services";
import { history } from "../App";
import FadeIn from "react-fade-in";


export const AppContext = React.createContext({
  showToastError: (message: string) => console.error(message),
});

const Login = () => {
  
  const [userPar, setUserPar] =useState(new UserParams());
const loginServer= new LoginServer();
  const onSubmit = (e: any, showToast: (message: string) => void) => {
    e.preventDefault();
    loginServer.getLoginFromServer(userPar)
      .then((userContext) => {
        localStorage.setItem("userContext", JSON.stringify(userContext));
        history.push("/");
      })
      .catch((e) => {showToast(e.response?.data?.message); alert("username or password is incorrect")}
      );
  };

  return (
    <AppContext.Consumer>
      {({ showToastError }) => (
        <form
          onSubmit={(e: any) => onSubmit(e, showToastError)}
          style={{ width: "328px", margin: "auto", marginTop: "200px" }}
        >
          <Card>
            <FadeIn>
              <Header />
              <InputGroup
              
                required
                placeholder="Имя пользователя"
                //onChange={(e: any) => setUserName(e.target.value)}
                onChange={(e: any) => setUserPar({...userPar, username: e.target.value})}
                style={{ height:"50px", width: "328px", border: "1px solid #27AE60", borderRadius: "4px"}}
              />
              <br />
              <InputGroup
              
                required
                type="password"
                placeholder="Пароль"
                //onChange={(e: any) => setPassword(e.target.value)}
                onChange={(e: any) => setUserPar({...userPar, password: e.target.value})}
                style={{ height:"50px", width: "328px", border: "1px solid #27AE60", borderRadius: "4px"}}

              />
              <br />
              <Button
                fill
                type="submit"
                intent={Intent.PRIMARY}
                text="Войти"
                style={{backgroundColor: "#27AE60", height:"50px", width: "328px", color: "white", border: "1px solid #27AE60", borderRadius: "4px", fontSize: "14px"}}
              ></Button>
            </FadeIn>
          </Card>
        </form>
      )}
    </AppContext.Consumer>
  );
};

export default Login;