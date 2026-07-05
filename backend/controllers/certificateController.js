const Certificate = require("../models/Certificate");
const Enrollment = require("../models/Enrollment");

const issueCertificate = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const existing = await Certificate.findOne({ student: studentId, course: courseId });
    if (existing) {
      return res.status(400).json({ message: "Certificate already issued" });
    }

    await Enrollment.findOneAndUpdate(
      { student: studentId, course: courseId },
      { progress: 100 }
    );

    const certificateId = `LS-${Date.now().toString().slice(-8)}`;

    const certificate = await Certificate.create({
      student: studentId,
      course: courseId,
      certificateId,
    });

    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      student: req.params.studentId,
    }).populate("course");
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { issueCertificate, getMyCertificates };