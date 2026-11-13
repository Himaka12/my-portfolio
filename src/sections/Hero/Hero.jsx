import portraitImg from '../../assets/images/portrait.jpg';
import Button from '../../components/Button';
import './Hero.css';

/**
 * Hero Section
 * Minimalist Apple-inspired Editorial Style:
 * - Asymmetrical two-column composition
 * - Bold two-line heading on the left
 * - Pure white canvas with soft circular ambient backdrop
 * - Perfectly circular black-and-white portrait on the right
 * - Minimal vertical 'SCROLL DOWN' indicator on the right edge
 */
function Hero() {
  const portraitImageSrc = portraitImg;

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-viewport-section">
      {/* Main Full-Screen Hero Layout */}
      <div className="container hero-full-container">
        <div className="hero-columns-layout">
          {/* =================================================================
             Left Column: Typography & Content
             ================================================================= */}
          <div className="hero-left-col">
            {/* Main Heading (Large bold typography, 2 lines on desktop) */}
            <h1 className="hero-headline">
              <span className="headline-line">Building intelligent</span>
              <span className="headline-line">experiences.</span>
            </h1>

            {/* Description Paragraph */}
            <p className="hero-subtext">
              I'm [Your Name], an IT undergraduate passionate about software engineering, artificial intelligence, and machine learning. I enjoy building meaningful digital experiences and exploring innovative technologies.
            </p>

            {/* Primary CTA (Soft light-grey pill with arrow) */}
            <div className="hero-cta-area">
              <Button
                variant="secondary"
                size="md"
                href="#projects"
                onClick={(e) => handleScrollTo(e, 'projects')}
                icon="→"
                className="hero-minimal-cta"
              >
                EXPLORE MY WORK
              </Button>
            </div>

            {/* Understated Editorial Social Links (Bottom-Left) */}
            <div className="hero-social-footer">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-text-link"
              >
                GitHub
              </a>
              <span className="social-slash">/</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-text-link"
              >
                LinkedIn
              </a>
              <span className="social-slash">/</span>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="social-text-link"
              >
                Email
              </a>
            </div>
          </div>

          {/* =================================================================
             Right Column: Soft Ambient Glow + Perfect Circular Portrait
             ================================================================= */}
          <div className="hero-right-col">
            <div className="hero-art-stage">
              {/* Subtle Soft Circular Ambient Glow */}
              <div className="oversized-circle-bg" aria-hidden="true"></div>

              {/* Dedicated Perfect Circular Portrait Area */}
              <div className="portrait-display-area">
                <img
                  src={portraitImageSrc}
                  alt="Portrait in graduation attire"
                  className="portrait-real-img"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Vertical 'SCROLL DOWN' Indicator on Right Edge */}
        <div className="hero-scroll-edge">
          <a
            href="#about"
            onClick={(e) => handleScrollTo(e, 'about')}
            className="scroll-edge-link"
            aria-label="Scroll down"
          >
            <span className="scroll-edge-text">SCROLL DOWN</span>
            <div className="scroll-edge-line">
              <span className="scroll-edge-arrow">↓</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
