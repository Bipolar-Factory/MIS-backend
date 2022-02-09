const { authenticateId, deleteSurvey, updateSurvey } = require("../controllers/survey.controller");

const SurveyRouter = require("express").Router();

SurveyRouter.post("/", authenticateId);
SurveyRouter.delete("/", deleteSurvey);
SurveyRouter.put("/", updateSurvey);

module.exports = SurveyRouter;
