import '../../css/Movies.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function MoviesCard(props) {
  let fun_fact = ""
  if (props.movie.fun_facts) {
    fun_fact = <Typography sx={{ mt: 0.5 }} color="text.secondary">
     <b>Fun Fact:</b> {props.movie.fun_facts}
    </Typography>
  }
  
  let director = ""
  if (props.movie.director) {
    director = <Typography sx={{ mt: 0.5 }} color="text.secondary">
      <b>Director:</b> {props.movie.director}
    </Typography>
  }

  let writer = ""
  if (props.movie.writer) {
    writer = <Typography sx={{ mt: 0.5 }} color="text.secondary">
     <b>Writer:</b> {props.movie.writer}
    </Typography>
  }

  function handelClick(e) {
    e.preventDefault()
    // props.onClick(props.movie)
  }

  return (
    <Card onClick={handelClick} variant="outlined" sx={{ mt: props.index !== 0 ? 2 : 0 }} className='movie-detail-card'>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.movie.title} ({props.movie.release_year})
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          {props.movie.production_company}
        </Typography>
        <Typography sx={{ mt: 0.5 }} color="text.secondary">
          <b>Actor(s): </b> {props.movie.actor_1} {props.movie.actor_2 ? ` - ${props.movie.actor_2}` : ''} {props.movie.actor_3 ? ` - ${props.movie.actor_3}` : ''}
        </Typography>
        {director}
        {writer}
        {fun_fact}
        {/* {JSON.stringify(props.movie)} */}
      </CardContent>
    </Card>
  );
}

export default MoviesCard;
