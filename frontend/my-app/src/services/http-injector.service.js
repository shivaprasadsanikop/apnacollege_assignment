// import getapiService from './http-Get.service';
import { DATA_API_CONSTANT } from './constant/api.constant';
import httpGetService from './http-Get.service';
import httpPutService from './http-put.service';
import httpDeleteService from './http-delete.service';
import httpPostService from './http.Post.service';



const loginUser = (data) => {
  return httpPostService.postTOAPI(
    DATA_API_CONSTANT.LOGIN_USER,
    data,
  );
}

const fetchQuestionsTopicWise = (data) => {
  return httpPostService.postTOAPI(
    DATA_API_CONSTANT.QUESTIONS_TOPIC_WISE,
    data,
  );
}


const fetchSolvedQuestions = (data) => {
  return httpPostService.postTOAPI(
    DATA_API_CONSTANT.FETCH_SOLVED_QUESTIONS,
    data,
  );
}

const removeSolvedQuestion = (data) => {
  return httpPostService.postTOAPI(
    DATA_API_CONSTANT.REMOVE_SOLVED_QUESTION,
    data,
  );
}

const addSolvedQuestion = (data) => {
  return httpPostService.postTOAPI(
    DATA_API_CONSTANT.ADD_SOLVED_QUESTION,
    data,
  );
}


const fetchProgress = (userId) => {
   const url = `${DATA_API_CONSTANT.FETCH_PROGRESS}${userId}`;
   return httpGetService.getDataFromAPI(url);
}

const fetchStatus = (userId) => {
    const url = `${DATA_API_CONSTANT.FETCH_STATUS}${userId}`;
    return httpGetService.getDataFromAPI(url);
 }

// Assign the object to a variable first
const authService = {
 loginUser,
  fetchQuestionsTopicWise,
  fetchSolvedQuestions,
  removeSolvedQuestion,
  addSolvedQuestion,
  fetchProgress,
  fetchStatus
};

export default authService;
