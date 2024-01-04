class ProfileService {
    baseUrl = "http://microbloglite.us-east-2.elasticbeanstalk.com/"

    async getAll() {
        return fetch(this.baseUrl).then(response => response.json())
    }

    
}