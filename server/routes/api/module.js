const express = require("express");
const router = express.Router();

const dModule = require("../../modules/Module/ModuleController");
const authenticationMiddleware = require("../../middleware/authentication.middleware");

router.get("/fields", dModule.getFieldConfig);
router.get("/settings", dModule.getModules);
router.get("/setting/:name", dModule.getModuleConfig);
router.post(
  "/setting/:name",
  dModule.validateModuleConfig,
  dModule.saveModuleConfig
);
// router
//   .get('/:name',  dModule.getModuleData)
//   .post('/:name', dModule.saveModuleData);

module.exports = router;
