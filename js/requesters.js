/**
 * Created by Angelina on 10/1/2016.
 */

let requester = {
    get(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                method: "GET",
                success(response) {

                    resolve(response);
                },
                error(response){
                }
            });
        });
    },
    getJSON(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                method: "GET",
                contentType: "application/json",
                success(response) {
                    resolve(response);
                },
                error(response) {
                    console.log("error", response);

                }
            });
        });
    },
    putJSON(url, body, options) {
        options = options || {};
        return new Promise((resolve, reject) => {
            let headers = options.headers || {};

            $.ajax({
                url,
                headers,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                }
            });
        });
    },
    postJSON(url, body, options) {
        options = options || {};
        return new Promise((resolve, reject) => {
            var headers = options.headers || {};

            $.ajax({
                url,
                headers,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                }
            });
        });
    }
};