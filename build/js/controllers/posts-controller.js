"use strict";var _slicedToArray=function(){function e(e,t){var o=[],i=!0,l=!1,a=void 0;try{for(var r,n=e[Symbol.iterator]();!(i=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);i=!0);}catch(e){l=!0,a=e}finally{try{!i&&n.return&&n.return()}finally{if(l)throw a}}return o}return function(t,o){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),blogControllers={get:function(e,t){function o(o){Promise.all([e.getPostComments(o),t.get("comments")]).then(function(e){var t=_slicedToArray(e,2),o=t[0],i=t[1],l=Handlebars.compile(i),a={comments:o.val()},r=l(a);$(".post-comments").html(r)})}return{home:function(){Promise.all([e.getAllCategories(),e.getAllPosts(),t.get("home")]).then(function(t){var o=_slicedToArray(t,3),i=o[0],l=o[1],a=o[2],r=Handlebars.compile(a),n={},s=void 0;n.categories=i.val(),n.posts=l.val(),s=r(n),$("#container").html(s),$(".create-post").click(function(t){e.createPost("Heading","v5wNNk8nU3cw3ZLrHyKlvnzBV0G2","clay",'"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',"https://s-media-cache-ak0.pinimg.com/736x/35/a4/b1/35a4b18ad0933bb3fe9087d1d0ca3774.jpg").then(function(e){console.log(e)})}),$(".create-category").click(function(t){e.createCategory("Category Title","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","http://4.bp.blogspot.com/-OsRbRApr7UE/UfY-GMESnpI/AAAAAAAAViI/bo3KXXYZ0so/s1600/Ellen-Jewett-owl.jpg").then(function(e){console.log(e)})})})},blogHome:function(){Promise.all([e.getAllCategories(),e.getAllPosts(),t.get("blog"),t.get("page-header"),t.get("sidebar")]).then(function(e){var t=_slicedToArray(e,5),o=t[0],i=t[1],l=t[2],a=t[3],r=t[4],n=Handlebars.compile(l),s=Handlebars.compile(a),c=Handlebars.compile(r),u={},m={},d=void 0,g=void 0,p=void 0;m.title="Blog Home",m.subtitle="Blog Subtitle",m.breadcrumbs=[{url:"/home",title:"Home"},{title:"Blog"}],u.categories=o.val(),u.posts=i.val(),d=n(u),g=s(m),p=c(),$("#container").html(d),$(".page-header").html(g),$(".sidebar").html(p)})},blogSingle:function(i){Promise.all([e.getAllCategories(),e.getAllPosts(),e.getPostByKey(i.key),t.get("blog-single"),t.get("page-header"),t.get("sidebar")]).then(function(e){var t=_slicedToArray(e,6),l=t[0],a=t[1],r=t[2],n=t[3],s=t[4],c=t[5],u=Handlebars.compile(n),m=Handlebars.compile(s),d=Handlebars.compile(c),g={},p={},b=void 0,h=void 0,v=void 0;console.log("Data: ",g),g.categories=l.val(),g.posts=a.val(),g.post=r.val(),p.title=g.post.title,p.subtitle=g.post.subtitle,p.breadcrumbs=[{url:"#/home",title:"Home"},{url:"#/blog",title:"Blog"},{url:"#/blog/"+i.key,title:g.post.title}],b=u(g),h=m(p),v=d(),$("#container").html(b),$(".page-header").html(h),$(".sidebar").html(v),o(i.key)})}}}};