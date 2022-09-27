import axios from 'axios';
const BASE_UR = 'https://api.themoviedb.org/3/';
// const API_KEY = 'ba12bbb2efd4020faab2c5dd14dc19c0';
export default class FilmAPIService {
  constructor() {
    this.page = 1;
    this.moviId = 0;
  }
  async getPopularMovie() {
    return await axios.get(
      `${BASE_UR}trending/movie/week?api_key=ba12bbb2efd4020faab2c5dd14dc19c0&page=${this.page}`
    );
  }
  async getDetail() {
    return await axios.get(
      `${BASE_UR}${this.movieId}?api_key=ba12bbb2efd4020faab2c5dd14dc19c0&language=en-US`
    );
  }
  async getGenres() {
    return await axios.get(
      `${BASE_UR}genre/movie/list?api_key=ba12bbb2efd4020faab2c5dd14dc19c0`
    );
  }
}
