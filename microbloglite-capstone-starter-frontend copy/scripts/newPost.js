
let postService;
let authService; 


document.addEventListener("DOMContentLoaded", () => {
    postService = new PostService()
    authService = new AuthService();

    let loginCheck = authService.isLoggedIn();
    if (loginCheck === false){
        window.location.assign("/index.html")
    }
    
    let logOutButton = document.getElementById('logoutBtn')
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

   /* Sidepanel Functionality */
   function openNav() {
    document.querySelector('#sidepanel').style.width = '250px';
}
function closeNav() {
    document.querySelector('#sidepanel').style.width = '0';
}
