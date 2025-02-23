import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
    <ul>
      <li>
        <Link to='/CandidateSearch'>Candidate Search</Link>
      </li>
      <li>
        <Link to='/SavedCandidates'>Saved Candidates</Link>
      </li>
    </ul>

    </div>
  )
};

export default Nav;
