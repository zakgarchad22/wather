
import Renderer from './render.js'
import WeatherManager from './weatherManager.js'
const renderer = new Renderer()
const weatherManager = new WeatherManager()



let currentLocation = null
let currentPosition= null


const maxItems = 4
let currentPage = 0
let totalWeathers = []
let paginatedItems = 0





function showPage() {
  
  const start = currentPage * maxItems
  const end = start + maxItems
  paginatedItems = totalWeathers.slice(start, end)
  renderer.renderWeathers(paginatedItems)
 

}


function nextPage() {

  if (currentPage < Math.ceil(totalWeathers.length / maxItems)-1)
  {
    currentPage++
    showPage()
  
  }
}

function prevPage() {
    if (currentPage !== 0) 
    {
        currentPage--
        showPage()
    }
}


$('.pagination-div').on('click', '#prev-button', prevPage)
$('.pagination-div').on('click', '#next-button', nextPage)



$('.fetch-weathers').on('click', async () => 
{
  const city = $('#city').val().toLowerCase()
  
  let weatherResponse = await weatherManager.getWeathers(city)

    
    let weathers = {

      city: weatherResponse.name,
      temp: weatherResponse.main.temp
 
      
    }
  totalWeathers.push(weathers)
  renderer.renderWeathers(totalWeathers)
  showPage()
  })





$('.pagination-div').on('click', '#refresh-button' , async () => 
{
  console.log(totalWeathers)
  if(!totalWeathers)
  {
    return
  }
  totalWeathers.forEach(async weather => {
    let weatherResponse = await weatherManager.getWeathers(weather.city)
    weather.temp = weatherResponse.main.temp
  })
 
  renderer.renderWeathers(totalWeathers)
  //items should go to next page
  showPage()
  //update back end
totalWeathers.map((item) => {
    weatherManager.updateWeathers(item.city , item.temp)

})
const allWeathers = await weatherManager.getAllWeathers()
totalWeathers = allWeathers
showPage()



  })



async function showPosition(newLat , newLng) {

  console.log(newLat)


  weatherManager.getWeathersLocation(newLat , newLng)
  .then(locationResponse => {

    if (currentLocation === locationResponse.address.village) {
      //for skipping next promises
      return null
    }
    currentLocation = locationResponse.address.village 


    return weatherManager.getWeathers(locationResponse.address.village)
  })
  .then(weatherResponse => {
    if (weatherResponse === null) {
     
      return
    }
    let weathers = {
      city: weatherResponse.name,
      temp: weatherResponse.main.temp
    }


  totalWeathers.push(weathers)
  renderer.renderWeathers(totalWeathers)


  })
  .catch(error => {
    console.error(error)
  })
    //items should go to next page

    
    showPage()


}

$('.pagination-div').on('click', '#location-button' , async () => 
{
  if (navigator.geolocation) 
  {
    navigator.geolocation.getCurrentPosition(position => 
      {
      let newLat = position.coords.latitude
      let newLng = position.coords.longitude

      currentPosition = {
          lat : newLat,

          lng : newLng
        }
        showPosition(currentPosition.lat , currentPosition.lng)
      

    })
 
}
})



  $(document).on("click", ".add-weather", function () {
    const city = $(this).data("city").toLowerCase();
    const temp = $(this).data("temp");
   
    weatherManager.addWeather(city, temp)

    
  
    
  
    $(this).prop("disabled", true)
    $(this).parent().find(".remove-weather").prop("disabled", false)

    
  })

  $(document).on("click", ".remove-weather", function () {
    const city = $(this).data("city").toLowerCase();
    const temp = $(this).data("temp");
   
    weatherManager.removeWeather(city, temp);
   
    
   
    $(this).prop("disabled", true)
    $(this).parent().find(".add-weather").prop("disabled", false)

  });












const allWeathers = await weatherManager.getAllWeathers()
totalWeathers = allWeathers
showPage()
