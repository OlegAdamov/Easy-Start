export default function mapGenreById(data, genresObj) {
  return data.map(movie => {
    let year = movie.release_date.slice(0, 4);
    let genresName = movie.genre_ids
      .map(genreId => genresObj[genreId])
      .join(', ');
    return { ...movie, genresName, year };
  });
}
