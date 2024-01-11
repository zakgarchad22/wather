class WeatherManager {
  constructor() {
    this.weathers = []
  }

  addWeather(city , temp) 
  {
    fetch('api/weather', 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city , temp})
    })
      .then(response => {
        if (!response.ok) 
        {
          console.error("error to add data")
        }
      return response.json()}) 
      .then(data => {
        console.log('added:', data)
       
      })
  
  }

  getAllWeathers() {
    let url = `/api/weathers`;
  
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.')
        }
        return response.json()
      })
      .then(data => {
        return data;
      })
      .catch(error => console.error('Error fetching weather data:', error))
  }
  

  getWeathers(city) {
    let url = `/api/weather/${city}`

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data
      })
      .catch(error => console.error('Error fetching weather data:', error))
}

updateWeathers(city,temp) {
  let url = `/api/weatherUpdate/${city}`

  fetch(url, 
  {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({temp})
  })
    .then(response => {
      if (!response.ok) 
      {
        console.error("error to update data")
      }
    return response.json()}) 
    .then(data => {
      console.log('update:', data)
     
    })    
}

removeWeather(city , temp) 
{
  let url = `/api/weatherRemove/${city}`
  fetch(url, 
  {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ city , temp})
  })
    .then(response => {
      if (!response.ok) 
      {
        console.error("error to remove data")
      }
    return response.json()}) 
    .then(data => {
      console.log('remove:', data)
     
    })

}

getWeathersLocation(newLat , newLng){


let url =   "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
newLat +
"&lon=" +
newLng

return fetch(url)
.then(response => response.json())
.then(data => {
  return data
})
.catch(error => console.error('Error fetching weather data:', error))


}




}
  export default WeatherManager
  