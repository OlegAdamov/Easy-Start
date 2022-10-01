import axios from 'axios';
const BASE_UR = 'https://api.themoviedb.org/3/';
// const API_KEY = 'ba12bbb2efd4020faab2c5dd14dc19c0';
export default class FilmAPIService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.genres = [];
  }

  async getPopularMovie() {
    return await axios.get(
      `${BASE_UR}trending/movie/week?api_key=ba12bbb2efd4020faab2c5dd14dc19c0&page=${this.page}`
    );
  }
  async getDetail(movieId) {
    return await axios.get(
      `${BASE_UR}movie/${movieId}?api_key=ba12bbb2efd4020faab2c5dd14dc19c0&language=en-US`
    );
  }
  async getMovieByQuery() {
    return await axios.get(
      `${BASE_UR}search/movie?api_key=ba12bbb2efd4020faab2c5dd14dc19c0&language=en-US&query=${this.query}&page=${this.page}&include_adult=false`
    );
  }
  async getGenres() {
    const response = await axios.get(
      `${BASE_UR}genre/movie/list?api_key=ba12bbb2efd4020faab2c5dd14dc19c0`
    );
    const genres = await response.data.genres;
    this.genres = genres.reduce(
      (acc, genre) => ({ ...acc, ...{ [genre.id]: genre.name } }),
      {}
    );
  }
}
