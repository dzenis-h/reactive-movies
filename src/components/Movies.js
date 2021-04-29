import React, { useState, useEffect } from 'react';
import GetPopularData from '../api/GetPopularData';
import { Link } from 'react-router-dom';
import inputAction from '../actions';
import { connect } from 'react-redux';
import truncate from '../util/truncate';

// Showcasing functional components which use the HOOKS system
const Movies = (props) => {
  const [movies, setMovies] = useState([]);
  const [movieLoading, setMovieLoading] = useState(true);

  // After the user types something, we want to preserve the state in the output -> this.props.term
  // We'll call this as soon as the component mounts -> componentDidMount
  const getSearchResult = () => {
    getMovie('movie', 1, props.term);
  };

  // As soon as the componet mounts, we want to get a list of 'popular' movies
  // or a list of movies that came as a result of the search ->
  // It all depends if 'this.props.term' is equal to a search term or a empty string
  useEffect(() => {
    getSearchResult();
    // eslint-disable-next-line
  }, []);

  // We want to check if the user is in 'search' mode or not
  // Depending on it, we'll show popular movies or the 'search' result
  const getMovie = async (dataType = 'movie', IsSearch = 0, keyword) => {
    let searchTerm;
    if (IsSearch === 1) {
      searchTerm = 'search';
    } else {
      searchTerm = '';
    }
    //For more detail look insede of the 'GetPopularData' API. Btw - 'offset' value is defaulted to 1
    const data = GetPopularData(dataType, searchTerm, keyword);
    // Original response is an array containing 20 'movies'
    const { results } = await data;
    // Limit the response to 10 'most popular' movies
    const response = results.splice(0, 10);
    // Set up the state
    setMovies(response);
    setMovieLoading(false);
  };

  // If the input value length is longer than 3 show the search results, otherwise show popular movies
  const searchChangeHandler = (event) => {
    const keyword = event.target.value;
    // Do the search
    if (keyword.length >= 3) {
      getMovie('movie', 1, keyword);
      // preserve the input value
      props.inputAction(keyword);
    } else {
      // Show popular movies as soon as the input value is shorter than 3 chars
      getMovie('movie', '', props.term);
      // No matter the case, preserve the input value
      props.inputAction(keyword);
    }
  };

  let MovieData, loading, img;
  const { term } = props;
  const img_path = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/';

  // Preparation of the movies data and the appropriate JSX
  if (movies && movies.length > 0) {
    MovieData = (
      <div className="row animated fadeIn" data-testid="movies-screen">
        {movies.map((movie) => {
          if (movie.poster_path !== null) {
            img = (
              <Link to={'/movie/' + movie.id}>
                <img
                  className="responsive-img"
                  src={img_path + movie.poster_path}
                  alt={movie.title}
                  id="moves-landscape"
                />
              </Link>
            );
          } else {
            img = (
              <center>
                <div className="no_image">
                  <i className="material-icons left">burst_mode</i>{' '}
                </div>{' '}
                <div className="clearfix"></div>
              </center>
            );
          }

          return (
            <div className="col s12 m6 l6 " key={movie.id}>
              <div className="card horizontal card-movies  z-depth-1">
                <div className="card-image">
                  {img}
                  <span
                    className="card-title "
                    style={{ width: '100%' }}
                  ></span>
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <Link to={'/movie/' + movie.id}>
                      <span className="card-title">{movie.title}</span>
                    </Link>
                    {/* Show only 66 chars - This could be a larger number.  
                      I chose this for simplicity's sake.  */}
                    <p>{truncate(movie.overview)}</p>
                  </div>
                  <div className="card-action">
                    <Link to={'/movie/' + movie.id}>More info</Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    MovieData = (
      <div className="row animated fadeIn no-content">
        Nothing to show at this moment
      </div>
    );
  }

  // Prepare the loading screen
  loading = (
    <div className="progress">
      <div className="indeterminate"></div>
    </div>
  );

  return (
    <div>
      <div className="container">
        <div className="row ">
          <div className=" col s12 m12 l12 ">
            <div className="section">
              <div className="row">
                <form className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix">search</i>
                      <input
                        data-testid="movies-input"
                        id="icon_prefix2"
                        type="text"
                        className="validate"
                        onChange={searchChangeHandler}
                        // Set the value to whatever is currently saved inside of the Redux store
                        value={term}
                      />
                      {/* only show this if we don't have nothing in the search-bar */}
                      {props.term === '' && (
                        <label htmlFor="icon_prefix2">
                          Search for movies ...
                        </label>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              <h5>Popular Movies</h5>
            </div>
            <div className="row">{movieLoading ? loading : MovieData}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Since this is a class-based component I'm going with the older approach
// However, I could easily use "useSelector" and "useDispatch" to achieve the same result
const mapStateToProps = (state) => {
  return { term: state.inputState.term };
};

// Using the HOC in order to get access to necessary values via 'this.props'
export default connect(mapStateToProps, { inputAction })(Movies);
