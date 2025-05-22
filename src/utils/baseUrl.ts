export function BASE_URL(endpoint: string = '') {
    const url = "http://127.0.0.1:8000/api/v1";
    // const url = "https://api.voow.test/api/v1";
    
    return `${url}/${endpoint}`
}
