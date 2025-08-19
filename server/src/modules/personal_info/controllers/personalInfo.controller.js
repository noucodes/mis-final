const PersonalInfoService = require("../services/personalInfo.service");

exports.createPersonalInfo = async (req, res) => {
  try {
    const data = req.body;
    const personalInfo = await PersonalInfoService.createPersonalInfo(data);
    res.status(201).json(personalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPersonalInfo = async (req, res) => {
  try {
    const personalInfo = await PersonalInfoService.getAllPersonalInfo();
    res.json(personalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPersonalInfoById = async (req, res) => {
  try {
    const { id } = req.params;
    const personalInfo = await PersonalInfoService.getPersonalInfoById(id);
    if (!personalInfo) return res.status(404).json({ message: "Personal info not found" });
    res.json(personalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePersonalInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const personalInfo = await PersonalInfoService.updatePersonalInfo(id, data);
    if (!personalInfo) return res.status(404).json({ message: "Personal info not found" });
    res.json(personalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePersonalInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const personalInfo = await PersonalInfoService.deletePersonalInfo(id);
    if (!personalInfo) return res.status(404).json({ message: "Personal info not found" });
    res.json({ message: "Personal info deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};