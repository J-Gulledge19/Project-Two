const express = require('express') 
const Job = require('../models/jobs.js')

// Router varaible to run routes
const router = express.Router()

// Actual Routes

router.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
  })
  
router.get('/jobs', (req, res) => {
    res.render('jobs/show.ejs')
    })

router.get('/jobs/seed', (req,res) => {
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


// Export to use in other Files
module.exports = router