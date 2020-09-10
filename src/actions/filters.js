//SET_TEXT_FILTER

export const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text
});

//SET_STATUS_FILTER

export const setStatusFilter = (status) => ({
    type: "SET_STATUS_FILTER",
    status
});

//SET_BY_CONSOLE

export const setByConsole = (console) => ({
    type: "SET_BY_CONSOLE",
    console
});

//SORT_BY_DATE

export const sortByDate = (sortBy) => ({
    type: "SORT_BY_DATE",
    sortBy
});


