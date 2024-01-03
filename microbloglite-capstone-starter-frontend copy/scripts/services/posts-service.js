
class PostService extends ServicesBase
{
    apiBaseUrl = ""
  
    constructor() {
        super();
        this.apiBaseUrl = this.baseUrl + "/api/posts";
    }

    async getAll() {
        return fetch(this.apiBaseUrl).then(response => response.json())
    }

    async getById(postId) {
        let url = `${this.apiBaseUrl}/${postId}`;
        return fetch(url).then(response => response.json())
    }

    async getPostsByUser() {
        const token = sessionStorage.token;
        const url = this.apiBaseUrl + "?username=" + sessionStorage.username;

        const requestInfo = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        return fetch(this.baseUrl, requestInfo).then(response => response.json())
    }

}