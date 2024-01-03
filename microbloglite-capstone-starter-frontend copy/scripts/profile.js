let profileService 
let postService

document.addEventListener("DOMContentLoaded", () => {
    profileService = new ProfileService()
    postService = new PostService()

    loadProfile()
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