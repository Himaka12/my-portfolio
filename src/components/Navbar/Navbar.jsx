import { useState, useEffect } from 'react';
import { scrollTo } from '../../utils/smoothScroll';
import './Navbar.css';

const NAV_LINKS = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'contact', label: 'CONTACT' },
];

function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let cachedOffsets = [];

    // Pre-calculate section offsets to avoid layout thrashing during scroll
    const updateCachedOffsets = () => {
      cachedOffsets = NAV_LINKS.map((link) => {
        const el = document.getElementById(link.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          id: link.id,
          top: rect.top + window.scrollY,
        };
      }).filter(Boolean);
    };

    updateCachedOffsets();

    let rafId = null;
    const checkActiveSection = () => {
      const scrollPosition = window.scrollY + 140;
      let currentId = NAV_LINKS[0].id;

      for (let i = cachedOffsets.length - 1; i >= 0; i--) {
        if (scrollPosition >= cachedOffsets[i].top) {
          currentId = cachedOffsets[i].id;
          break;
        }
      }

      // Only update state if active section has actually changed
      setActiveSection((prev) => (prev !== currentId ? currentId : prev));
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        checkActiveSection();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateCachedOffsets, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateCachedOffsets);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(`#${targetId}`);
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* User Name Brand Link (No icons or symbols, clean modern typography) */}
        <a
          href="#hero"
          className="navbar-brand"
          onClick={(e) => handleLinkClick(e, 'hero')}
          aria-label="Himaka Uthpala - Home"
        >
          Himaka Uthpala
        </a>

        {/* Lightweight Right-aligned Navigation Links */}
        <nav className="navbar-nav desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="nav-item">
                  <a
                    href={`#${link.id}`}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="nav-active-dot" aria-hidden="true">•</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line top"></span>
          <span className="hamburger-line bottom"></span>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner container">
          <ul className="mobile-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.id} className="mobile-nav-item">
                <a
                  href={`#${link.id}`}
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
