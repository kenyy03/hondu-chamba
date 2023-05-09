const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const roleMiddleware = require('../middlewares/verifyRoleAlreadyExist.middleware');

router.get('/get-all-roles', roleController.getAllRoles);
router.post(
  '/create-role',
  [roleMiddleware.verifyRoleAlreadyExist],
  roleController.createRole
);

module.exports = router;
