var userService = {
    isSignedIn() {
        return Promise.resolve()
            .then(() => {
                return JSON.parse(localStorage.getItem('currentUser')) !== null;
            });

    },

    signIn() {
       return firebase.auth().signInWithPopup(app.provider);
    },

    signOut() {
        return firebase.auth().signOut();
    },

    sendMessage(message) {
        return app.database.ref().child(`/messages`).push(message);
    }
};