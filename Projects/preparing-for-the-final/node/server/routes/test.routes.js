const router = require("express").Router();
const { test } = require("../controllers/test.controller");

router.get("/", test);

module.exports = router;
