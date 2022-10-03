export default function mapGenreById(data, genresObj) {
  return data.map(movie => {
    let genresName = movie.genre_ids
      .map(genreId => genresObj[genreId])
      .join(', ');
    return { ...movie, genresName };
  });
}
