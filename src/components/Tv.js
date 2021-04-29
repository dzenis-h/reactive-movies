import React, { useState, useEffect } from 'react';
import GetPopularData from '../api/GetPopularData';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { INPUT_STATE } from '../actions';
import truncate from '../util/truncate';

// Showcasing functional components which use the HOOKS system
const Tv = () => {
  const [tv, setTv] = useState([]);
  const [tvLoading, setTvLoading] = useState(true);

  // Instead of doing the 'old' way using connect HOC, I decided to do it the 'HOOKS' way in this component
  //  However, inside of the 'Movies' component, I did it using the 'connect' HOC and declaring 'mapStateToProps'
  const dispatch = useDispatch();
  const term = useSelector((state) => state.inputState.term);

  // Run this function once as soon as the component mounts to the screen
  useEffect(() => {
    getSearchResult();
    // eslint-disable-next-line
  }, []);

  // After the user types something and goes to details,
  // we want to preserve the state in the output -> this.props.term
  // We'll call this as soon as the component mounts -> componentDidMount
  const getSearchResult = () => {
    getTv('tv', 1, term);
  };

  // We want to check if the user is in 'search' mode or not
  // Depending on it, we'll show popular TV shows or the 'search' result
  const getTv = async (dataType = 'tv', IsSearch = 0, keyword) => {
    let searchTerm;
    if (IsSearch === 1) {
      searchTerm = 'search';
    } else {
      searchTerm = '';
    }
    // Look insede of the 'GetPopularData' API. Btw - 'offset' value is defaulted to 1
    const data = GetPopularData(dataType, searchTerm, keyword);
    // Original response is an array containing 20 'TV shows'
    const { results } = await data;
    // Limit the response to 10 'most popular' TV shows
    const response = results.splice(0, 10);
    // Setup the different parts of the state
    setTv(response);
    setTvLoading(false);
  };

  // If the input value length is longer than 3 show the search results, otherwise show popular TV shows
  const searchChangeHandler = (event) => {
    const keyword = event.target.value;
    // Do the search
    if (keyword.length >= 3) {
      // Call the 'getTv' function and pass appropriate values
      getTv('tv', 1, keyword);
      // preserve the input value
      dispatch({ type: INPUT_STATE, payload: keyword });
    } else {
      getTv('tv', '', keyword);
      // No matter the case, preserve the input value
      dispatch({ type: INPUT_STATE, payload: keyword });
    }
  };

  let TvData, loading, img;
  const img_path = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/';

  // Prepare the 'SHOWS' JSX + data
  if (tv && tv.length > 0) {
    TvData = (
      <div className="row animated fadeIn" data-testid="tv-screen">
        {tv.map((tv) => {
          // Check to see if we have an image
          if (tv.poster_path !== null) {
            img = (
              <Link to={'/tvs/' + tv.id}>
                <img
                  className="responsive-img"
                  src={img_path + tv.poster_path}
                  alt={tv.name}
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
            <div className="col s12 m6 l6 " key={tv.id}>
              <div className="card horizontal card-movies z-depth-1">
                <div className="card-image">
                  {img}
                  <span
                    className="card-title "
                    style={{ width: '100%' }}
                  ></span>
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <Link to={'/tvs/' + tv.id}>
                      <span className="card-title">{tv.name}</span>
                    </Link>
                    {/* Show only 66 chars - This could be a larger number.  
                      I chose this for simplicity's sake.  */}
                    <p>{truncate(tv.overview)}</p>
                  </div>
                  <div className="card-action">
                    <Link to={'/tvs/' + tv.id}>More info</Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    TvData = (
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
                        data-testid="tv-input"
                        id="icon_prefix2"
                        type="text"
                        className="validate"
                        onChange={searchChangeHandler.bind(this)}
                        // Set the value to whatever is currently saved inside of the Redux store
                        value={term}
                      />
                      {/* only show this if we don't have nothing in the search-bar */}
                      {term === '' && (
                        <label htmlFor="icon_prefix2">
                          Search TV shows ...
                        </label>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              <h5>Popular TV Shows</h5>
            </div>

            <div className="row">{tvLoading ? loading : TvData}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tv;
