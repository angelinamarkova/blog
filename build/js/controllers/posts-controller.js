"use strict";var _slicedToArray=function(){function e(e,t){var o=[],r=!0,a=!1,l=void 0;try{for(var n,i=e[Symbol.iterator]();!(r=(n=i.next()).done)&&(o.push(n.value),!t||o.length!==t);r=!0);}catch(e){a=!0,l=e}finally{try{!r&&i.return&&i.return()}finally{if(a)throw l}}return o}return function(t,o){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),blogControllers={get:function(e,t){function o(o){t.get("comments").then(function(t){var r=Handlebars.compile(t),a={},l=void 0,n=void 0,i=void 0,s=void 0;e.getPostComments(o).on("value",function(t){a.comments=t.val(),l=r(a),$(".post-comments").html(l),$(".btn-add-comment").click(function(t){i=$("#name"),s=$("#message").val(),console.log("Local storage user: ",JSON.parse(localStorage.getItem("currentUser"))),n={authorKey:JSON.parse(localStorage.getItem("currentUser")).uid,authorName:JSON.parse(localStorage.getItem("currentUser")).displayName,authorEmail:JSON.parse(localStorage.getItem("currentUser")).email,authorImg:JSON.parse(localStorage.getItem("currentUser")).photoURL,content:s},e.createComment(o,n).then(function(e){console.log("Comment: "+e)}).catch(function(e){return console.log(e)})})})})}function r(e){e=e.split("=")[1],Promise.all([t.get("blog"),t.get("page-header"),t.get("sidebar")]).then(function(t){var o=_slicedToArray(t,3),r=o[0],a=o[1],l=o[2],n=firebase.database().ref("posts");n.orderByChild("title_lower").startAt(e).endAt(e+"").once("value",function(t){var o={posts:t.val(),page:BLOG_HOME_PAGE_DATA_SEARCH};o.page.searchValue=e;var i=Handlebars.compile(r),s=Handlebars.compile(a),c=Handlebars.compile(l),g=i(o),m=s(o.page),u=c();$("#container").html(g),$(".page-header").html(m),$(".sidebar").html(u),n.off()})})}return{blogHome:function(){arguments[1].indexOf("search")>-1?r(arguments[1]):Promise.all([e.getAllCategories(),e.getAllPosts(),t.get("blog"),t.get("page-header"),t.get("sidebar")]).then(function(e){var t=_slicedToArray(e,5),o=t[0],r=t[1],a=t[2],l=t[3],n=t[4],i=Handlebars.compile(a),s=Handlebars.compile(l),c=Handlebars.compile(n),g={},m=BLOG_HOME_PAGE_DATA,u=void 0,d=void 0,p=void 0;setLocalStorageItem("pageHeaderTemplate",a),setLocalStorageItem("blogHomeTemplate",l),setLocalStorageItem("sidebarTemplate",n),g.categories=o.val(),g.posts=r.val(),u=i(g),d=s(m),p=c(),$("#container").html(u),$(".page-header").html(d),$(".sidebar").html(p)}).catch(function(e){return console.log(e)})},blogSingle:function(r){Promise.all([e.getAllCategories(),e.getAllPosts(),e.getPostByKey(r.key),t.get("blog-single"),t.get("page-header"),t.get("sidebar")]).then(function(e){var t=_slicedToArray(e,6),a=t[0],l=t[1],n=t[2],i=t[3],s=t[4],c=t[5],g=Handlebars.compile(i),m=Handlebars.compile(s),u=Handlebars.compile(c),d={},p={},h=void 0,b=void 0,v=void 0;d.categories=a.val(),d.posts=l.val(),d.post=n.val(),p.title=d.post.title,p.subtitle=d.post.subtitle,p.breadcrumbs=[{url:"#/home",title:"Home"},{url:"#/blog",title:"Blog"},{url:"#/blog/"+r.key,title:d.post.title}],h=g(d),b=m(p),v=u(),$("#container").html(h),$(".page-header").html(b),$(".sidebar").html(v),o(r.key)}).catch(function(e){return console.log(e)})}}}};