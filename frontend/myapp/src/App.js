import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/top-stories/');
        console.log('response', response.data);
        setStories(response.data);
      } catch (err) {
        setError("Failed to load stories");
      }
    };

    fetchStories();
  }, []);

  return (
    <div>
      <h1>Top 10 HackerNews Stories</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4' }}>Title</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4' }}>Author</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4' }}>Score</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4' }}>Time</th>
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f4f4f4' }}>Link</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{story.title}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{story.author}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{story.score}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{story.time}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
