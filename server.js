// Import Our Dependencies

require("dotenv").config();
const express = require("express"); 
const morgan = require("morgan"); 
const methodOverride = require("method-override");
const mongoose = require("mongoose")

const app = express();

// Database Connection
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))

// Middleware
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

// Routes and Routers
app.get("/", (req, res) => {
    res.send("<h1>Server is Working</h1>")
})

// Server Listener
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))