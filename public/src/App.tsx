import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/CandidateSearch" element={<CandidateSearch />} />
        <Route path="/SavedCandidates" element={<SavedCandidates />} />
      </Routes>
    </Router>
  );
}

export default App;
