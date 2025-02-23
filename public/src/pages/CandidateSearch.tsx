import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<any[]> (() => {
  const savedUser = localStorage.getItem('candidates');
  return savedUser ? JSON.parse(savedUser) : [];
});

const [highlightedUser, setHighlightedUser] = useState<any | null>(() => {
const savedUser = localStorage.getItem('highlightedUser');
return savedUser ? JSON.parse(savedUser) : null;
});

const [likedCandidates, setLikedCandidates] = useState<any[]>(()=>{
  return JSON.parse(localStorage.geItem('likedCandidates') || '[]');
});

const [rejectedCandidates, setRejectedCandidates] = useState<any[]> (() => {
  return JSON.parse(localStorage.getItem('rejectedCandidates') || '[]');
});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      const newCandidates = await searchGithub();
      setCandidates(newCandidates);
      localStorage.setItem('candidates', JSON.stringify(newCandidates));
    };

    if(candidates.length === 0) {
      fetchCandidates();
    }
  }, []);
  useEffect(() => {
    const fetchCandidates = async () => {
      const newCandidates = await searchGithub();
      setCandidates(newCandidates);
      localStorage.setItem('candidates', JSON.stringify(newCandidates));
    };

    if(candidates.length === 0) {
    fetchCandidates();
    }
  }, []);

  useEffect(() => {
    if (candidates.length === 0) return;

    const interval = setInterval(async () => {
      const randomUser = candidates[Math.floor(Math.random() * candidates.length)];
      const userDetails = await searchGithubUser(randomUser.login);
      setHighlightedUser(userDetails);
    }, 10000); 

    return () => clearInterval(interval);
  }, [candidates]);

  const handleLiked = () => {
    if (highlightedUser) {
      const updatedLiked = [...likedCandidates, highlightedUser];
      setLikedCandidates(updatedLiked);
      localStorage.setItem('likedCandidates', JSON.stringify(updatedLiked));
    }
  };


  const handleReject = () => {
    if (highlightedUser) {
      const updatedRejected = [...rejectedCandidates, highlightedUser];
      setRejectedCandidates(updatedRejected);
      localStorage.setItem('rejectedCandidates', JSON.stringify(updatedRejected));
    }
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      <button onClick={() => navigate('/saved-candidates')}>View Saved Candidates</button>

      {highlightedUser && (
        <div>
          <h2>Highlighted Candidate</h2>
          <p>Username: {highlightedUser.login}</p>
          <img src={highlightedUser.avatar_url} alt={highlightedUser.login} width="100" />
          <p>
            Profile: <a href={highlightedUser.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
          </p>
          <button onClick={handleLiked}>Like</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
