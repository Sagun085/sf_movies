import { createSlice } from '@reduxjs/toolkit'

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    moviesLocations: [],
    moviesList: []
  },
  reducers: {
    setMoviesData: (state, action) => {
      state.moviesLocations = action.payload
      let distinctMovies = [...new Set(action.payload.map(movie => movie.title))].map(title => {
        let locations = action.payload.filter(movie => movie.title === title)

        let movie = {}

        if (locations[0]) {
          movie.title = locations[0].title
          movie.release_year = locations[0].release_year
          movie.locations = locations.map(m => m.locations).filter(l => !!l)
          movie.production_company = locations[0].production_company
          movie.director = locations[0].director
          movie.writer = locations[0].writer
          movie.actor_1 = locations[0].actor_1
          movie.actor_2 = locations[0].actor_2
          movie.actor_3 = locations[0].actor_3
        }

        return movie;
      })
      state.moviesList = distinctMovies;
    },
  },
})

export const { setMoviesData } = movieSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default movieSlice.reducer
