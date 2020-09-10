import React from "react";
import { mount } from "enzyme";
import { AddGame } from "../../components/AddGame";
import games from "../fixtures/games";
import { Provider } from "react-redux";
import * as redux from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from "redux-mock-store";
import { shallowToJson } from "enzyme-to-json";
import 'react-dates/initialize'
import moment from "moment"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

beforeEach(() => {
    Date.now = jest.fn(() => 1482363367071)
});

test("should render AddGame page correctly", () => {
    const wrapper = shallowToJson(mount(
        <Provider store={store}>
            <AddGame data={games[0]} platform={games[0].platform} date={moment(120)}/> 
        </Provider>
        ))
    expect(wrapper).toMatchSnapshot();
});

test("should handle onsubmit", () => {
    const spy = jest.spyOn(redux, 'useDispatch')
    spy.mockReturnValue(jest.fn())
    const wrapper = mount(
        <Provider store={store}>
            <AddGame data={games[0]} platform={games[0].platform} onSubmit={spy} displayAddComponent={jest.fn()}/> 
        </Provider>
        )
   
    wrapper.find("form").simulate("submit");

    expect(spy).toHaveBeenCalled(); 
});
