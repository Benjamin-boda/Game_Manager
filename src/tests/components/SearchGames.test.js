import { mount, shallow } from "enzyme";
import SearchGames from "../../components/SearchGames";
import games from "../fixtures/games";
import { Provider, useSelector, useDispatch } from "react-redux";
import React from "react";
import thunk from 'redux-thunk'
import { createMemoryHistory } from 'history'
import configureMockStore from "redux-mock-store";
import { shallowToJson } from "enzyme-to-json";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const history = createMemoryHistory()

test("should render SearchGames page correctly", () => {
    const wrapper = shallowToJson(mount(
        <Provider store={store}>
            
                <SearchGames
                /> 
            
        </Provider>
        ))
    expect(wrapper).toMatchSnapshot();
});