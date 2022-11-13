import { useEffect } from 'react';
import { loadGoogleMapInstance } from '../../utils/functions';
import '../../css/GoogleMap.css';

function GoogleMap(props) {

  // const [map, setMap] = useState(null)


  useEffect(() => {
    const SFCoordinates = {
      lat: 37.73304431674922,
      lng: -122.55696331168127
    }
    function loadMap() {
      loadGoogleMapInstance()
      let interval = setInterval(() => {
        if (window && window.google) {
          clearInterval(interval)
          let center = new window.google.maps.LatLng(SFCoordinates.lat, SFCoordinates.lng)

          let googleMapDiv = document.getElementById("googleMapDiv")
          if (googleMapDiv) {
            // setMap(
            new window.google.maps.Map(
              googleMapDiv,
              {
                zoom: 11,
                center: center,
                disableDefaultUI: false,
              }
            )
            // )
          }
        }
      }, 500);
    }
    loadMap()
  }, [])

  // useEffect(() => {
  //   loadMarker()
  // }, [props.markerData])

  // function loadMarker() {
  //   if (window && window.google && props.markerData) {
  //     console.log("loadMarkerUpdated");
  //   }
  // }


  return (
    <div id='googleMapDiv'>
    </div>
  );
}

export default GoogleMap;
