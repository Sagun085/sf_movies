import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../pages/movies/MoviesReducer'

export default configureStore({
  reducer: {
    movie: movieReducer,
  },
});
