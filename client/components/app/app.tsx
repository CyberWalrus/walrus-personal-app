import RoutePath from "@client/routes";
import * as React from "react";
import { FunctionComponent, ReactElement } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PageInfo from "../page-info/page-info";
import PageLogin from "../page-login/page-login";
import PageMain from "../page-main/page-main";
import PageOption from "../page-option/page-option";
import PageSignUp from "../page-sign-up/page-sign-up";

const App: FunctionComponent = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={RoutePath.INDEX} exact={true} component={PageMain} />
        <Route path={RoutePath.INFO} exact={true} component={PageInfo} />
        <Route path={RoutePath.LOGIN} exact={true} component={PageLogin} />
        <Route path={RoutePath.SIGNUP} exact={true} component={PageSignUp} />
        <Route path={RoutePath.OPTION} exact={true} component={PageOption} />
        <Redirect to={RoutePath.INDEX} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
