const { authenticateId, deleteSurvey, updateSurvey, createSurvey, getSupervisorSurvey } = require("../controllers/survey.controller");

const SurveyRouter = require("express").Router();

SurveyRouter.post("/create", createSurvey);
SurveyRouter.get("/:supervisor_id", getSupervisorSurvey);
SurveyRouter.post("/", authenticateId);
SurveyRouter.delete("/", deleteSurvey);
SurveyRouter.put("/", updateSurvey);

module.exports = SurveyRouter;
