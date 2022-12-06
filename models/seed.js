///////////////////////////////////////
// Import Dependencies
require('dotenv').config()
const mongoose = require("./connection");
const Job = require("./jobs")

// Seed Code

mongoose.connection.on("open", () => {
  
    const startJob = [{
      name: "SCL",
      number: "22041",
      dl: {
          name: "Area 1",
          done: false,
          dateTurnedIn: "9/21/2022",
          dateDue: "1/13/2023",
          active: true,
          weight:{
          galv: 1000,
          ss: 300,
          blackIron: 500,
          pl: 600,
          alum: 0
      }}
    },

    {
      name: "Great Hall",
      number: "21057",
      dl: {
          name: "Area 2",
          done: false,
          dateTurnedIn: "11/25/2022",
          dateDue: "4/6/2023",
          active: false,
          weight:{
          galv: 1100,
          ss: 800,
          blackIron: 400,
          pl: 700,
          alum: 0
      }},
    }
      ];
    
      Job.deleteMany({}, (err, data) => {

        Job.create(startJob, (err, data) => {
            res.json(data);
        });
      });
    });
