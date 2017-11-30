const auth = require("./authentication/auth")
const $ = require("jquery")
require("materialize")

const addListenersSearch = require("./addListenersSearch")
const addListenersTrackedMovies = require("./trackedMovies/addListenersTrackedMovies")
const addListenersCard = require("./addListenersCards");

auth.init()

addListenersSearch()
addListenersTrackedMovies()
addListenersCard()