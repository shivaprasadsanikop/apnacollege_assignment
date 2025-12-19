const mySqlDao = require("../mysqldao/mySqlDao");


function obj () {

this.loginUser = async (reqBody) => {
  const email = reqBody.email;
  const password = reqBody.password;

  const query = "SELECT * FROM users WHERE email = ? AND password_hash = ?";
  const bindParams = [email, password];

  try {
    const result = await mySqlDao.doQueryParams(query, bindParams);
    return result[0];
  }
  catch (error) {
    console.error("Error in userLogin:", error);
    return null;
  }
};


this.getQuestions = async (reqBody) => {
  const topic = reqBody.topicId;
  const query = "SELECT * FROM questions WHERE topic_id = ?";
  const bindParams = [topic];
  try {
    const result = await mySqlDao.doQueryParams(query, bindParams);
    console.log("Result in DL:", result);
    return result;
  }
  catch (error) {
    console.error("Error in getQuestions:", error);
    return null;
  }
};



this.getSolvedQuestions = async (reqBody) => {
  const userId = reqBody.userId;
  const topicId = reqBody.topicId;
  const query = "SELECT q.question_id, q.topic_id FROM questions q JOIN solved_questions sq ON q.question_id = sq.question_id WHERE sq.user_id = ? AND sq.topic_id = ?";
  const bindParams = [userId, topicId];
  try {
    const result = await mySqlDao.doQueryParams(query, bindParams);
    return result;
  }
  catch (error) {
    console.error("Error in getSolvedQuestions:", error);
    return null;
  }
}



this.removeSolvedQuestion = async (reqBody) => {
  const userId = reqBody.userId;
  const questionId = reqBody.questionId;
  const query = "DELETE FROM solved_questions WHERE user_id = ? AND question_id = ?";
  const bindParams = [userId, questionId];
  try {
    const result = await mySqlDao.doQueryParams(query, bindParams);
    return result;
  }
  catch (error) {
    console.error("Error in removeSolvedQuestion:", error);
    return null;
  }
}


this.addSolvedQuestion = async (reqBody) => {
  const userId = reqBody.userId;
  const questionId = reqBody.questionId;
  const topicId = reqBody.topicId;
  const query = "INSERT INTO solved_questions (user_id, question_id, topic_id) VALUES (?, ?, ?)";
  const bindParams = [userId, questionId, topicId];
  try {
    const result = await mySqlDao.doQueryParams(query, bindParams);
    return result;
  }
  catch (error) {
    console.error("Error in addSolvedQuestion:", error);
    return null;
  }
}


this.fetchProgress = async (userId) => {
  const query = `
    SELECT 
      q.difficulty,
      COUNT(sq.question_id) AS solved_count,
      (SELECT COUNT(*) 
         FROM questions 
        WHERE difficulty = q.difficulty) AS total_count,
      ROUND(
          (COUNT(sq.question_id) * 100.0) / 
          (SELECT COUNT(*) 
             FROM questions 
            WHERE difficulty = q.difficulty), 
          2
      ) AS solved_percentage
    FROM questions q
    LEFT JOIN solved_questions sq 
           ON q.question_id = sq.question_id 
          AND sq.user_id = ?
    GROUP BY q.difficulty;
  `;

  const bindParams = [userId];

  // Example: execute the query using your DB client
  try {
    const result = await mySqlDao.doQueryParams(query, bindParams);
    return result;
  }
  catch (error) {
    console.error("Error in addSolvedQuestion:", error);
    return null;
  }
}

this.getStatus = async (userId) => {
  const query = `
    SELECT 
      sq.topic_id,
      COUNT(sq.question_id) AS questions_solved_count
    FROM 
      solved_questions sq
    WHERE 
      sq.user_id = ?
    GROUP BY 
      sq.topic_id
    ORDER BY 
      questions_solved_count DESC;
  `;

  const bindParams = [userId];

  try {
    const result = await mySqlDao.doQueryParams(query, bindParams);
    return result;
  } catch (error) {
    console.error("Error in getStatus:", error);
    return null;
  }
};

};

module.exports = new obj();

