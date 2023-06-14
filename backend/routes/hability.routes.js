const express = require('express');
const router = express.Router();
const habilityController = require('../controllers/hability.controller');
const habilityMiddleware = require('../middlewares/verifyHabilityAlreadyExist.middleware');

router.post('/create-hability', [habilityMiddleware.verifyHabilityAlreadyExist], habilityController.createHability);
router.get('/get-habilities', habilityController.getHabilities);

module.exports = router;
