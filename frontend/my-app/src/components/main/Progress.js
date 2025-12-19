import React, { useEffect, useState } from 'react';
import httpInjectorService from '../../services/http-injector.service';

const Progress = () => {
  const userId = Number(localStorage.getItem('userId'));
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await httpInjectorService.fetchProgress(userId);
      if (response.status === 'success') {
        console.log('Progress data:', response.data);
        setProgressData(response.data);
      } else {
        console.log(response);
      }
    } catch (err) {
      console.error('Error fetching progress:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Progress Overview</h2>
      {progressData.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Difficulty</th>
              <th>Solved Count</th>
              <th>Total Count</th>
              <th>Solved Percentage</th>
            </tr>
          </thead>
          <tbody>
            {progressData.map((item, index) => (
              <tr key={index}>
                <td>{item.difficulty}</td>
                <td>{item.solved_count}</td>
                <td>{item.total_count}</td>
                <td>{item.solved_percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No progress data available.</p>
      )}
    </div>
  );
};

export default Progress;