import { mount, shallow } from "enzyme";
import EditGame from "../../components/EditGame";
import games from "../fixtures/games";
import { Provider, useSelector, useDispatch } from "react-redux";
import * as redux from 'react-redux'
import React, { useState as useStateMock } from "react";
import thunk from 'redux-thunk'
import { createMemoryHistory } from 'history'
import { Router, Switch } from 'react-router-dom'
import configureMockStore from "redux-mock-store";
import { shallowToJson } from "enzyme-to-json";
import 'react-dates/initialize'
import moment from "moment";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    games: games
});
const history = createMemoryHistory()

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: jest.fn()
  }));

test("should render EditGame page correctly", () => {
    useStateMock.mockImplementation(initState => [initState, jest.fn()])

    const startEditGame = jest.fn()
    const wrapper = shallowToJson(mount(
        <Provider store={store}>
            <Router history={history}>
                <EditGame 
                    {...mockProps}
                    startEditGame={startEditGame}
                    game={games[0]}
                    boughtAt={setBoughtAt(moment(games[0].boughtAt))}
                /> 
            </Router>
        </Provider>
        ))
    expect(wrapper).toMatchSnapshot();
});

test("should handle onsubmit", () => {
    const spy = jest.spyOn(redux, 'useDispatch')
    spy.mockReturnValue(jest.fn())
    const wrapper = mount(
        <Provider store={store}>
            <Router history={history}>
                <EditGame 
                    startEditGame={spy}
                    gamesInStore={games}
                /> 
            </Router>
        </Provider>
        )
    wrapper.find("form").simulate("submit");
    expect(spy).toHaveBeenCalled();
});


// test("should handle onsubmit", () => {
//     const {id} = 1
//     const spy = jest.spyOn(redux, 'useDispatch')
//     spy.mockReturnValue(jest.fn())
//     const wrapper = mount(
//         <Provider store={store}>
//         <Router history={history}>
//         <EditGame  game={games[0]} id={id} gamesInStore={games} onSubmit={spy}/> 
//         </Router>
            
//         </Provider>
//         )
   
//     wrapper.find("form").simulate("submit");

//     expect(spy).toHaveBeenCalled(); 
// });