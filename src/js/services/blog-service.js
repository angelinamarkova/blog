var  blogService = {

    getAllPosts() {
        return app.database.ref('/posts').once('value');
    },

    getAllCategories() {
        return app.database.ref('/categories').once('value');
    },

    getPostByKey(key) {
        return app.database.ref(`/posts/${key}`).once('value');
    },

    getPostComments(key) {
        return app.database.ref(`/comments/${key}`);
    },

    createPost(title, category, content, headerImg) {
        console.log("USer: ", JSON.parse(localStorage.getItem('currentUser')));
        var post = {
            title: title,
            author: JSON.parse(localStorage.getItem('currentUser')),
            category: category,
            content: content,
            headerImg: headerImg
        };

        console.log(post);
        return firebase.database().ref().child('posts').push(post);
    },

    createComment (postKey, comment) {
        return app.database.ref().child(`/comments/${postKey}`).push(comment);
    },

    createCategory(title, description, img) {
        var category = {
            title: title,
            description: description,
            headerImg: img
        };

        console.log(category);
        return firebase.database().ref().child('categories').push(category);
    }
};