/* auth.js provides LOGIN-related functions */

class AuthService
{

    apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com"
    // Primary Server:
    //      http://microbloglite.us-east-2.elasticbeanstalk.com/
    // Backup servers:
    //      https://microbloglite.herokuapp.com/
    //      https://microbloglite.onrender.com/


    // You can use this function to get the login data of the logged-in
    // user (if any). It returns either an object including the username
    // and token, or an empty object if the visitor is not logged in.
    getLoginData()
    {
        const loginJSON = window.localStorage.getItem("login-data")
        return JSON.parse(loginJSON) || {}
    }


    // You can use this function to see whether the current visitor is
    // logged in. It returns either `true` or `false`.
    isLoggedIn()
    {
        const loginData = getLoginData()
        return Boolean(loginData.token)
    }


    // This function is already being used in the starter code for the
    // landing page, in order to process a user's login. READ this code,
    // and feel free to re-use parts of it for other `fetch()` requests
    // you may need to write.
    async login(loginData)
    {
        // POST /auth/login
        const options = {
            method: "POST",
            headers: {
                // This header specifies the type of content we're sending.
                // This is required for endpoints expecting us to send
                // JSON data.
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        }

        return fetch(this.apiBaseURL + "/auth/login", options)
            .then(response => response.json())
            .then(loginData =>
            {
                if(loginData.token){
                   sessionStorage.token = loginData.token
                sessionStorage.username = loginData.username

                window.localStorage.setItem("login-data", JSON.stringify(loginData))
                
                
                window.location.assign("http://127.0.0.1:5500/Capstone3/microbloglite-capstone-starter-frontend%20copy/profile.html")  // redirect

                return loginData 
                }
                else{
                    
                }
            })
    }
    
    async register(registerData)
    {
        // POST /api/users
        const options = {
            method: "POST",
            headers: {
                // This header specifies the type of content we're sending.
                // This is required for endpoints expecting us to send
                // JSON data.
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        }

        return fetch(this.apiBaseURL + "/api/users", options)
            .then(response => response.json())
    }


    // This is the `logout()` function you will use for any logout button
    // which you may include in various pages in your app. Again, READ this
    // function and you will probably want to re-use parts of it for other
    // `fetch()` requests you may need to write.
    async logout()
    {
        const loginData = getLoginData()

        // GET /auth/logout
        const options = {
            method: "GET",
            headers: {
                // This header is how we authenticate our user with the
                // server for any API requests which require the user
                // to be logged-in in order to have access.
                // In the API docs, these endpoints display a lock icon.
                Authorization: `Bearer ${loginData.token}`,
            },
        }

        fetch(apiBaseURL + "/auth/logout", options)
            .then(response => response.json())
            .then(data => console.log(data))
            .finally(() =>
            {
                // We're using `finally()` so that we will continue with the
                // browser side of logging out (below) even if there is an 
                // error with the fetch request above.
                sessionStorage.clear();
                window.localStorage.removeItem("login-data")  // remove login data from LocalStorage
                window.location.assign("/index.html")  // redirect back to landing page
            })
    }
}
