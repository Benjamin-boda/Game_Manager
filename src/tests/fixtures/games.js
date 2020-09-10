import moment from "moment";

export default [{
    id: "1",
    image : "",
    title : "sonic",
    platform : "switch",
    boughtAt : moment(120).valueOf(),
    played : ""
}, {
    id: "2",
    image : "",
    title : "mario",
    platform : "wii",
    boughtAt : moment(0).subtract(4, "days").valueOf(),
    played : "finished"
}, {
    id: "3",
    image : "",
    title : "uncharted",
    platform : "playstation-4",
    boughtAt : moment(0).add(4, "days").valueOf(),
    played : "Ongoing"
}]