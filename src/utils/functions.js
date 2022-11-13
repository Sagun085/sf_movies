import { Loader } from "@googlemaps/js-api-loader"

export function loadGoogleMapInstance() {
  if (window && (!window.google || !window.google.maps)) {
    const loader = new Loader({
      apiKey: null,
      version: "weekly",
      libraries: ["places"]
    })
    loader.load()

  }
}