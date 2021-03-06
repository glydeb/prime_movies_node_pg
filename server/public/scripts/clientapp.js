$(document).ready(function () {
  getMovies();

  // add a movie
  $('#movieSubmit').on('click', postMovie);
});

function getMovies() {
  $.ajax({
    type: 'GET',
    url: '/movies',
    success: function (movies) {
      console.log(movies);
      $('#movieList').empty();
      $('#movieList').append('<table></table>')
      movies.forEach(function (movie) {
        $('#movieList').find('table').append('<tr><td>' + movie.title +
          '</td><td>' + movie.year +
          '</td><td>' + movie.genre +
          '</td><td>' + movie.director +
          '</td><td>' + movie.favorite +
          '</td><td>' + movie.main_actor +
        '</td></tr>');
      });
    },
  });


}

function postMovie() {
  event.preventDefault();

  var movie = {};

  $.each($('#movieForm').serializeArray(), function (i, field) {
    movie[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/movies',
    data: movie,
    success: function (data) {
      getMovies();
    },
  });
}
