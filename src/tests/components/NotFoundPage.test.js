import NotFoundPage from "../../components/NotFoundPage";
import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json"

test("Should render Notfoundpage correctly", () => {
    const wrapper = shallow(<NotFoundPage />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
})
