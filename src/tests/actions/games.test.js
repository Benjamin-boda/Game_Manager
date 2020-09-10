import {startAddGame, addGame, removeGame, startRemoveGame, editGame, startEditGame, setGames, startSetGames} from "./gamesaction";
import games from "../fixtures/games";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import database from "../../firebase/firebase";

const uid = "uidtest";
const defaultAuthState = {auth : {uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const gamesData = {};
    games.forEach(({ id, image, title, platform, boughtAt, played }) => {
        gamesData[id] = { image, title, platform, boughtAt, played};
    });
    database.ref(`users/${uid}/games`).set(gamesData).then(() => done());
});

test("should setup add game action object with provided value", () => {
    const action = addGame(games[0]);
    expect(action).toEqual({
        type: "ADD_GAME",
        game : games[0]
    });
});

test("should add game to database and store" , (done) => {
    const store = createMockStore(defaultAuthState);
    const gameData = {
        image : "",
        title : "godofwar",
        platform : "playstation-3",
        boughtAt : 123,
        played : "never"
    }

    store.dispatch(startAddGame(gameData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_GAME",
            game: {
                id: expect.any(String),
                ...gameData
            }
        });

        return database.ref(`users/${uid}/games/${actions[0].game.id}`).once("value")
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(gameData);
            done();
    });
});

test("should setup remove game action", () =>{
    const action = removeGame({ id: "123abc" });
    expect(action).toEqual({
        type: "REMOVE_GAME",
        id: "123abc"
    });
});

test("should remove expense to firebase and store" , (done) => {
    const store = createMockStore(defaultAuthState);
    const id = games[2].id
    store.dispatch(startRemoveGame({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "REMOVE_GAME",
            id
        });

        return database.ref(`users/${uid}/games/${id}`).once("value");
        }).then((snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
    });
});

test("should setup edit game action", () => {
    const action = editGame("123abc", {title: "pokemon"});
    expect(action).toEqual({
        type: "EDIT_GAME",
        id: "123abc",
        updates: {
            title:"pokemon" 
        }
    });
});

test("should setup start edit game action to firebase and store", (done) => {
    const store = createMockStore(defaultAuthState);
    const id = games[0].id;
    const updates = { played: "a little"};
    store.dispatch(startEditGame(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "EDIT_GAME",
            id,
            updates
        });
        return database.ref(`users/${uid}/games/${id}`).once("value");
    }).then((snapshot) => {
        expect(snapshot.val().played).toBe(updates.played);
        done();
    });
});



test("should add game with default to database and store" , (done) => {
    const store = createMockStore(defaultAuthState);
    const gameData = {
        image : "",
        title : "",
        platform : "",
        boughtAt : 0,
        played : ""
    }

    store.dispatch(startAddGame(gameData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_GAME",
            game: {
                id: expect.any(String),
                ...gameData
            }
        });

        return database.ref(`users/${uid}/games/${actions[0].game.id}`).once("value")
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(gameData);
            done();
    });
});

test("should setup set game action object with data", () => {
    const action = setGames(games);
    expect(action).toEqual({
        type: "SET_GAMES",
        games
    });
});

test("should fetch the games from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetGames()).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: "SET_GAMES",
            games
        });
        done();
    });
});