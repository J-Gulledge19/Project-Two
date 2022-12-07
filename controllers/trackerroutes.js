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

router.post("/jobs", (req, res) => {
  console.log(req.body)
    req.body.dl.active = req.body.dl.active === "on" ? true : false;
    Job.create(req.body, (err, job) => {
      res.redirect("/alljobs");
    });
  });

router.get("/jobs/:id/edit", (req, res) => {
  const id = req.params.id
  Job.findById(id, (err, job) => {
      res.render("jobs/edit.ejs", {job})
  })
})

router.put("/jobs/:id", (req, res) => {
  const id = req.params.id
  req.body.dl.active = req.body.dl.active === "on" ? true : false
  Job.findByIdAndUpdate(id, req.body, {new: true}, (err, job) => {
      res.redirect(`/jobs/${id}`)
  })
})

router.delete("/jobs/:id", (req, res) => {
  const id = req.params.id
  Job.findByIdAndRemove(id, (err, job) => {
      res.redirect("/alljobs")
  })
})
    
router.get('/jobs/:id', (req, res)=>{
  
      Job.findById(req.params.id)
      .then((job)=> {
        console.log(job)
          res.render('jobs/show.ejs', {job})
      })
  })

// Export to use in other Files
module.exports = router