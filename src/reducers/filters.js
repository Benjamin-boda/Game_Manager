import moment from "moment";

//Filter reducer

const filterReducerDefaultState = {
    text: "",
    status: "",
    sortBy: "",
    console: ""
};

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text: action.text
            };
        case "SET_STATUS_FILTER":
            return {
                ...state,
                status: action.status
            };  
        case "SET_BY_CONSOLE":
            return {
                ...state,
                console: action.console
            };
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy: action.sortBy
            };
        default:
            return state;
    };
};

export default filterReducer;