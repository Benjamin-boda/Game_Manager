import GameData from "../../components/GameData";
import React from "react";
import { mount } from "enzyme";
import games from "../fixtures/games";
import { Provider } from "react-redux";
import * as redux from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from "redux-mock-store";
import { shallowToJson } from "enzyme-to-json";
import { MemoryRouter, Switch } from 'react-router-dom'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

test("should render AddGame page correctly", () => {
    const wrapper = shallowToJson(mount(
        <Provider store={store}>
            <MemoryRouter  initialEntries={['/']} keyLength={0}>
               <GameData data={games[0]} displayAddGame={false}/> 
            </MemoryRouter>
        </Provider>
        ))
    expect(wrapper).toMatchSnapshot();
});

// test("should open addGame", () => {
//     const displayAddComponent = jest.fn()
//     const wrapper = mount(
//         <Provider store={store}>
//             <MemoryRouter  initialEntries={['/']} keyLength={0}>
//                <GameData data={games[0]} displayAddComponent={displayAddComponent} /> 
//             </MemoryRouter>
//         </Provider>
//     )

//     wrapper.find("button").simulate("click");
//     expect(displayAddComponent).toHaveBeenCalled(); 
// });