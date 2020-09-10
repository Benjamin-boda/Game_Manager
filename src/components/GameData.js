import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddGame from "./AddGame";

const GameData = () => {
    const {title , platform} = useParams()
    const [data, setData] = useState([])
    const [displayAddGame, setDisplayAddGame] = useState(false)

    useEffect(() => {
        async function getChickenApi() {
            const fetchUrl = await fetch(`https://chicken-coop.p.rapidapi.com/games/${title}?platform=${platform}`, {
                "method": "GET",
                "headers": {
                  "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
                  "x-rapidapi-key": "769c8e5236mshb7b9fd0b7a97d8fp181f53jsn56dac5b71106"
                }})
            const json = await fetchUrl.json()
            return json.result    
        }

        getChickenApi()
        .then(res => {
            setData(res)
        })
    }, [{title, platform}])

    const displayAddComponent = () => {
        setDisplayAddGame(!displayAddGame)
    }

    return (
        <div className="content-container">
            <img className="gamedata__image" src={data.image}/>
            <h2 className="gamedata__title">{data.title}</h2>       
            <p className="gamedata__description">{data.description}</p>
            <div className="gamedata__infos">
                <p className="gamedata__infos__item">Release date : {data.releaseDate}</p>
                <p className="gamedata__infos__item">Platform : {platform}</p>
                <p className="gamedata__infos__item">Developer : {data.developer}</p>
            </div>    
            <h3 className="gamedata__score">Score : {data.score}/100</h3>  
            <div className="gamedata__button">
                <button className="gamedata__infos__button" onClick={displayAddComponent}>{displayAddGame ? "Don't add" : "Add game"}</button>
            </div>
            {displayAddGame ? <AddGame data={data} platform={platform} displayAddComponent={displayAddComponent}/> : undefined}
        </div>
    )
}

export default GameData;