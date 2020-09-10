import React, {useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import SearchGames from "./SearchGames";
import {startLogout} from "../actions/auth";
import { AuthContext } from "../firebase/Auth";


export const Header = () => {
    const dispatch = useDispatch()
    const {currentUser} = useContext(AuthContext);

    return (
        <div className="header">
            <div className="header__content">
                <div className="header__content__title">
                    <Link className="header__link" to="/homepage">
                        <h1 className="header__title">Game Manager</h1>
                    </Link>
                    <p className="header__paragraphe show-for-desktop">List the games you have to finish !</p>
                </div>              
                {!!currentUser ? <NavLink className="header__link" to="/dashboard">My Games</NavLink> : undefined}
                {!!currentUser ? <SearchGames/> : undefined}
                <a className="header__link show-for-desktop" href="https://github.com/Benjamin-boda?tab=repositories">Github</a>
                {!!currentUser ? <button className="button header__link header__logout__mobile" onClick={() => {dispatch(startLogout())}}>Logout</button> : undefined}
            </div>
        </div>
    )
}

export default Header;