import React from "react";
import {Router, Route, Link, Switch, NavLink} from "react-router-dom";
import {createBrowserHistory} from "history";
import GameData from "../components/GameData";
import PublicRoute from "./PublicRouter";
import PrivateRoute from "./PrivateRoute"
import EditGame from "../components/EditGame";
import LoginPage from "../components/LoginPage";
import HomePage from "../components/HomePage";
import UserHomepage from "../components/UserHomepage";
import NotFoundPage from "../components/NotFoundPage";
import {AuthProvider} from "../firebase/Auth";

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        
            <AuthProvider>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact/>
                <PrivateRoute path="/homepage" component={HomePage} />
                <PrivateRoute path="/games/:title/:platform" component={GameData} />
                <PrivateRoute path="/edit/:id" component={EditGame} />
                <PrivateRoute path="/dashboard" component={UserHomepage} />
                <Route component={NotFoundPage}/>
                </Switch>
            </AuthProvider>
        
    </Router>
)

export default AppRouter;