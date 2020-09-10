import React, {useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {startEditGame} from "../actions/games";
import moment from "moment";
import {SingleDatePicker} from "react-dates";

const EditGame = () => {
    const {id} = useParams()
    const gamesInStore = useSelector(state => state.games)
    const game = gamesInStore.find(game => game.id === id)
    const dispatch = useDispatch()
    const history = useHistory()

    const [boughtAt, setBoughtAt] = useState(moment(game.boughtAt))
    const [focused, setFocused] = useState(false)
    const [played, setPlayed] = useState(game.played)

    const onSubmit = (e) => {
        e.preventDefault()

        const gameEdit = {
            image: game.image,
            title : game.title,
            platform: game.platform,
            boughtAt: boughtAt.valueOf(),
            played: played
            }
        
        dispatch(startEditGame(id, gameEdit))

        history.push("/dashboard")
    }

    const onChange = (e) => {
        setPlayed(e.target.value)
    }

    const onDateChange = (boughtAt) => {
        setBoughtAt(boughtAt)
        console.log(boughtAt.valueOf())
    } 

    const onFocusChange = ({focused}) => {
        setFocused(focused)
    } 

    return (
        <div className="content-container">
            <form className="input-group__edit" onSubmit={onSubmit}>
                <div className="input-group__item">
                    <img className="list-image" src={game.image}/>
                </div>
                <div className="input-group__item">
                    <input className="text-input" type="text" value={game.title} readOnly="readOnly"/>
                </div>
                <div className="input-group__item">
                    <input className="text-input" type="text" value={game.platform} readOnly="readOnly"/>
                </div>
                <div className="input-group__item">
                    <SingleDatePicker 
                            date={boughtAt}
                            onDateChange={onDateChange}
                            focused={focused}
                            onFocusChange={onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={()=> false}
                        />
                </div>
                <div className="input-group__item">
                    <select className="select" name="games" onChange={onChange}>
                        <option value={game.played}>{game.played}</option>
                        <option value="Never played">Never played</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Finished">Finished</option>
                    </select>
                </div>
                <div className="input-group__item">
                    <button className="list-button">Edit game</button>
                </div>
            </form>
        </div>
    )
}

export default EditGame;