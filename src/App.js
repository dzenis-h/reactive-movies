import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import Tv from './components/Tv';
import MovieDetails from './components/MovieDetails';
import TvDetails from './components/TvDetails';
import Header from './components/Header';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import './css/App.css';

const store = createStore(
  rootReducer
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div>
          <Route path="/" component={Home} exact></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/movie/:id" component={MovieDetails}></Route>
          <Route path="/tv" component={Tv}></Route>
          <Route path="/tvs/:id" component={TvDetails}></Route>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
