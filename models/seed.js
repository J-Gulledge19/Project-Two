///////////////////////////////////////
// Import Dependencies
require('dotenv').config()
const mongoose = require("./connection");
const Job = require("./jobs")

// Seed Code

mongoose.connection.on("open", () => {
  
    const startJob = [
        { name: "SCL", number: "22041", done: false, dateTurnedIn: "9/22/2022", dateDue: "1/23/2023", weight: {
            galv: 1000,
            ss: 40,
            blackIron: 50,
            pl: 100,
            alum: 0
        } },
      ];
    
      Job.deleteMany({}, (err, data) => {

        Job.create(startJob, (err, data) => {
            res.json(data);
        });
      });
    });
