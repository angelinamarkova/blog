let blogControllers = {
    get( blogService, templates) {

        function postComments(postKey) {
            templates.get('comments')
            .then( commentsTemplate => {
                let commentsCompiledTemplate = Handlebars.compile(commentsTemplate),
                    data = { },
                    commentsHtml, comment,
                    $commentAuthorName, commentContent;

                blogService.getPostComments(postKey)
                .on('value', function(comments) {
                    data.comments = comments.val();
                    commentsHtml = commentsCompiledTemplate(data);
                    $('.post-comments').html(commentsHtml);

                    $('.btn-add-comment').click((event) => {

                        $commentAuthorName = $('#name');
                        commentContent = $('#message').val();
                        console.log("Local storage user: ", JSON.parse(localStorage.getItem('currentUser')));
                        comment = {
                            authorKey: JSON.parse(localStorage.getItem('currentUser')).uid,
                            authorName: JSON.parse(localStorage.getItem('currentUser')).displayName,
                            authorEmail: JSON.parse(localStorage.getItem('currentUser')).email,
                            authorImg: JSON.parse(localStorage.getItem('currentUser')).photoURL,
                            content: commentContent
                        };

                        blogService.createComment(postKey, comment)
                        .then((comment) => {
                            console.log(`Comment: ${comment}`);
                        })
                        .catch((error) => console.log(error));
                    });
                });
            });
        }

        function search(searchValue) {
            searchValue = searchValue.split('=')[1];

            Promise.all([
                templates.get('blog'),
                templates.get('page-header'),
                templates.get('sidebar')
            ])
                .then(([blogTemplate, pageHeaderTemplate, sidebarTemplate]) => {
                    const dbRef = firebase.database().ref('posts');
                    var query = dbRef.orderByChild("title_lower").startAt(searchValue).endAt(searchValue + "\uf8ff");
                    query.once("value", function (snapshot) {
                        var data = {
                            posts: snapshot.val(),
                            page: BLOG_HOME_PAGE_DATA_SEARCH
                        };
                        data.page.searchValue = searchValue;

                        var blogCompiledTemplate = Handlebars.compile(blogTemplate),
                            pageHeaderCompiledTemplate = Handlebars.compile(pageHeaderTemplate),
                            sidebarCompiledTemplate = Handlebars.compile(sidebarTemplate);

                        var blogHtml = blogCompiledTemplate(data),
                            headerHtml = pageHeaderCompiledTemplate(data.page),
                            sidebarHtml = sidebarCompiledTemplate();

                        $('#container').html(blogHtml);
                        $('.page-header').html(headerHtml);
                        $('.sidebar').html(sidebarHtml);
                        dbRef.off();
                    });
                });
        }

        return {
            blogHome() {
                if(arguments[1].indexOf('search') > -1) {
                    search(arguments[1]);
                } else {
                    Promise.all([
                        blogService.getAllCategories(),
                        blogService.getAllPosts(),
                        templates.get('blog'),
                        templates.get('page-header'),
                        templates.get('sidebar')
                    ])
                    .then(([categories, posts, blogTemplate, pageHeaderTemplate, sidebarTemplate]) => {
                        let blogCompiledTemplate = Handlebars.compile(blogTemplate),
                            pageHeaderCompiledTemplate = Handlebars.compile(pageHeaderTemplate),
                            sidebarCompiledTemplate = Handlebars.compile(sidebarTemplate),
                            data = {}, page = BLOG_HOME_PAGE_DATA,
                            blogHtml, headerHtml, sidebarHtml;

                        setLocalStorageItem('pageHeaderTemplate', blogTemplate);
                        setLocalStorageItem('blogHomeTemplate', pageHeaderTemplate);
                        setLocalStorageItem('sidebarTemplate', sidebarTemplate);

                        data.categories = categories.val();
                        data.posts = posts.val();

                        blogHtml = blogCompiledTemplate(data);
                        headerHtml = pageHeaderCompiledTemplate(page);
                        sidebarHtml = sidebarCompiledTemplate();
                        $('#container').html(blogHtml);
                        $('.page-header').html(headerHtml);
                        $('.sidebar').html(sidebarHtml);
                    })
                    .catch((error) => console.log(error));
                }

            },

            blogSingle(key) {
                Promise.all([
                    blogService.getAllCategories(),
                    blogService.getAllPosts(),
                    blogService.getPostByKey(key.key),
                    templates.get('blog-single'),
                    templates.get('page-header'),
                    templates.get('sidebar')
                ])
                .then(([categories, posts, post, blogTemplate, pageHeaderTemplate, sidebarTemplate]) => {
                    let blogCompiledTemplate = Handlebars.compile(blogTemplate),
                        pageHeaderCompiledTemplate = Handlebars.compile(pageHeaderTemplate),
                        sidebarCompiledTemplate = Handlebars.compile(sidebarTemplate),
                        data = {},
                        page = {},
                        blogHtml, headerHtml, sidebarHtml;

                    data.categories = categories.val();
                    data.posts = posts.val();
                    data.post = post.val();
                    page.title = data.post.title;
                    page.subtitle = data.post.subtitle;
                    page.breadcrumbs = [
                        {
                            url: "#/home",
                            title: "Home"
                        },
                        {
                            url: "#/blog",
                            title: "Blog"
                        },
                        {
                            url: `#/blog/${key.key}`,
                            title: data.post.title
                        }
                    ];

                    blogHtml = blogCompiledTemplate(data);
                    headerHtml = pageHeaderCompiledTemplate(page);
                    sidebarHtml = sidebarCompiledTemplate();
                    $('#container').html(blogHtml);
                    $('.page-header').html(headerHtml);
                    $('.sidebar').html(sidebarHtml);

                    postComments(key.key);
                })
                .catch((error) => console.log(error));
            }
        }
    }
};
