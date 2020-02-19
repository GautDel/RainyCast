const sslRedirect = require("heroku-ssl-redirect");
const express = require("express");
const config = require("config");
const axios = require("axios");
const cors = require("cors");
const connectDB = require("./config/db.js");
const path = require("path");
const app = express();

// Middleware
app.use(cors());
app.use(sslRedirect());


// Body Parser
app.use(express.json({ extended: false }));

// Connect to Database
connectDB();

// Random Coordinates model
const RandomCoords = require("./models/RandCoord.js");




app.get("/weather", async (req, res) => {
  const { lat, long } = req.query;

  try {
    const fetchForecast = async () => {
      let response = await axios.get(`https://api.darksky.net/forecast/${config.get("DARK_SKY_KEY")}/${lat},${long}`)

      let data = response.data
      return data;
    }

    let forecast = await fetchForecast();

    res.send(forecast);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})





app.get("/random", async (req, res) => {
  try {
    const fetchRandomCoords = async () => RandomCoords.find({}, (req, res) => {
      let data = res;
      return data;
    });

    const coordArray = await fetchRandomCoords();
    const randInt = Math.floor(Math.random() * coordArray.length);

    res.send(coordArray[randInt]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
}

// PORT variable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})