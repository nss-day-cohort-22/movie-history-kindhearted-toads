// Data Handler - Chris Miller
// Responsible for creating and returning all ajax calls

const auth = require("../authentication/auth")
const firebase = require("firebase")

// MovieDB.searchMovie({ query: "Alien" }, (err, res) => {
//     console.log(res)
// });

const dataManager = Object.create(null, {
    "userUID": {"value": null, "writable": true, "enumerable": true},

    "setUID": {"value": function(uid){this.userUID = uid}, "writable": true, "enumerable": true},
    
    "firebaseGET": {
        "value": function () {
            return firebase.auth().currentUser.getIdToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `https://movie-history-59344.firebaseio.com/${this.userUID}/.json?auth=${idToken}`,
                        "method": "GET"
                    })
                })
        }, "writable": true, "enumerable": true
    },
    
    "firebasePOST": {
        "value": function (id) {
            return firebase.auth().currentUser.getIdToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `https://movie-history-59344.firebaseio.com/${this.userUID}/.json?auth=${idToken}`,
                        "method": "POST",
                        "data": JSON.stringify({"movieId": id, "rating":0})
                    })
                })
        }, "writable": true, "enumerable": true
    },

    "firebaseDELETE": {
        "value": function (objectID) {
            return firebase.auth().currentUser.getIdToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `https://movie-history-59344.firebaseio.com/${this.userUID}/${objectID}.json?auth=${idToken}`,
                        "method": "DELETE"
                    })
                })
        }, "writable": true, "enumerable": true
    },
    
    "firebasePUT": {
        "value": function(fbID, object) {
            return firebase.auth().currentUser.getIdToken(true)
                .then(idToken => {
                    return $.ajax({
                        "url": `https://movie-history-59344.firebaseio.com/${firebase.auth().currentUser.uid}/${fbID}/.json?auth=${idToken}`,
                        "method": "PUT",
                        "data": JSON.stringify(object)
                    })
                })
        }, "writable": true, "enumerable": true
    },

    "getMovieById": {
        "value": function(movieID) {
            return $.ajax({
                "url": `https://api.themoviedb.org/3/movie/${movieID}?api_key=feae42ac1de7d9384c48dcb8682cb73f&append_to_response=credits`,
                "method": "GET"
            })
        }, "writable": true, "enumerable": true
    },
    
    "searchMovies": {
        "value": function(searchString) {
            return $.ajax({
                "url": `https://api.themoviedb.org/3/search/movie?api_key=feae42ac1de7d9384c48dcb8682cb73f&language=en-US&query=${searchString}&page=1`,
                "method": "GET"
            })
        }, "writable": true, "enumerable": true
    },
    
    "getCast": {
        "value": function(movieID) {
            return $.ajax({
                "url": `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=feae42ac1de7d9384c48dcb8682cb73f
                `,
                "method": "GET"
            })
        }, "writable": true, "enumerable": true
    },
    
    "getPopular": {
        "value": function() {
            return $.ajax({
                "url": "https://api.themoviedb.org/3/movie/popular?api_key=feae42ac1de7d9384c48dcb8682cb73f&language=en-US&page=1",
                "method": "GET"
            })
        }, "writable": true, "enumerable": true
    },
})

module.exports = dataManager