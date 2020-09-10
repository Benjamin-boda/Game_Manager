import React, { useState } from "react";
import {useDispatch} from "react-redux";
import { startAddGame } from "../actions/games";
import {SingleDatePicker} from "react-dates";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";

export const AddGame = ({data, platform, displayAddComponent}) => {
    const dispatch = useDispatch();
    const [played, setPlayed] = useState("")

    const [boughtAt, setBoughtAt] = useState(moment())
    const [focused, setFocused] = useState(false)

    
    const onSubmit = (e) => {
        e.preventDefault()

        const game = {
        image: data.image,
        title : data.title,
        platform: platform,
        boughtAt: boughtAt.valueOf(),
        played: played
        }
        
        displayAddComponent()
        dispatch(startAddGame(game))
    }

    const onChange = (e) => {
        setPlayed(e.target.value)
        console.log(played)
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
            <form className="input-group" onSubmit={onSubmit}>
                <div className="input-group__item">
                    <input className="text-input" type="text" value={data.title} readOnly="readOnly"/>
                </div>
                <div className="input-group__item">
                    <input className="text-input" type="text" value={platform} readOnly="readOnly"/>
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
                        <option value="">--Already started ?--</option>
                        <option value="Never played">Never played</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Finished">Finished</option>
                    </select>
                </div>
                <div className="input-group__item">
                    <button className="list-button">Add to list</button>
                </div>
            </form>
        </div>
    )
}

export default AddGame;
