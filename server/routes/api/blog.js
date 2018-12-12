const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/blog/" });

const dmodule = require("../../modules/blog/blogController");
const { authorization } = require("../../middleware/authentication.middleware");
const validateInput = require("../../modules/blog/validation/post");

router.get("/", dmodule.GetBlog);
router.post("/", upload.array("BlogImage", 1), validateInput, dmodule.SaveBlog);
router.get("/:id", dmodule.GetBlogDetail);
module.exports = router;
