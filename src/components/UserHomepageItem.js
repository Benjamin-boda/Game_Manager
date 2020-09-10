import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { startRemoveGame } from "../actions/games";
import moment from "moment";
import {Link} from "react-router-dom"
import getVisibleGames from "../selectors/games";


const UserHomepageItem = () => {
    const gamesInStore = useSelector(state => getVisibleGames(state.games, state.filters))
    const dispatch = useDispatch()

    return (
        <div className="content-container">
            <div className="list-header">
                <div className="show-for-mobile">Games</div>
                <div className="show-for-desktop">Image</div>
                <div className="show-for-desktop">Game</div>
                <div className="show-for-desktop">Platform</div>
                <div className="show-for-desktop">Bought At</div>
                <div className="show-for-desktop">Status</div>
            </div>
            <div className="list-body">
                {gamesInStore.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>No game</span>
                    </div>
                ) :
                gamesInStore.map((game) => 
                    <div className="list-game" key={game.id}>
                        <Link className="list-item" to={`/edit/${game.id}`}>
                            <img className="list-image" src={game.image}/>
                            <h3 className="list-item__title">{game.title}</h3>
                            <p className="list-item__title">{game.platform}</p>
                            <p className="list-item__title">{moment(game.boughtAt).format("DD/MM/YYYY")}</p>
                            <p className="list-item__title">{game.played}</p>
                        </Link>
                        <button className="list-button" onClick={() => dispatch(startRemoveGame(game))}>Remove</button>
                    </div>
                )}
            </div> 
        </div>
    )
}

export default UserHomepageItem;