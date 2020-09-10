import React, { useContext, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicRoute = ({ component: RouteComponent, ...rest }) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <Redirect to={"/homepage"} />
                ) : (
                    <Fragment>
                        <Header/>
                        <RouteComponent {...routeProps} />
                        <Footer/>
                    </Fragment>
                )
            }
        />
    );
};

export default PublicRoute
