import filterReducers from "../../reducers/filters";

test("should setup default filter values", () => {
    const state = filterReducers(undefined, {type: "@@INIT"});
    expect(state).toEqual({
        text: "",
        status: "",
        sortBy: "",
        console: ""
    });
});

test("should setup text filter", () => {
    const text = "darksoul";
    const action = {
        type: "SET_TEXT_FILTER",
        text
    };
    const state = filterReducers(undefined, action);
    expect(state.text).toBe("darksoul");
});

test("should setup status filter", () => {
    const status = "ongoing";
    const action = {
        type: "SET_STATUS_FILTER",
        status
    };
    const state = filterReducers(undefined, action);
    expect(state.status).toBe("ongoing");
});

test("should setup console filter", () => {
    const console = "atari";
    const action = {
        type: "SET_BY_CONSOLE",
        console
    };
    const state = filterReducers(undefined, action);
    expect(state.console).toBe("atari");
});

test("should setup sort by date filter", () => {
    const sortBy = "newDate";
    const action = {
        type: "SORT_BY_DATE",
        sortBy
    };
    const state = filterReducers(undefined, action);
    expect(state.sortBy).toBe("newDate");
});