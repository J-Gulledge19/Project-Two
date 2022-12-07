const express = require('express') 
const Job = require('../models/jobs.js')

// Router varaible to run routes
const router = express.Router()

// Actual Routes

router.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
  })
  
router.get('/jobs', (req, res) => {
    Job.find({}).then((jobs) => {
      res.render('jobs/showactive.ejs', {jobs})
    })
  })

  router.get('/alljobs', (req, res) => {
    Job.find({}).then((jobs) => {
      res.render('jobs/showall.ejs', {jobs})
    })
  })

  router.get('/new', (req, res) => {
    res.render('jobs/newjob.ejs')
})

router.post("/", (req, res) => {
    req.body.job.dl.active = req.body.job.dl.active === "on" ? true : false;
    Job.create(req.body, (err, job) => {
      res.redirect("/alljobs");
    });
  });

  router.get('/jobs/:id', (req, res)=>{

    // Go and get fruit from the database
    Job.findById(req.params.id)
    .then((job)=> {
      console.log(job)
        res.render('jobs/show.ejs', {job})
    })
})

router.get('/jobs/seed', (req,res) => {
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


// Export to use in other Files
module.exports = router