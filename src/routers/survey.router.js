const { authenticateId, deleteSurvey, updateSurvey, createSurvey } = require("../controllers/survey.controller");

const SurveyRouter = require("express").Router();

SurveyRouter.post("/create", createSurvey);
SurveyRouter.post("/", authenticateId);
SurveyRouter.delete("/", deleteSurvey);
SurveyRouter.put("/", updateSurvey);

module.exports = SurveyRouter;
