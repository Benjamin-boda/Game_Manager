import { mount } from "enzyme";
import UserHomepageItem from "../../components/UserHomepageItem";
import { Provider, useSelector, useDispatch } from "react-redux";
import React, {useContext} from "react";
import thunk from 'redux-thunk'
import configureMockStore from "redux-mock-store";
import { shallowToJson } from "enzyme-to-json";
import { MemoryRouter } from 'react-router-dom'
import games from "../fixtures/games";
import getVisibleGames from "../../selectors/games";

const filters = {
    text: "sonic",
    status: "",
    sortBy: "",
    console: ""
}

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore(getVisibleGames({games: games}, {filters: filters}
));

test("should render UserHomepageItem page correctly", () => {
    
    const wrapper = shallowToJson(mount(
        <Provider store={store}>
            <MemoryRouter  initialEntries={['/']} keyLength={0}>
            <UserHomepageItem 
                /> 
            </MemoryRouter>
                
        </Provider>
        ))
    expect(wrapper).toMatchSnapshot();
});