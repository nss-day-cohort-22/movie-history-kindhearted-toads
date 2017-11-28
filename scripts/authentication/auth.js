const firebase = require("firebase")
const observer = require("./observer")

var config = {
    apiKey: "AIzaSyAxryWMWNf6vB-mFlSW25NVm6B0V5-3BWE",
    authDomain: "movie-history-59344.firebaseapp.com",
    databaseURL: "https://movie-history-59344.firebaseio.com",
    projectId: "movie-history-59344",
    storageBucket: "movie-history-59344.appspot.com",
    messagingSenderId: "530608339686"
};


const auth = Object.create(null,{
    "activeUser": {
        value: null,
        writable: true
    },
    "init": {
        value: function () {
            firebase.initializeApp(config)

            // add listener to the login button
            document.getElementById("comingSoon").addEventListener("click", e => {
                // Validate login information
                this.validate(
                    document.querySelector("[name='emailComingSoon']").value,
                    document.querySelector("[name='passwordComingSoon']").value
                )
                
                // Clear the form
                document.querySelector("[name='emailComingSoon']").value = ""
                document.querySelector("[name='passwordComingSoon']").value = ""
            })

            // add listener to the logout button
            document.getElementById("adminLogoutBtn").addEventListener("click", e => {
                
                this.logout()
            
                // display the login form
              
                // hide the logout button
              
            })

            // Set up authentication observer
            observer.init(this)
        }
    },
    "validate": {
        value: function (email, password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(function (error) {
                    const errorCode = error.code
                    const errorMessage = error.message

                    console.log("Email or password is invalid", errorCode, errorMessage)
                })
        }
    },
    "logout": {
        value: function () {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                console.log("user has signed out")
            }).catch(function(error) {
                // An error happened.
                console.log("error signing out")
            });
        }
    }
})



module.exports = auth