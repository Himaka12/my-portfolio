import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <a href="#hero" className="navbar-brand">
          Portfolio
        </a>
        <nav className="navbar-nav">
          <ul className="navbar-links">
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
