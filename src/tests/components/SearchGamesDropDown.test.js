import { mount, shallow } from "enzyme";
import SearchGamesDropDown, {SearchGamesDropDownNoItem} from "../../components/SearchGamesDropDown";
import games from "../fixtures/games";
import { Provider, useSelector, useDispatch } from "react-redux";
import React from "react";
import thunk from 'redux-thunk'
import configureMockStore from "redux-mock-store";
import { shallowToJson } from "enzyme-to-json";
import { MemoryRouter, Switch } from 'react-router-dom'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

test("should render SearchGamesDropDown page correctly", () => {
    const data = {title: "sonic", platform: "ps4"}
    const wrapper = shallowToJson(mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/']} keyLength={0}>
                <SearchGamesDropDown data={data}
                    /> 
            </MemoryRouter>
                
            
        </Provider>
        ))
    expect(wrapper).toMatchSnapshot();
});

test("should render SearchGamesDropDownNoItem page correctly", () => {
    const wrapper = shallowToJson(mount(
        <Provider store={store}>
            
                <SearchGamesDropDownNoItem 
                /> 
            
        </Provider>
        ))
    expect(wrapper).toMatchSnapshot();
});