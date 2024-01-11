const mongoose = require('mongoose')
const Schema = mongoose.Schema



const weatherSchema = new Schema({
    city: { type: String, required: true },
    temp: Number,

})



const Weather = mongoose.model("Weather", weatherSchema)

// const weatherData = {
//   city: "madrid",
//   temp: 100
// }
//     const weather = new Weather(weatherData)
//     weather.save()


module.exports = Weather
