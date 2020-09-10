import React, { useState } from "react";
import {setTextFilter, setStatusFilter, setByConsole, sortByDate} from "../actions/filters";
import {useDispatch, useSelector} from "react-redux";

const GameFilters = () => {
    const dispatch = useDispatch()
    const gamesInStore = useSelector(state => state.games)
    const platformInStore = gamesInStore.map((game) => game.platform)
    const uniquePlatform = Array.from(new Set(platformInStore));

    const onTextChange = (e) => {
        dispatch(setTextFilter(e.target.value))
    }

    const onStatusChange = (e) => {
        dispatch(setStatusFilter(e.target.value))
    }

    const onDateChange = (e) => {
        dispatch(sortByDate(e.target.value))
    }

    const onConsoleChange = (e) => {
        dispatch(setByConsole(e.target.value))
    }

    return (
        <div className="content-container">
            <div className="input-group">
                <div className="input-group__item">
                    <input
                        className="text-input"
                        type="text" 
                        placeholder="Search games by title"
                        onChange={onTextChange}
                    />
                </div>
                <div className="input-group__item">
                    <select className="select" name="platform" onChange={onConsoleChange}>
                        <option value="">--Filter by platform--</option>
                        {
                            uniquePlatform.map((gamePlatform) => 
                                <option key={gamePlatform}>{gamePlatform}</option>
                            )
                        }
                    </select>
                </div>
                <div className="input-group__item">
                    <select className="select" name="games" onChange={onStatusChange}>
                            <option value="">--Filter by status--</option>
                            <option value="Never played">Never played</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Finished">Finished</option>
                    </select>
                </div>
                <div className="input-group__item">
                    <select className="select" name="date" onChange={onDateChange}>
                            <option value="">--Sort by bought date--</option>
                            <option value="oldDate">Old to new</option>
                            <option value="newDate">New to old</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default GameFilters;