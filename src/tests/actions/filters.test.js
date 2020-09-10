import {setTextFilter, setStatusFilter, setByConsole, sortByDate} from "../../actions/filters";

test("should generate set text filter action object with provided data", () => {
    const text = "sonic"
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        text
    });
});

test("should generate set text filter action object with default data", () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        text: ""
    });
});

test("should generate set status filter action object with provided data", () => {
    const status = "finished"
    const action = setStatusFilter(status);
    expect(action).toEqual({
        type: "SET_STATUS_FILTER",
        status
    });
});

test("should generate set status filter action object with default data", () => {
    const action = setStatusFilter();
    expect(action).toEqual({
        type: "SET_STATUS_FILTER",
        status: undefined
    });
});

test("should generate set platform filter action object with provided data", () => {
    const console = "playstation-4"
    const action = setByConsole(console);
    expect(action).toEqual({
        type: "SET_BY_CONSOLE",
        console
    });
});

test("should generate set platform filter action object with default data", () => {
    const action = setByConsole();
    expect(action).toEqual({
        type: "SET_BY_CONSOLE",
        console: undefined
    });
});

test("should generate sort by date provided filter action object", () => {
    const sortBy = "oldDate"
    const action = sortByDate(sortBy);
    expect(action).toEqual({
        type: "SORT_BY_DATE",
        sortBy
    });
});

test("should generate sort by date default filter action object", () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: "SORT_BY_DATE",
        sortBy: undefined
    });
});