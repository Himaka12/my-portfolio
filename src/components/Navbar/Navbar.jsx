import { useState, useEffect, useRef, useCallback } from 'react';
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

const getInitialSection = () => {
  if (typeof window !== 'undefined' && window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    if (NAV_LINKS.some((link) => link.id === hash)) {
      return hash;
    }
  }
  return 'hero';
};

function Navbar() {
  const [activeSection, setActiveSection] = useState(getInitialSection);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trail, setTrail] = useState(null);

  const prevSectionRef = useRef(activeSection);
  const isFirstRenderRef = useRef(true);
  const isClickScrollingRef = useRef(false);
  const clickScrollTimeoutRef = useRef(null);

  const dotRefs = useRef({});
  const navListRef = useRef(null);
  const trailTimeoutRef = useRef(null);

  // Reliable section detection using the top activation zone below sticky navbar
  const determineActiveSection = useCallback(() => {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // 1. Top of page guard: viewing hero
    if (scrollY < 80) {
      return 'hero';
    }

    // 2. Bottom of page guard: viewing contact / reached page end
    if (scrollY + windowHeight >= docHeight - 50) {
      return 'contact';
    }

    // 3. Activation zone detection below sticky navbar (~76px height)
    // A section is active if it occupies the activation zone (150px from viewport top)
    const activationPoint = 150;

    for (let i = 0; i < NAV_LINKS.length; i++) {
      const sectionId = NAV_LINKS[i].id;
      const element = document.getElementById(sectionId);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      if (rect.top <= activationPoint && rect.bottom > activationPoint) {
        return sectionId;
      }
    }

    // 4. Fallback: closest section to activation point
    let closestId = 'hero';
    let minDistance = Infinity;

    for (let i = 0; i < NAV_LINKS.length; i++) {
      const sectionId = NAV_LINKS[i].id;
      const element = document.getElementById(sectionId);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const distance = Math.abs(rect.top - activationPoint);
      if (distance < minDistance) {
        minDistance = distance;
        closestId = sectionId;
      }
    }

    return closestId;
  }, []);

  // Motion Trail trigger on activeSection transition
  useEffect(() => {
    // Avoid animation on initial mount / reload
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      prevSectionRef.current = activeSection;
      return;
    }

    const fromId = prevSectionRef.current;
    const toId = activeSection;

    if (fromId === toId) return;
    prevSectionRef.current = toId;

    // Respect reduced motion accessibility
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const fromDot = dotRefs.current[fromId];
    const toDot = dotRefs.current[toId];
    const list = navListRef.current;

    if (!fromDot || !toDot || !list) return;

    const listRect = list.getBoundingClientRect();
    const fromRect = fromDot.getBoundingClientRect();
    const toRect = toDot.getBoundingClientRect();

    // Calculate exact center coordinates of both dots relative to the nav-list container
    const x1 = fromRect.left - listRect.left + fromRect.width / 2;
    const y = fromRect.top - listRect.top + fromRect.height / 2;
    const x2 = toRect.left - listRect.left + toRect.width / 2;

    const length = Math.abs(x2 - x1);

    if (length > 0) {
      if (trailTimeoutRef.current) {
        clearTimeout(trailTimeoutRef.current);
      }

      setTrail({
        key: `${fromId}-${toId}-${Date.now()}`,
        x1,
        y,
        x2,
        length,
      });

      // Clear the trail line completely once animation has finished
      trailTimeoutRef.current = setTimeout(() => {
        setTrail(null);
        trailTimeoutRef.current = null;
      }, 500);
    }
  }, [activeSection]);

  // Clean up timers on window resize
  useEffect(() => {
    const handleResize = () => {
      setTrail(null);
      if (trailTimeoutRef.current) {
        clearTimeout(trailTimeoutRef.current);
        trailTimeoutRef.current = null;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Scroll spy with requestAnimationFrame throttling for fluid 60/120fps tracking
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (isClickScrollingRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!isClickScrollingRef.current) {
            const nextSection = determineActiveSection();
            setActiveSection((prev) => (prev !== nextSection ? nextSection : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Synchronize after initial layout paint
    window.requestAnimationFrame(() => {
      const initialSection = determineActiveSection();
      setActiveSection((prev) => (prev !== initialSection ? initialSection : prev));
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [determineActiveSection]);

  // Cancel click-scroll lock if the user interacts manually (wheel / touch)
  useEffect(() => {
    const handleUserInteraction = () => {
      if (isClickScrollingRef.current) {
        isClickScrollingRef.current = false;
        if (clickScrollTimeoutRef.current) {
          clearTimeout(clickScrollTimeoutRef.current);
          clickScrollTimeoutRef.current = null;
        }
      }
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      if (clickScrollTimeoutRef.current) {
        clearTimeout(clickScrollTimeoutRef.current);
      }
      if (trailTimeoutRef.current) {
        clearTimeout(trailTimeoutRef.current);
      }
    };
  }, []);

  // Handle browser back/forward or direct hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (NAV_LINKS.some((link) => link.id === hash)) {
        setActiveSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (activeSection === targetId) {
      scrollTo(`#${targetId}`);
      return;
    }

    // Lock scroll spy during programmatic scroll so intermediate sections don't flicker or interrupt trail
    isClickScrollingRef.current = true;
    if (clickScrollTimeoutRef.current) {
      clearTimeout(clickScrollTimeoutRef.current);
    }

    setActiveSection(targetId);
    scrollTo(`#${targetId}`);

    // Unlock after smooth scroll settles
    clickScrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
      clickScrollTimeoutRef.current = null;
    }, 850);
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
          <ul className={`nav-list ${trail ? 'has-trail' : ''}`} ref={navListRef}>
            {/* SVG Motion Trail Overlay: connects dot centers horizontally */}
            {trail && (
              <svg className="nav-motion-trail-svg" aria-hidden="true">
                <line
                  key={trail.key}
                  x1={trail.x1}
                  y1={trail.y}
                  x2={trail.x2}
                  y2={trail.y}
                  className="nav-trail-line"
                  style={{
                    '--trail-length': `${trail.length}px`,
                  }}
                />
              </svg>
            )}

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
                    <span
                      ref={(el) => {
                        if (el) dotRefs.current[link.id] = el;
                      }}
                      className={`nav-dot ${isActive ? 'active' : ''}`}
                      aria-hidden="true"
                    />
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
