import { mount } from "enzyme";
import Footer from "../../components/Footer";
import { Provider } from "react-redux";
import React from "react";
import thunk from 'redux-thunk'
import { Router } from 'react-router-dom'
import configureMockStore from "redux-mock-store";
import { shallowToJson } from "enzyme-to-json";

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

test("should render Footer page correctly", () => {
    const wrapper = shallowToJson(mount(
        <Provider store={store}>
                <Footer
                
                />
        </Provider>
        ))
    expect(wrapper).toMatchSnapshot();
});