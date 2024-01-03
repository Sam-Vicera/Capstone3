class ProfileService {
    baseUrl = "http://localhost:5000"

    async getAll() {
        return fetch(this.baseUrl).then(response => response.json())
    }

    
}