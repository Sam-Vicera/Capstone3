
let postService;
let authService; 


document.addEventListener("DOMContentLoaded", () => {
    postService = new PostService()
    authService = new AuthService();
    let logOutButton = document.getElementById('profileLogOut')
    let saveButton = document.getElementById('saveButton')

    saveButton.addEventListener("click",newPost)

    // loadProfile()
    logOutButton.addEventListener("click",() =>{
        authService.logout();
    })
})

async function newPost(event){
    event.preventDefault();
    const text = document.getElementById("textBox").value

    // send the text to the postService
    const newPost = await postService.addPost(text)

    location.href = "./profile.html"
}

