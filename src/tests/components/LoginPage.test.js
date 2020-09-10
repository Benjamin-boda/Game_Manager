import LoginPage from "../../components/LoginPage";
import React from "react";
import { shallow, mount } from "enzyme";
import * as redux from 'react-redux'
import configureMockStore from "redux-mock-store";
import { shallowToJson } from "enzyme-to-json"
import thunk from 'redux-thunk'
import {Provider} from "react-redux";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});



test("Should render LoginPage component correctly", () => {
    
    const wrapper = mount(
        <Provider store={store}>
            <LoginPage />
        </Provider>
        );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

test("Should call startlogin on button click", () => {

    const spy = jest.spyOn(redux, 'useDispatch')
    spy.mockReturnValue(jest.fn())
    const wrapper = mount(<Provider store={store}>
            <LoginPage startLogin={spy}/>
        </Provider>
        );
    wrapper.find("button").simulate("click")
    expect(spy).toHaveBeenCalled();
});