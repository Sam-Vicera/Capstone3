
let postService;
let authService; 


document.addEventListener("DOMContentLoaded", () => {
    postService = new PostService()
    authService = new AuthService();
    let logOutButton = document.getElementById('profileLogOut')

    // loadProfile()
    logOutButton.addEventListener("click",() =>{
        authService.logout();
    })
})

