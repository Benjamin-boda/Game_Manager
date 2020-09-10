import React from "react";
import UserHomepageItem from "./UserHomepageItem";
import GameFilters from "./GameFilters";
import GamesSummary from "./GamesSummary";

const UserHomepage = () => {

    return (
        <div>
            <GamesSummary/>
            <GameFilters/>
            <UserHomepageItem/>
        </div>
    )
}

export default UserHomepage;