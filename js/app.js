/**
 * Created by Angelina on 10/1/2016.
 */
let router = new Navigo(null, true);

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBX6m1sd9u00Ea6E9tEUnhnYMktDfYE96M",
    authDomain: "blog-cd4d7.firebaseapp.com",
    databaseURL: "https://blog-cd4d7.firebaseio.com",
    storageBucket: "blog-cd4d7.appspot.com",
    messagingSenderId: "617101181734"
};
firebase.initializeApp(config);

var database = firebase.database();
var provider = new firebase.auth.GoogleAuthProvider();
console.log("Database: ", database);

let userControllerInstance = userControllers.get(userService, templates);
let blogControllerInstance = blogControllers.get(blogService, templates);

router.on({
    "login": userControllerInstance.login,
    "blog": blogControllerInstance.blogHome,
    "/": (() =>{
        router.navigate("/blog")
    })
}). resolve();