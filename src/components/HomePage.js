import React,{useState, useEffect, Fragment} from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [randomTheme] = useState(["final", "sonic", "dragon", "assassin"])
    const [randomGames, setRandomGames] = useState([])
    const [randomUrls, setRandomUrls] = useState([])
    const [gamesDatas, setGamesDatas] = useState([])
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getChickenApi() {
          const random = Math.floor(Math.random() * randomTheme.length)
          console.log(randomTheme[random])
          const fetchUrl = await fetch(`https://chicken-coop.p.rapidapi.com/games?title=${randomTheme[random]}`, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
              "x-rapidapi-key": "769c8e5236mshb7b9fd0b7a97d8fp181f53jsn56dac5b71106"
            }
          })
          // Array of random games
          const json = await fetchUrl.json()
          const jsonPlat = json.result.map(({title, platform}) => platform)
          const platformArray = jsonPlat.map((jsonPla) => {
            if (jsonPla === "PS4") {
              return "playstation-4"
            } else if (jsonPla === "Switch") {
              return "switch"
            } else if (jsonPla === "X360") {
              return "xbox-360"
            } else if (jsonPla === "PS3") {
              return "playstation-3"
            } else if (jsonPla === "WIIU") {
              return "wii-u"
            } else if (jsonPla === "WII") {
              return "wii"
            } else if (jsonPla === "XONE") {
              return "xbox-one"
            } else if (jsonPla === "PC") {
              return "pc"
            } else if (jsonPla === "iOS") {
              return "ios"
            } else if (jsonPla === "3DS") {
              return "3ds"
            }
          })
          const jsonRandomGames = json.result.map((json, index) => {
            return {"title":json.title, "platform": platformArray[index]}
          })
          setRandomGames(jsonRandomGames)
          
          //Array of urls with the ramdom games data
          const jsonUrls = jsonRandomGames.map((jsonRandomGame) => {
            return `https://chicken-coop.p.rapidapi.com/games/${jsonRandomGame.title}?platform=${jsonRandomGame.platform}`
          })
          setRandomUrls(jsonUrls)

          //Array of games which will be on screen
          const fetchRandomUrl = () => {
            const allRequest = jsonUrls.map((jsonUrl) => 
              fetch(jsonUrl, {
                "method": "GET",
                "headers": {
                  "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
                  "x-rapidapi-key": process.env.REACT_APP_SECRET_KEY
                }}).then(res => res.json())
                    .then(result => result.result)
                )
              return Promise.all(allRequest)
          }

          setLoading(true)
          fetchRandomUrl()
            .then(res => {
              console.log(res)
              setGamesDatas(res)
              setLoading(false)
            }).catch(() => {
              setHasError(true)
              setLoading(false)
            })   
          
        }
        getChickenApi()
      }, [])
      
    return (
        <Fragment>
          <h2 className="homepage__title">Famous games</h2>
          <div className="homepage">
            {loading ? <p>Loading...</p> : hasError ? <p>Error occured</p> : gamesDatas.map((gamesData, index) => 
              <div className="homepage__game" key={gamesData.title + gamesData.alsoAvailableOn}>
                <Link className="homepage__link" to={`/games/${randomGames[index].title}/${randomGames[index].platform}`}>
                  <img className="homepage__image" src={gamesData.image}/>
                  <h2>{gamesData.title}</h2>
                  <p>{gamesData.description ? gamesData.description.substring(0, 125) : undefined}...</p>
                  <h3 className="homepage__score">{gamesData.score}/100</h3>
                </Link>
              </div>
              )}
          </div>
          
        </Fragment>
    )
}

export { HomePage as default}