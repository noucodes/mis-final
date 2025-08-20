const express = require("express");
const router = express.Router();
const personalInfoController = require("../controllers/personalInfo.controller");
const authMiddleware = require("../../../middlewares/auth");

router.post("/", personalInfoController.createPersonalInfo);
router.get("/", personalInfoController.getAllPersonalInfo);
router.get("/:id", personalInfoController.getPersonalInfoById);
router.put("/:id", personalInfoController.updatePersonalInfo);
router.delete("/:id", personalInfoController.deletePersonalInfo);

module.exports = router;
