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

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $('.hidden-when-logged-in').addClass('hidden');
        $('.visible-when-logged-in').removeClass('hidden');
        //window.location = "#/home";
        localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        $('.hidden-when-logged-in').removeClass('hidden');
        $('.visible-when-logged-in').addClass('hidden');
        localStorage.removeItem('currentUser');
    }
});

let generalControllerInstance = generalControllers.get(blogService, userService, templates);
let userControllerInstance = userControllers.get(userService, templates);
let blogControllerInstance = blogControllers.get(blogService, templates);

router.on({
    "home": generalControllerInstance.home,
    "login": userControllerInstance.login,
    "logout": userControllerInstance.signOut,
    //"blog/:searchKey": blogControllerInstance.search,
    "blog/single/:key": blogControllerInstance.blogSingle,
    "blog": blogControllerInstance.blogHome,
    "about": generalControllerInstance.about,
    "contact": generalControllerInstance.contact,
    "/": (() =>{
        router.navigate("/home")
    })
}).resolve();

$('.search-input').on('keyup', function (e) {
    if (e.keyCode == 13) {
        var searchValue = $('.search-input').val();
        console.log(searchValue);
        window.location = `#/blog/?search=${searchValue}`;
    }
});