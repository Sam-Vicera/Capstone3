
class PostService extends ServicesBase
{
    apiBaseUrl = ""
  
    constructor() {
        super();
        this.apiBaseUrl = this.baseUrl + "/api/posts";
    }

    async getAll() {
        const requestInfo = {
            headers: {
                "Authorization": `Bearer ${sessionStorage.token}`
            }
        }
        return fetch(this.apiBaseUrl, requestInfo).then(response => response.json())
    }

    async getById(postId) {
        let url = `${this.apiBaseUrl}/${postId}`;

        const requestInfo = {
            headers: {
                "Authorization": `Bearer ${sessionStorage.token}`
            }
        }

        return fetch(url, requestInfo).then(response => response.json())
    }

    async getPostsByUser() {
        const token = sessionStorage.token;
        const url = this.apiBaseUrl + "?username=" + sessionStorage.username;

        const requestInfo = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        return fetch(url, requestInfo).then(response => response.json())
    }

    async addPost(postMessage) {
        const post = {
            text: postMessage,
            username: sessionStorage.username
        }
        const token = sessionStorage.token;
        const requestInfo = {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json;charset=UTF-8"}

        }
        return fetch(this.apiBaseUrl, requestInfo).then(response => response.json())
    }

}