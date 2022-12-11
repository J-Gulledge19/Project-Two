const express = require("express");
const Job = require("../models/jobs.js");

// Router varaible to run routes
const router = express.Router();

// Actual Routes

router.get("/", (req, res) => {
  res.redirect("/jobs");
});

router.get("/jobs", async (req, res) => {
  await Job.find({})
    .populate()
    .then((jobs) => {
      res.render("jobs/showactive.ejs", { jobs });
    });
});

router.get("/alljobs", (req, res) => {
  Job.find({}).then((jobs) => {
    res.render("jobs/showall.ejs", { jobs });
  });
});

router.get("/new", (req, res) => {
  res.render("jobs/newjob.ejs");
});

router.post("/jobs", (req, res) => {
  req.body.dl.active = req.body.dl.active === "on" ? true : false;
  Job.create(req.body, (err, job) => {
    res.redirect("/alljobs");
  });
});

router.get("/job/:id/newdownload", async (req, res) => {
  const job = await Job.findById(req.params.id)
  console.log(job)
  res.render("jobs/newdownload.ejs", {job});
});

router.post("/job/:id/downloads", async (req, res) => {
  // const dlId = req.params.dlid;
  const newDl = {
    ...req.body.dl,
    active: req.body.dl.active === "on" ? true : false,
  };
  const jobId = req.params.id;
  const job = await Job.findById(jobId);
  job.dl.push(newDl)
  Job.findByIdAndUpdate(jobId, job, { new: true }, (err, job) => {
    res.redirect(`/jobs/${jobId}`);
  });
});

router.get("/job/dl/:jobid/:dlid/edit", async (req, res) => {
  const jobId = req.params.jobid;
  const dlId = req.params.dlid;
  const job = await Job.findById(jobId);
  const dl = job.dl.filter((dl) => dl.id === dlId)[0];
  res.render("jobs/edit.ejs", { jobId, dl });
});

router.post("/jobs/dl/:jobid/:dlid/update", async (req, res) => {
  const updatedDl = {
    ...req.body.dl,
    active: req.body.dl.active === "on" ? true : false,
  };
  const jobId = req.params.jobid;
  const dlId = req.params.dlid;
  const job = await Job.findById(jobId);
  const dlIndex = job.dl.findIndex((dl) => dl.id === dlId);
  job.dl[dlIndex] = updatedDl;
  Job.findByIdAndUpdate(jobId, job, { new: true }, (err, job) => {
    res.redirect(`/jobs/${jobId}`);
  });
});

router.delete("/jobs/:id", (req, res) => {
  const id = req.params.id;
  Job.findByIdAndRemove(id, (err, job) => {
    res.redirect("/alljobs");
  });
});

router.delete("/job/dl/:jobid/:dlid", async (req, res) => {
  const jobId = req.params.jobid;
  const dlId = req.params.dlid;
  const job = await Job.findById(jobId);
  const dlUpdate = job.dl.filter((dl) => dl.id !== dlId);
  Job.findByIdAndUpdate(jobId, { dl: dlUpdate }, (err, job) => {
    res.redirect(`/jobs/${jobId}`);
  });
});

router.get("/jobs/:id", (req, res) => {
  Job.findById(req.params.id).then((job) => {
    res.render("jobs/show.ejs", { job });
  });
});

// Export to use in other Files
module.exports = router;
