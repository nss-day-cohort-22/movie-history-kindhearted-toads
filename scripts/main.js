const auth = require("./authentication/auth")
const $ = require("jquery")
require("materialize")

const addListenersSearch = require("./addListenersSearch")
const addListenersTrackedMovies = require("./trackedMovies/addListenersTrackedMovies")
const addListenersCard = require("./addListenersCards");

auth.init()



$(".movie-rating__item") //highlight stars on hover
    .hover(function () {
        let starNum = $(this).attr("id").split("_")[1]
        for (let i = 1; i <= starNum; i++) {
            $("#star_" + i).addClass("movie-rating__item--hover")
        }
    }, function () { // trigger the mouseout event

        let starNum = $(this).attr("id").split("_")[1]
        for (let i = 1; i <= starNum; i++) {
            $("#star_" + i).removeClass("movie-rating__item--hover")
        }
    });

$(".movie-rating__item").on("click", e => {
    let starNum = $(e.target).attr("id").split("_")[1]
    for (let i = 1; i <= 5; i++) {
        $("#star_" + i).removeClass("rated")
        if (i <= starNum){
            $("#star_" + i).addClass("movie-rating__item--starred")
        }
        else {
            $("#star_" + i).removeClass("movie-rating__item--starred")
        }
    }
    $(e.target).addClass("rated")
})
addListenersSearch()
addListenersTrackedMovies()
addListenersCard()
