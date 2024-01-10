const express = require('express')
const router = express.Router()
const axios = require('axios')
const Weather = require('../models/Weather')
router.use(express.json())

const apiKey = '4dcac908517935755125c236cdb1c5f3'



router.get('/weathers', async function(req, res) {
    try {
        const weathersData = await Weather.find({})
        res.status(200).send(weathersData);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})


router.post('/weather' , async function(req,res) {

    const newWeather = new Weather({

        city : req.body.city,
        temp : req.body.temp,

    })
    console.log("*");
    const savedWeather = await newWeather.save()
    res.status(200).send(savedWeather)

    

})
router.put('/weatherUpdate/:city' , async function(req,res) {
    cityUpdate = req.params.city
    tempUpdate = req.body.temp

    const updatedWeather = await Weather.findOneAndUpdate(
        { city: cityUpdate },
        { temp: tempUpdate },
    )
    if (updatedWeather) {
        res.json(updatedWeather)
      } else {
        res.status(404).send('error update')
      }

})
router.delete('/weatherRemove/:city' , async function(req,res) {
    cityRemove = req.params.city
    tempRemove = req.body.temp

    const removeWeather = await Weather.findOneAndDelete(
        { city: cityRemove },
        { temp: tempRemove },
    )
    if (removeWeather) {
        res.json(removeWeather)
      } else {
        res.status(404).send('error update')
      }

})



router.get('/weather/:city' , async function(req,res) {

    let city = req.params.city
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    try {
        const response = await axios.get(url);
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})





module.exports = router
