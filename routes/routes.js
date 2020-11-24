const express  = require("express");
const router=express.Router();
const candidateControllers =require('../controllers/controllers');


router.post('/candidateRegister',candidateControllers.register);
router.post('/candidateTestScore',candidateControllers.testScore);
router.get('/highest&AvgScore',candidateControllers.highest_Avg_Score);

module.exports=router
