let profileService 

document.addEventListener("DOMContentLoaded", () => {
    profileService = new ProfileService()

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