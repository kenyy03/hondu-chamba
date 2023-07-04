const Job = require('../models/jobs.model');

exports.createJob = async (req, res) => {
  try {
    const {
      jobName,
      jobType,
      description,
      city,
      address,
      payPerService,
      employer,
      requirements,
      skills,
    } = req.body;

    const job = new Job({
      jobName,
      jobType,
      description,
      city,
      address,
      payPerService,
      employer,
      requirements,
      skills,
    });
    const savedJob = (await job.save()).populate('employer').populate('skills');
    res.status(201).json({ message: 'Job created', data: savedJob });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong creating the job',
    });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer').populate('skills');
    res.status(200).json({ message: 'Jobs found', data: jobs });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Something goes wrong getting the jobs',
    });
  }
};
