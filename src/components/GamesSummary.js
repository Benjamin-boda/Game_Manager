import React from "react";
import getVisibleGames from "../selectors/games";
import {useSelector} from "react-redux";

export const GamesSummary = () => {
    const gamesInStore = useSelector(state => getVisibleGames(state.games, state.filters))

    const gameWord = gamesInStore.length === 1 ? "1 game" : `${gamesInStore.length} games`;
    const gameStatus = []

    gamesInStore.map((game) => {
        gameStatus[game.played] ? gameStatus[game.played]++ : gameStatus[game.played] = 1
    })

    return (
        <div className="summary">
            <h1 className="summary__title">Viewing <span>{gameWord}</span></h1>
            <div className="summary__status">
                <h2 className="summary__status__h2">{gameStatus[""] ? `No status : ${gameStatus[""]}` : undefined } </h2>
                <h2 className="summary__status__h2">{gameStatus["Never played"] ? `Never played : ${gameStatus["Never played"]}` : undefined}</h2>
                <h2 className="summary__status__h2">{gameStatus.Ongoing ?  `Ongoing : ${gameStatus.Ongoing}` :  undefined}</h2>
                <h2 className="summary__status__h2">{gameStatus.Finished ? `Finished : ${gameStatus.Finished}` :  undefined}</h2>
            </div>
        </div>
    )
};

export default GamesSummary;