import gamesReducer from "../../reducers/games";
import games from "../fixtures/games";

test("should set default games values", () => {
    const state = gamesReducer(undefined, {type: "@@INIT"});
    expect(state).toEqual([]);
});

test("should remove game by id", () => {
    const action = {
        type: "REMOVE_GAME",
        id: games[2].id
    };
    const state = gamesReducer(games, action);
    expect(state).toEqual([games[0], games[1]])
});

test("should not remove game if the id don't match", () => {
    const action = {
        type: "REMOVE_GAME",
        id: "-1"
    };
    const state = gamesReducer(games, action);
    expect(state).toEqual(games)
});

test("should add a game", () => {
    const game = {
        id: "4",
        image: "",
        title: "shinobi",
        platform : "3ds",
        boughtAt : 0,
        played : "never"
    };
    const action = {
        type: "ADD_GAME",
        game
    };
    const state = gamesReducer(games, action);
    expect(state).toEqual([...games, game])
});

test("should edit a game", () => {
    const played = "ongoing"
    const action = {
        type: "EDIT_GAME",
        id: games[1].id,
        updates: {
            played
        }
    };
    const state = gamesReducer(games, action);
    expect(state[1].played).toBe(played)
});

test("should not edit a game", () => {
    const title = "tsubasa"
    const action = {
        type: "EDIT_GAME",
        id: "12",
        updates: {
            title
        }
    };
    const state = gamesReducer(games, action);
    expect(state).toEqual(games)
});

test("should set games", () => {
    const action = {
        type: "SET_GAMES",
        games: [games[1]]
    };
    const state = gamesReducer(games, action);
    expect(state).toEqual([games[1]])
});