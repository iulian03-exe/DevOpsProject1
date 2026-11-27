require('dotenv').config();


const express = require("express");
const axios = require("axios");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Weather API App is running");
});

app.get("/weather/:city", async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.API_KEY;

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        res.render("weather", {
    city: response.data.name,
    temperature: response.data.main.temp,
    humidity: response.data.main.humidity,
    weather: response.data.weather[0].description
});
    } catch (error) {
        console.log(error.response?.data);
        console.log(error.message);
        
        res.status(500).json({
            error: "Could not fetch weather data"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});