const express = require("express");
const router = express.Router();

const dModule = require("../../modules/fiscal/fiscalController");
const { authorization } = require("../../middleware/authentication.middleware");
ValidateInput = require("../../modules/fiscal/validation/input");

router.get("/", dModule.GetFiscal);
router.post("/", ValidateInput, dModule.SaveFiscal);
router.get("/:id", dModule.GetFiscalById);

module.exports = router;
