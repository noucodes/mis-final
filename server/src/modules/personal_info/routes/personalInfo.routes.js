const express = require("express");
const router = express.Router();
const personalInfoController = require("../controllers/personalInfo.controller");

router.post("/personal-info", personalInfoController.createPersonalInfo);
router.get("/personal-info", personalInfoController.getAllPersonalInfo);
router.get("/personal-info/:id", personalInfoController.getPersonalInfoById);
router.put("/personal-info/:id", personalInfoController.updatePersonalInfo);
router.delete("/personal-info/:id", personalInfoController.deletePersonalInfo);

module.exports = router;