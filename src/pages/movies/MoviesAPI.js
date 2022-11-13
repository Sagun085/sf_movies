import axiosInstance from "../../plugins/axios.js";

export function getMoviesList() {
  return new Promise((resolve, reject) => {
    axiosInstance.get("/resource/yitu-d5am.json").then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getLocationDetails(searchString) {
  return new Promise((resolve, reject) => {
    axiosInstance.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/output", {
      params: {
        input: searchString
      }
    }).then(resp => {
      resolve(resp)
    }).catch(err => {
      reject(err)
    })
  })
}