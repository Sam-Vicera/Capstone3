
class PostService extends ServicesBase
{

    apiBaseUrl = ""

    constructor()
    {
        super()
        this.apiBaseUrl = this.baseUrl + "/api/posts"
    }

    getPostsByUser()
    {
        const token = sessionStorage.token
        const url = this.apiBaseUrl + "?username=" + sessionStorage.username

        const requestInfo = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        return fetch(this.baseUrl, requestInfo).then(response => response.json())
    }

}