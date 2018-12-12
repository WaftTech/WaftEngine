const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/registration/" });

const registrationModule = require("./../../modules/registration/registrationController");

const { authorization } = require("../../middleware/authentication.middleware");

const registrationValidation = require("./../../modules/registration/registrationValidation");

router.get("/", authorization, registrationModule.getData);
router.get("/:id", authorization, registrationModule.getDataByID);
router.post(
  "/",
  authorization,
  upload.array("file", 1),
  registrationValidation.validate,
  registrationValidation.duplicateValidation,
  registrationModule.saveData
);
router.delete("/:id", authorization, registrationModule.deleteById);

module.exports = router;
