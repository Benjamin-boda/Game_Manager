import React, {useState, useEffect, Fragment} from "react";
import SearchGamesDropDown, {SearchGamesDropDownNoItem} from "./SearchGamesDropDown";

const SearchGames = () => {
    const [data, setData] = useState([])
    const [dataIsReady, setDataIsReady] = useState(false)
    const [keyword, setKeyword] = useState("")
    
    
    useEffect(() => {
        async function getChickenApi() {
            if (keyword !== "") {
                try {
                    const response = await fetch(`https://chicken-coop.p.rapidapi.com/games?title=${keyword.toLowerCase()}`, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
                            "x-rapidapi-key": process.env.REACT_APP_SECRET_KEY
                        }
                    })
                    const json = await response.json()
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
                    setData(jsonRandomGames)
                    setDataIsReady(true)
                } catch(e) {
                    console.error(e)
                }
            }
        }
        getChickenApi()
    }, [keyword])

    const setKeywordInInput = (e) => {
        setKeyword(e.target.value)
    }

    return (
        <div>
            <input
                className="search"
                type="text"
                placeholder="Search a game..."
                onChange={setKeywordInInput}
                value={keyword}
            />
            <Fragment>
                <div>
                  {dataIsReady ? 
                    <ul className="search__dropdown">
                    {data.map((dat) => 
                      <SearchGamesDropDown key={dat.title + dat.platform} data={dat} setData={setData} setDataIsReady={setDataIsReady} />)}
                    </ul> 
                      : undefined}
                </div>
            </Fragment>
            
        </div>
    )
}



export default SearchGames;