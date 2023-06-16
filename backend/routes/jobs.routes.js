const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const verifyJwt = require('../middlewares/verify.jwt.middleware');

router.post('/create-job', [verifyJwt.veryfyToken], jobController.createJob);
router.get('/get-jobs', jobController.getJobs);

module.exports = router;
