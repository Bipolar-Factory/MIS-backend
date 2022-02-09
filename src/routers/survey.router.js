const { authenticateId, deleteSurvey } = require("../controllers/survey.controller");

const SurveyRouter = require("express").Router();

SurveyRouter.post("/", authenticateId);
SurveyRouter.delete("/", deleteSurvey);

module.exports = SurveyRouter;
