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

signInButton.addEventListener('click', (event) => {
    event.preventDefault();

    const createdUsername = document.getElementById("userSignIn").value
    const createdPassword = document.getElementById("userPassword").value

    const loginData = {
        username: createdUsername,
        password: createdPassword
    }

    signInButton.disabled = true
    
    authService.login(loginData).then(data =>{
        if (data === undefined){
            alert("The Username or Password is incorrect")
        signInButton.disabled = false
        }
        
    })
});


})




