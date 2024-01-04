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

function loadProfile() {
    profileService.getAll()
                    .then(posts => {
                        displayPosts(posts)
                    })
}

function displayPosts() {
    document.getElementById("postsDisplay").innerHTML = ""

    posts.forEach(category => {
        displayPosts(posts)
    });
}

function displayPosts(posts) {
    
}