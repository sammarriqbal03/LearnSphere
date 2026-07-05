const express = require("express");
const router = express.Router();
const { issueCertificate, getMyCertificates } = require("../controllers/certificateController");

router.post("/", issueCertificate);
router.get("/:studentId", getMyCertificates);

module.exports = router;