/**
 * Created by Angelina on 10/1/2016.
 */
let router = new Navigo(null, true);

// Initialize Firebase
let app = {};
app.config = {
    apiKey: "AIzaSyBX6m1sd9u00Ea6E9tEUnhnYMktDfYE96M",
    authDomain: "blog-cd4d7.firebaseapp.com",
    databaseURL: "https://blog-cd4d7.firebaseio.com",
    storageBucket: "blog-cd4d7.appspot.com",
    messagingSenderId: "617101181734"
};

firebase.initializeApp(app.config);

app.database = firebase.database();
app.provider = new firebase.auth.GoogleAuthProvider();

if(JSON.parse(localStorage.getItem('currentUser')) !== null) {
    app.currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
} else {
    app.currentUser = {};
}

let generalControllerInstance = generalControllers.get(blogService, userService, templates);
let userControllerInstance = userControllers.get(userService, templates);
let blogControllerInstance = blogControllers.get(blogService, templates);

router.on({
    "home": generalControllerInstance.home,
    "login": userControllerInstance.login,
    "signOut": userControllerInstance.signOut,
    "blog": blogControllerInstance.blogHome,
    "blog/:key": blogControllerInstance.blogSingle,
    "about": generalControllerInstance.about,
    "contact": generalControllerInstance.contact,
    "/": (() =>{
        router.navigate("/home")
    })
}).resolve();