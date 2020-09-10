import { mount } from "enzyme";
import Header from "../../components/Header";
import {AuthProvider} from "../../firebase/Auth";
import { Provider, useSelector, useDispatch } from "react-redux";
import React, {useContext} from "react";
import thunk from 'redux-thunk'
import configureMockStore from "redux-mock-store";
import { shallowToJson } from "enzyme-to-json";
import { MemoryRouter } from 'react-router-dom'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

test("should render Header page correctly", () => {
    
    const wrapper = shallowToJson(mount(
        <Provider store={store}>
            <AuthProvider >
            <MemoryRouter  initialEntries={['/']} keyLength={0}>
            <Header 
                /> 
            </MemoryRouter>
            </AuthProvider>
                
        </Provider>
        ))
    expect(wrapper).toMatchSnapshot();
});