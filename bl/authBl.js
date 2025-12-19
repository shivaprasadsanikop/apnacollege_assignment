const authDl = require('../dl/authDl');


function obj () {
  this.loginUser = async function (req, res) {
    let response =  {}
    const result = await authDl.loginUser(req.body);
     console.log("Response from DL:", response);
     console.log("Request Body:", req.body);
    if (response) {
        if(req.body.email === result.email && req.body.password === result.password_hash){
             response["status"]="success";
             response["message"]="Login Successful";
             response["data"]=result;
             return response;
        }
        else{
          response["status"]="error";
          response["message"]="Invalid Credentials";
          return response;
        }
    } else {
        response["status"]="error";
        response["message"]="Internal Server Error";
        return response;
    } 
  };


this.getQuestions = async function (req) {
  let response = {};
  
  const questions = await authDl.getQuestions(req.body);
  console.log("Questions fetched from DL:", questions);

  if (questions) {
    response.status = "success";
    response.message = "Questions fetched successfully";
    response.data = questions;   // 👈 store DL result here
    return response;
  } else {
    response.status = "error";
    response.message = "Internal Server Error";
    return response;
  }
};


  this.getSolvedQuestions = async function (req) {
    let response =  {}
    const result = await authDl.getSolvedQuestions(req.body);
    if(result) {
      response["status"]="success";
      response["message"]="Solved Questions fetched successfully";
      response["data"]=result;
      return response;
    }
    else {
      response["status"]="error";
      response["message"]="Internal Server Error";
    }
 }


 this.removeSolvedQuestion = async function (req) {
    let response =  {}
    response = await authDl.removeSolvedQuestion(req.body);
    if(response) {
      response["status"]="success";
      response["message"]="Solved Question removed successfully";
      return response;
    }
    else {
      response["status"]="error";
      response["message"]="Internal Server Error";
    }
  }

  this.addSolvedQuestion = async function (req) {
    let response =  {}
    const result = await authDl.addSolvedQuestion(req.body);
    if(result) {
      response["status"]="success";
      response["message"]="Solved Question added successfully";
      return response;
    }
    else {
      response["status"]="error";
      response["message"]="Internal Server Error";
    }
  }
  
  this.fetchProgress = async function (userId) {
    // console.log("Fetching progress for userId:", req.body);
    let response =  {}
    const result = await authDl.fetchProgress(userId);
    if(result) {
      response["status"]="success";
      response["message"]="Progress fetched successfully";
      response["data"]=result;
      return response;
    }
    else {
      response["status"]="error";
      response["message"]="Internal Server Error";
    }
  }

  this.getStatus = async function (userId) {
   let response = {}
   const result = await authDl.getStatus(userId);
    if(result) {
      response["status"]="success";
      response["message"]="Status fetched successfully";
      response["data"]=result;
      return response;
    }
    else {
      response["status"]="error";
      response["message"]="Internal Server Error";
    }
    
  }

}
 module.exports = new obj();