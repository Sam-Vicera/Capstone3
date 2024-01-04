
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

    loadPosts()
})


async function addNewClick(){ 

    location.href = "./newPost.html"
}

async function loadPosts()
{
    const posts = await postService.getPostsByUser();

    console.log(posts);
}
