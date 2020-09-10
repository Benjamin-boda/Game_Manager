import database from "../../firebase/firebase";
import * as firebase from "firebase";

//ADD_GAME

export const addGame = (game) => ({
    type: "ADD_GAME",
    game
});

export const startAddGame = (gameData) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            image = "",
            title = "",
            platform = "",
            boughtAt = 0,
            played = ""
        } = gameData;
        const game = {image, title, platform, boughtAt, played};

        return database.ref(`users/${uid}/games`).push(game).then((ref) => {
            dispatch(addGame({
                id: ref.key,
                ...game
            }))
        })
    }
}

//REMOVE_GAME

export const removeGame = ({id} = {}) => ({
    type: "REMOVE_GAME",
    id
});

export const startRemoveGame = ({id}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/games/${id}`).remove().then(() => {
            dispatch(removeGame({id}))
        })
    }
}

//EDIT_GAME

export const editGame = (id, updates) => ({
    type: "EDIT_GAME",
    id,
    updates
});

export const startEditGame = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/games/${id}`).update(updates).then(() => {
            dispatch(editGame(id, updates))
        })
    }
}

//SET_GAMES

export const setGames = (games) => ({
    type: "SET_GAMES",
    games
})

export const startSetGames = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/games`).once("value").then((snapshot) => {
            const games = [];

            snapshot.forEach((childSnapshot) => {
                games.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
        dispatch(setGames(games))
        })
    }
}

