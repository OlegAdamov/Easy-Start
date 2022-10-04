import axios from 'axios';
import { API_KEY, BASE_URL } from './const';
export default class FilmAPIService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.axiosInstance = axios.create({ baseURL: BASE_URL });
  }

  async getPopularMovie() {
    return this.axiosInstance.get(
      `trending/movie/week?api_key=${API_KEY}&page=${this.page}`
    );
  }
  async getDetail(movieId) {
    return this.axiosInstance.get(
      `movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
  }
  async getMovieByQuery() {
    return this.axiosInstance.get(
      `search/movie?api_key=${API_KEY}&language=en-US&query=${this.query}&page=${this.page}&include_adult=false`
    );
  }
  async getGenres() {
    const response = await this.axiosInstance.get(
      `genre/movie/list?api_key=${API_KEY}`
    );
    const genres = response.data.genres;
    return genres.reduce(
      (acc, genre) => ({ ...acc, ...{ [genre.id]: genre.name } }),
      {}
    );
  }
}
