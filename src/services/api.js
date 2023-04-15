import axios from 'axios';

// Base da URL https://api.themoviedb.org/3/
// URL DA API /movie/popular?api_key=7432a56baa941cb9ffa85c1ce7a491e2&language=pt-BR&page=1

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;