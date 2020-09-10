import moment from "moment";

//Get visible games

const getVisibleGames = (games, filters) => {
    return games.filter((game) => {
        const consoleMatch = game.platform.toLowerCase().includes(filters.console.toLowerCase());
        const textMatch = game.title.toLowerCase().includes(filters.text.toLowerCase());
        const statusMatch = game.played.toLowerCase().includes(filters.status.toLowerCase());

        return textMatch && statusMatch && consoleMatch;
    })
    .sort((a, b) => {
        if (filters.sortBy === "newDate") {
            return a.boughtAt < b.boughtAt ? 1 : -1;
        } else if (filters.sortBy === "oldDate") {
            return a.boughtAt < b.boughtAt ? -1 : 1;
        };
    })
};

export default getVisibleGames;