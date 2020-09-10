import getVisibleGames from "../../selectors/games";
import games from "../fixtures/games";

test("should filter by text value", () => {
    const filters = {
        text: "sonic",
        status: "",
        sortBy: "",
        console: ""
    };
    const result = getVisibleGames(games, filters);
    expect(result).toEqual([games[0]]);
});

test("should sort by old to new date", () => {
    const filters = {
        text: "",
        status: "",
        sortBy: "oldDate",
        console: ""
    };
    const result = getVisibleGames(games, filters);
    expect(result).toEqual([games[1], games[0], games[2]]);
});

test("should sort by console", () => {
    const filters = {
        text: "",
        status: "",
        sortBy: "",
        console: "switch"
    };
    const result = getVisibleGames(games, filters);
    expect(result).toEqual([games[0]]);
});

test("should sort by status", () => {
    const filters = {
        text: "",
        status: "finished",
        sortBy: "",
        console: ""
    };
    const result = getVisibleGames(games, filters);
    expect(result).toEqual([games[1]]);
});