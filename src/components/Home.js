import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { end_url, api_key } from '../config/config';
import axios from 'axios';

// Showcasing the usage of React HOOKS System
const Home = () => {
  const [tv, setTv] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvLoading, setTvLoading] = useState(true);
  const [movieLoading, setMovieLoading] = useState(true);

  // Go and fetch popular TV shows
  const getPopularTv = async () => {
    const { data } = await axios.get(
      `${end_url}tv/popular?api_key=${api_key}&language=en-US&page=1`
    );
    setTv(data);
    setTvLoading(false);
  };

  // Go and fetch popular movies
  const getPopularMovies = async () => {
    const { data } = await axios.get(
      `${end_url}movie/popular?api_key=${api_key}&language=en-US&page=1`
    );
    setMovies(data);
    setMovieLoading(false);
  };

  // This will run once. As soon as the component gets rendered for the 1st time
  useEffect(() => {
    getPopularTv();
    getPopularMovies();
  }, []);

  let TvData, MoviesData, loading;
  const img_path = 'https://image.tmdb.org/t/p/w500/';

  // If we have TV shows, set the 'TvData' variable to a pre-defined block of JSX using it.
  if (tv && tv.total_results > 0) {
    TvData = (
      <div className="row animated fadeIn" data-testid="home-shows">
        {tv.results.slice(0, 10).map((show) => {
          return (
            <div className="col s6 m6 l6" key={show.id}>
              <Link to={'/tvs/' + show.id}>
                <img
                  className="responsive-img z-depth-3 poster tooltipped"
                  data-tooltip={show.name}
                  data-position="top"
                  src={img_path + show.poster_path}
                  alt={show.name}
                  id="home-images"
                />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }

  // If we have movies response, set the 'MoviesData' variable to a pre-defined block of JSX using it.
  if (movies && movies.total_results > 0) {
    MoviesData = (
      <div className="row animated fadeIn" data-testid="home-movies">
        {movies.results.slice(0, 10).map((movie) => {
          return (
            <div className="col s6 m6 l6 " key={movie.id}>
              <Link to={'movie/' + movie.id}>
                <img
                  className="responsive-img z-depth-3 poster tooltipped"
                  data-tooltip={movie.name}
                  data-position="top"
                  src={img_path + movie.poster_path}
                  alt={movie.name}
                  id="home-images"
                />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }

  // Set up the 'loading' screen
  loading = (
    <div className="progress">
      <div className="indeterminate"></div>
    </div>
  );

  return (
    <div>
      <div className="container">
        <div className="row ">
          <div className="col s12 m6 l6">
            <div className="section">
              <Link
                to="/tv"
                className="waves-effect waves-light  btn-small tooltipped"
                data-tooltip="Popular Tv"
                data-position="right"
              >
                {' '}
                <i className="material-icons left">tv</i> On Tv
              </Link>
            </div>
            {tvLoading ? loading : TvData}
          </div>
          <div className=" col s12 m6 l6 ">
            <div className="section">
              <Link
                to="/movies"
                className="waves-effect waves-light btn-small tooltipped"
                data-tooltip="Popular Movies"
                data-position="right"
              >
                {' '}
                <i className="material-icons left">theaters</i> In Theatre
              </Link>
            </div>
            {movieLoading ? loading : MoviesData}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
