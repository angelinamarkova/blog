"use strict";var userControllers={get:function(n,o){return{login:function(){n.isSignedIn().then(function(o){if(o)return void(window.location="#/home");n.signIn().then(function(n){console.log(n),localStorage.setItem("currentUser",JSON.stringify(n.user))}).catch(function(n){localStorage.removeItem("currentUser");var o=n.message;console.log("Could not login: ",o)})})},signOut:function(){n.signOut().then(function(){app.currentUser=null,n.isSignedIn().then(function(n){console.log("User successfully logged out "+app.currentUser)})}).catch(function(n){console.log("Error "+n)})}}}};