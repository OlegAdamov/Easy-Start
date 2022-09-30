export default function remakeId(data, genresObj) {
  return data.map(({ id, poster_path, release_date, title, genre_ids }) => {
    let genres = genre_ids.map(genreId => ({
      id: genreId,
      name: genresObj[genreId],
    }));

    let genresName = genres.map(genre => genre.name).join(', ');
    return { id, poster_path, release_date, title, genresName };
  });
}
//
