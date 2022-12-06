// Import Our Dependencies

require("dotenv").config();
const express = require("express"); 
const morgan = require("morgan"); 
const methodOverride = require("method-override");
const Job = require("./models/jobs")
const TrackerRouter = require("./controllers/trackerroutes");

const app = express();

// Middleware
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use(TrackerRouter)



// Server Listener
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))