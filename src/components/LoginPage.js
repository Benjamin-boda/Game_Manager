import React from "react";
import {useDispatch} from "react-redux";
import {startLogin} from "../actions/auth";

export const LoginPage = () => {
    const dispatch = useDispatch()
    return (
        <div className="box-layout">
            <div className="box-layout__box">
                <h2 className="box-layout__title">Connect to see your game list</h2>
                <p>Manage to finish your games</p>
                <button className="button__login" onClick={() => {dispatch(startLogin())}}>Login with Google</button>
            </div>
        </div>
    )
};

export default LoginPage;