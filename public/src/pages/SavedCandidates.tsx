import {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const SavedCandidates = () => {
const navigate = useNavigate();
const [likedCandidates, setLikedCandidates] = useState<any[]>([]);
const [rejectedCandidates, setRejectedCandidates] = useState<any[]>([]);

useEffect(() => {
  setLikedCandidates(JSON.parse(localStorage.getItem('likedCandidates') || '[]'));
  setRejectedCandidates(JSON.parse(localStorage.getItem('rejectedcandidates') || '[]'));
})
  return (
    <div>
      <h1>Saved Candidates</h1>
      <button onClick={() => navigate('/')}>Back to Search</button>

      <h2>Liked Candidates</h2>
      <ul>
        {likedCandidates.map((candidate) => (
          <li key={candidate.id}>
            <p>{candidate.login}</p>
            <img src ={candidate.avatar_url} alt={candidate.login} />
            <p>
              <a href ={candidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
            </p>
          </li>
        ))}
      </ul>

      <h2>Rejected Candidates</h2>
      <ul>
        {rejectedCandidates.map((candidate) => (
          <li key={candidate.id}>
            <p>{candidate.login}</p>
            <img src={candidate.avatar_url} alt={candidate.login} width="50" />
            <p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
            </p>
          </li>
        ))}
      </ul>
      </div>
  );
};

export default SavedCandidates;
