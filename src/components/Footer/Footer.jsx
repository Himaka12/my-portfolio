import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-left">
          <div className="footer-brand">
            <span className="footer-brand-symbol">⟡</span>
            <span className="footer-brand-name">Portfolio</span>
          </div>
          <p className="footer-tagline">
            Designing and engineering thoughtful, intelligent software.
          </p>
        </div>

        <div className="footer-center">
          <p className="footer-copy">
            &copy; {currentYear} Handcrafted with React & Vite. Hosted cleanly on modern web infrastructure.
          </p>
        </div>

        <div className="footer-right">
          <button
            type="button"
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <span className="arrow-up">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
