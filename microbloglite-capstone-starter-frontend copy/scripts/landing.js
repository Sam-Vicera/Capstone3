/* Landing Page JavaScript */



let authService;
 authService = new AuthService()

document.addEventListener("DOMContentLoaded", () => {
    
const container = document.getElementById('container');
const registerBtnSwitch = document.getElementById('register');
const loginBtnSwitch = document.getElementById('login');

const createUserButton = document.getElementById('createUserButton')
const signInButton = document.getElementById('signInButton')

registerBtnSwitch.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtnSwitch.addEventListener('click', () => {
    container.classList.remove("active");
});

createUserButton.addEventListener('click', () => {
    let userName = document.getElementById('registerUserName').value;
    let userFullName = document.getElementById('registerFullName').value;
    let userPassword = document.getElementById('registerPassword').value;

    let registeredUserInformation = {
        username: userName,
        fullName: userFullName,
        password: userPassword
    }
    

    authService.register(registeredUserInformation);

});

signInButton.addEventListener('click', () => {
    
});


    
    

    // if(authService.isLoggedIn()) {
    //     window.location.replace("/posts")
    // }

    // const loginForm = document.querySelector("#login");
    // loginForm.addEventListener("submit", login)

})

function login (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginForm.username.value,
        password: loginForm.password.value,
    }

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
};


