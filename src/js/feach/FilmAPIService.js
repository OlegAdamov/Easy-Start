//   api_key: 'ba12bbb2efd4020faab2c5dd14dc19c0'
import axios from 'axios';
export default class FilmAPIService {

    constructor() { 
        this.page = 1
    }
    getPopularMovie() {
        return axios.get(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=ba12bbb2efd4020faab2c5dd14dc19c0&page=${this.page}`
        )
    }
}