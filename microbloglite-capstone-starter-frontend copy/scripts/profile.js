
let profileService;
let authService; 


document.addEventListener("DOMContentLoaded", () => {
    profileService = new ProfileService()
    authService = new AuthService();
    let logOutButton = document.getElementById('profileLogOut')

    // loadProfile()
    logOutButton.addEventListener("click",() =>{
        authService.logout();
    })
})

// let profileService 
// let postService

// document.addEventListener("DOMContentLoaded", () => {
//     profileService = new ProfileService()
//     postService = new PostService()

//     loadProfile()
// })


// function loadProfile() {
//     profileService.getAll()
//                     .then(posts => {
//                         displayPosts(posts)
//                     })
// }

// function postsTemplate() {
//     document.getElementById("postsDisplay").innerHTML = ""

//     posts.forEach(category => {
//         displayPosts(posts)
//     });
// }

// function displayPosts(posts) {
    
// }