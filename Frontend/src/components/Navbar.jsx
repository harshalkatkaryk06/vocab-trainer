import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">My Vocab</div>

      <nav className="navbar-menu">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/library">Library</Link></li>
          <li><Link to="/quiz">Quiz</Link></li>  {/* ✅ ADD THIS */}
          <li><Link to="/word-of-the-day">Word of the Day</Link></li>
          {/* <li><Link to="/test">Test</Link></li> */}
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      <div className="navbar-profile">
        <Link to="/user">Profile</Link>
      </div>
    </header>
  );
};

export default Navbar;
