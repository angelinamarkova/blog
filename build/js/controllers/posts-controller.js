"use strict";var _slicedToArray=function(){function e(e,t){var o=[],i=!0,r=!1,n=void 0;try{for(var a,l=e[Symbol.iterator]();!(i=(a=l.next()).done)&&(o.push(a.value),!t||o.length!==t);i=!0);}catch(e){r=!0,n=e}finally{try{!i&&l.return&&l.return()}finally{if(r)throw n}}return o}return function(t,o){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),blogControllers={get:function(e,t){return{blogHome:function(){Promise.all([e.getAllCategories(),e.getAllPosts(),t.get("home")]).then(function(t){var o=_slicedToArray(t,3),i=o[0],r=o[1],n=o[2],a=Handlebars.compile(n),l={},c=void 0;l.categories=i.val(),l.posts=r.val(),c=a(l),$("#container").html(c),console.log("Categories: ",i.val()),console.log("Posts: ",r.val()),$(".create-post").click(function(t){e.createPost("Heading","v5wNNk8nU3cw3ZLrHyKlvnzBV0G2","clay",'"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',"https://s-media-cache-ak0.pinimg.com/736x/35/a4/b1/35a4b18ad0933bb3fe9087d1d0ca3774.jpg").then(function(e){console.log(e)})}),$(".create-category").click(function(t){e.createCategory("Category Title","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","http://4.bp.blogspot.com/-OsRbRApr7UE/UfY-GMESnpI/AAAAAAAAViI/bo3KXXYZ0so/s1600/Ellen-Jewett-owl.jpg").then(function(e){console.log(e)})})})}}}};