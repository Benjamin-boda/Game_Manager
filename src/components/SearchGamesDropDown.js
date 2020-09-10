import React, {Fragment} from "react";
import {Link} from "react-router-dom"

const SearchGamesDropDown = ({data, setData, setDataIsReady}) => {
    const onClick = () => {
        setData([])
        setDataIsReady(false)
    }
    return (
        <Fragment>
            <li key={data.title + data.platform}>
                <Link onClick={onClick} to={`/games/${data.title}/${data.platform}`}>
                    {data.title} - {data.platform}
                </Link>    
            </li>
        </Fragment>
    )
}

export const SearchGamesDropDownNoItem = () => {
    return (
        <Fragment>
            <li>
                <span>No result</span>
            </li>
        </Fragment> 
    )
}

export {SearchGamesDropDown as default}