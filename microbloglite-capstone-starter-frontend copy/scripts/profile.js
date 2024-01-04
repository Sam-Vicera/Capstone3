
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

document.addEventListener("DOMContentLoaded", () => {
    saveButton.addEventListener("click",(newPost))
})

async function newPost(){
    const text = document.getElementById("textBox").value

    const post = {
        "text": text
    } 

    location.href = "/profile.html"
}
