import GameFilters from "../../components/GameFilters";
import React from "react";
import { mount } from "enzyme";
import games from "../fixtures/games";
import { Provider } from "react-redux";
import * as redux from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from "redux-mock-store";
import { shallowToJson } from "enzyme-to-json";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore({games: games});

test("should render GameFilters page correctly", () => {
    const wrapper = shallowToJson(mount(
        <Provider store={store}>
            <GameFilters /> 
        </Provider>
        ))
    expect(wrapper).toMatchSnapshot();
});

test("should call setTextFilter", () => {
    const spy = jest.spyOn(redux, 'useDispatch')
    spy.mockReturnValue(jest.fn())
    const wrapper = mount(
        <Provider store={store}>
            <GameFilters   setTextFilter={spy}/> 
        </Provider>
        )

    wrapper.find("input").prop("onChange");

    expect(spy).toHaveBeenCalled();
});

test("should call setStatusfilter", () => {
    const spy = jest.spyOn(redux, 'useDispatch')
    spy.mockReturnValue(jest.fn())
    const wrapper = mount(
        <Provider store={store}>
            <GameFilters   setStatusFilter={spy}/> 
        </Provider>
        )

    wrapper.find("select").at(1).prop("onChange");

    expect(spy).toHaveBeenCalled();
});

test("should call setByConsole", () => {
    const spy = jest.spyOn(redux, 'useDispatch')
    spy.mockReturnValue(jest.fn())
    const wrapper = mount(
        <Provider store={store}>
            <GameFilters   setByConsole={spy}/> 
        </Provider>
        )

    wrapper.find("select").at(0).prop("onChange");

    expect(spy).toHaveBeenCalled();
});

test("should call sortByDate", () => {
    const spy = jest.spyOn(redux, 'useDispatch')
    spy.mockReturnValue(jest.fn())
    const wrapper = mount(
        <Provider store={store}>
            <GameFilters   sortByDate={spy}/> 
        </Provider>
        )

    wrapper.find("select").at(2).prop("onChange");

    expect(spy).toHaveBeenCalled();
});
