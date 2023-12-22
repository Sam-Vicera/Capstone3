
class PostService extends ServicesBase
{

    apiBaseUrl = ""

    constructor()
    {
        this.apiBaseUrl = this.baseUrl + "/api/posts"
    }

}