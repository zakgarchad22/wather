

class Renderer 
{




  renderWeathers(weatherData ) {

    
 
    const source = $("#weathers-template").html()
    const template = Handlebars.compile(source)
    const newHTML = template({weatherData})
    $("#weathers-list").html(newHTML)
    
  }


  

}



export default Renderer