export const api = "http://localhost:3001";

export const headers = {

    'Accept': 'application/json',
    'Authorization': localStorage.token ? localStorage.token : Math.random().toString(36).substr(-8)
    
}
  