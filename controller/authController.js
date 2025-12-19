var express = require("express");
var router = express.Router();
const authBl = require("../bl/authBl");



router.post("/login", async function (req, res) {
  let response = await authBl.loginUser(req);
 if(response){ 
  if(response.status!="error"){ 
    res.status(200).send(response);
  }
  else{
    res.status(400).send(response);
  }
}
else{
  res.status(500).send({status:"error", message:"Internal Server Error"});
}
});


router.post("/questionsTopicWise", async function (req, res) {
  let response = await authBl.getQuestions(req);
  if(response) {
    if(response.status!="error"){
    res.status(200).send(response);
  }
  else{
    res.status(400).send(response);
  }
  } else {
    res.status(500).send({status:"error", message:"Internal Server Error"});
  }
});


router.post("/fetchSolvedQuestions", async function (req, res) {
  let response = await authBl.getSolvedQuestions(req);
  if(response) {
    if(response.status!="error"){
    res.status(200).send(response);
  }
  else{
    res.status(400).send(response);
  }
  } else {
    res.status(500).send({status:"error", message:"Internal Server Error"});
  }
});


router.post("/removeSolvedQuestion", async function (req, res) {
  let response = await authBl.removeSolvedQuestion(req);
  if(response) {
    if(response.status!="error"){
    res.status(200).send(response);
  }
  else{
    res.status(400).send(response);
  }
  } else {
    res.status(500).send({status:"error", message:"Internal Server Error"});
  }
});


router.post("/addSolvedQuestion", async function (req, res) {
  let response = await authBl.addSolvedQuestion(req);
  if(response) {
    if(response.status!="error"){
    res.status(200).send(response);
  }
  else{
    res.status(400).send(response);
  }
  } else {
    res.status(500).send({status:"error", message:"Internal Server Error"});
  } 
});

router.get("/fetchProgress/:userId", async function (req, res) {
  let response = {};
  console.log("progress", req.params.userId);
  response = await authBl.fetchProgress(req.params.userId);
  if(response) {
    if(response.status!="error"){
    res.status(200).send(response);
  }
  else{
    res.status(400).send(response);
  }
  } else {
    res.status(500).send({status:"error", message:"Internal Server Error"});
  }
});


router.get("/getStatus/:userId", async function (req, res) {
  let response = {};
  response = await authBl.getStatus(req.params.userId);
  if(response) {
    if(response.status!="error"){
    res.status(200).send(response);
  }
  else{
    res.status(400).send(response);
  }
  } else {
    res.status(500).send({status:"error", message:"Internal Server Error"});
  }
})

module.exports = router;