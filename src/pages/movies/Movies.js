import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMoviesData } from "./MoviesReducer"
import '../../css/Movies.css';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';
import OutlinedInput from '@mui/material/OutlinedInput';

import GoogleMap from '../../components/general/GoogleMap';
import MovieDetailCard from '../../components/cards/MovieDetailCard';

import { getMoviesList } from "./MoviesAPI"
// getLocationDetails

function Movies() {
  const allMovies = useSelector((state) => state.movie.moviesList);
  const dispatch = useDispatch();

  // const [markerData, setMarkerData] = useState(null)
  const [search, setSearchData] = useState("")
  const [searchLocation, setSearchLocationData] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [loading, setLoading] = useState(false)
  const [moviesList, setMoviesList] = useState([])
  const [autocomplete, setAutocomplete] = useState(null)
  
  const limit = 20

  useEffect(() => {

    function getMoviesData() {
      getMoviesList().then(({ data }) => {
        dispatch(setMoviesData(data))
      }).catch(err => {
        console.error(err)
      })
    }
    getMoviesData()

    function loadGoogleAutocomplete() {
      if (!autocomplete) {
        const interval = setInterval(() => {
          let input = document.getElementById("location-search-field");
          if (input && window && window.google && window.google.maps) {
            clearInterval(interval)
            const autocompleteInstance = new window.google.maps.places.Autocomplete(input)
            setAutocomplete(autocompleteInstance)
          }
        }, 1000);
      }
    }
    loadGoogleAutocomplete()
  }, [])

  useEffect(() => {
    loadMoviesData()
  }, [allMovies])

  useEffect(() => {
    setLoading(false)
  }, [moviesList])

  useEffect(() => {
    function addAutoCompleteListener() {
      if (autocomplete) {
        autocomplete.addListener("place_changed", () => {
          let place = autocomplete.getPlace()

          // const lat = place.geometry.location.lat().toFixed(6);
          // const lng = place.geometry.location.lng().toFixed(6);

          setSearchLocationData(place.formatted)
        })
      }
    }
    addAutoCompleteListener()
  }, [autocomplete])

  useEffect(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    setSearchTimeout(setTimeout(() => {
      loadMoviesData(true)
    }, 700))
  }, [search])


  function loadMoviesData(reset = false) {
    if (!loading) {
      let list = [...allMovies];
      if (search.trim()) {
        list = list.filter((location) => {
          return matchText(Object.values(location), search.trim())
        })
      }
      if (list.length !== moviesList.length) {
        setLoading(true)
        let start = reset ? 0 : moviesList.length;
        let end = start + limit;

        list = list.slice(start, end);
        if (reset) {
          setMoviesList([...list])
        } else {
          setMoviesList([...moviesList, ...list])
        }
      }
    }
  }

  function matchText(strings, searchKey) {
    const isMatch = strings.some((string) => {
      if (Array.isArray(string)) return matchText(string, searchKey)
      return string && string.indexOf(searchKey) > -1
    })
    return isMatch
  }

  function handelScroll(ev) {
    if (ev.target.scrollHeight - 200 < Math.floor(ev.target.scrollTop + ev.target.offsetHeight)) {
      loadMoviesData()
    }
  }

  function searchMovies(ev) {
    setSearchData(ev.target.value)
  }

  // function loadLocations(movie) {
  //   console.log(movie.locations[0])
  //   getLocationDetails(movie.locations[0]).then(resp => {
  //     console.log(resp);
  //   })
  // }

  return (
    <div className="relative-position">
      <Box className="autocomplete-container" sx={{ minWidth: 320 }}>
        <Card variant="outlined">
          <CardContent sx={{ p: 2 }}>
            <FormControl size="small" sx={{ width: '100%' }} variant="outlined">
              <InputLabel htmlFor="location-search-field">Search Locations</InputLabel>
              <OutlinedInput
                id="location-search-field"
                value={searchLocation}
                onChange={(ev) => setSearchLocationData(ev.target.value)}
                label="Search Locations"
              />
            </FormControl>
          </CardContent>
        </Card>
      </Box>
      <Box className="list-container" sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <FormControl size="small" sx={{ width: '100%' }} variant="outlined">
              <InputLabel htmlFor="movie-search-field">Search Movies</InputLabel>
              <OutlinedInput
                id="movie-search-field"
                value={search}
                onChange={searchMovies}
                label="Search Movies"
              />
            </FormControl>
          </CardContent>
          <Divider />
          <CardContent onScroll={handelScroll} className="movies-container">
            {moviesList.map((movie, index) => {
              // onClick={loadLocations}
              return <MovieDetailCard movie={movie} key={index} index={index} />
            })}
          </CardContent>
        </Card>
      </Box>
      {/* markerData={markerData} */}
      <GoogleMap />
    </div>
  );
}

export default Movies;
