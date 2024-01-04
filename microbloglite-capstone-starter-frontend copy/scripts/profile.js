let postService;
let authService; 


document.addEventListener("DOMContentLoaded", () => {
    postService = new PostService();
    authService = new AuthService();
    let logOutButton = document.getElementById('logoutBtn');

    logOutButton.addEventListener("click",() => {
        authService.logout();
    })

    loadPosts();
})

/* Sidepanel Functionality */
function openNav() {
    document.querySelector('#sidepanel').style.width = '250px';
}
function closeNav() {
    document.querySelector('#sidepanel').style.width = '0';
}


async function addNewClick(){ 
    location.href = "./newPost.html"
}

async function loadPosts()
{
    await postService.getAll().then(data => {
        displayBlogPosts(data)
    })
}

function displayBlogPosts(posts) {
    // Checking that browser accepts templates
    if('content' in document.createElement('template')) {
        const blogPostsTableBody = document.querySelector("#blogPostsDisplay");

        // clearing table
        blogPostsTableBody.innerHTML = "";

        // populating table
        for (let i = 0; i < 51; i++) {
            addBlogPost(posts, i, blogPostsTableBody);
        }
    }
}

function addBlogPost(posts, postNumber, parent) {
    const template = document.getElementById("blogPostRowTemplate").content.cloneNode(true);
    const currentPost = posts[postNumber]


    template.querySelector("#postId").innerText = currentPost._id;
    template.querySelector("#username").innerText = currentPost.username;
    template.querySelector("#postContent").innerText = currentPost.text;
    const postDate = currentPost.createdAt.substring(0,10);
    const postHour = currentPost.createdAt.substring(11, 19);
    template.querySelector("#postTime").innerText = `${postHour}, ${postDate}`;

    parent.appendChild(template)
}
