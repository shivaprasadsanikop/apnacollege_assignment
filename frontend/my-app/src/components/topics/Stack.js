import React, { useEffect, useState } from 'react';
import {
  Table,
  Input,
  Badge
} from 'reactstrap';
import httpInjectorService from '../../services/http-injector.service';

const Stack = () => {
  const [questions, setQuestions] = useState([]);
  const [solvedQuestions, setSolvedQuestions] = useState(new Set());
  const userId = Number(localStorage.getItem('userId'));

  useEffect(() => {
    fetchQuestions();
    fetchSolvedQuestions();
  }, []);

  // Fetch all questions
  const fetchQuestions = async () => {
    try {
      const response = await httpInjectorService.fetchQuestionsTopicWise({ topicId: 3 });
      if (response.status === 'success') {
        setQuestions(response.data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Fetch solved questions
  const fetchSolvedQuestions = async () => {
    try {
      const response = await httpInjectorService.fetchSolvedQuestions({ userId, topicId: 3 });
      if (response.status === 'success') {
        const solvedSet = new Set(
          response.data.map(q => q.question_id)
        );
        setSolvedQuestions(solvedSet);
      }
    } catch (error) {
      console.error('Error fetching solved questions:', error);
    }
  };

  // Toggle solved / unsolved
  const handleSolvedToggle = async (questionId) => {
    const isSolved = solvedQuestions.has(questionId);

    try {
      if (!isSolved) {
        await httpInjectorService.addSolvedQuestion({ userId, questionId, topicId: 3 });
        setSolvedQuestions(prev => new Set([...prev, questionId]));
      } else {
        await httpInjectorService.removeSolvedQuestion({ userId, questionId });
        setSolvedQuestions(prev => {
          const updated = new Set(prev);
          updated.delete(questionId);
          return updated;
        });
      }
    } catch (error) {
      console.error('Error updating solved status:', error);
    }
  };

  return (
    <div className="p-4">
       <div className="d-flex align-items-center mb-2">
          <h4 className="mb-0 me-2">Array Questions</h4>
          {/* {solvedQuestions.size === 6 && (
            <Badge color="success" style={{marginLeft:'15px'}}>Completed</Badge>
          )} */}
        </div>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Solved</th>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Difficulty</th>
            <th>Resources</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {questions.map((q, index) => {
            const isSolved = solvedQuestions.has(q.question_id);

            return (
              <tr key={q.question_id}>
                <td className="text-center">
                  <Input
                    type="checkbox"
                    checked={isSolved}
                    onChange={() => handleSolvedToggle(q.question_id)}
                    style={{ cursor: 'pointer' }}
                  />
                </td>

                <td>{index + 1}</td>
                <td>{q.question_title}</td>
                <td>{q.question_description}</td>
                <td className="text-capitalize">{q.difficulty}</td>

                <td>
                  <a href={q.question_link} target="_blank" rel="noreferrer">
                    Problem
                  </a>
                  {' | '}
                  <a href={q.youtube_link} target="_blank" rel="noreferrer">
                    Video
                  </a>
                  {' | '}
                  <a href={q.article_link} target="_blank" rel="noreferrer">
                    Article
                  </a>
                </td>

                <td className={`text-center fw-bold ${isSolved ? 'text-success' : 'text-warning'}`}>
                  {isSolved ? 'Done' : 'Pending'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Stack;
