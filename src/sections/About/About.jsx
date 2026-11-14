import { SectionHeader } from '../../components/common';
import './About.css';

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <SectionHeader
          title="Driven by curiosity, grounded in engineering principles."
          description="A look into my academic journey, technical philosophy, and aspirations as a software engineer."
        />

        <div className="about-grid">
          {/* Left Column: Narrative Story */}
          <div className="about-narrative">
            <div className="editorial-lead">
              <p className="lead-paragraph">
                I am currently an Information Technology undergraduate dedicated to mastering full-stack software development and the applied frontiers of artificial intelligence and machine learning.
              </p>
            </div>

            <div className="narrative-body">
              <p>
                My passion lies at the intersection of robust backend architecture and delightful, fluid user experiences. I thrive on deconstructing complex problems into clean, modular code, whether that involves building agentic workflows, architecting responsive web applications, or training neural networks.
              </p>
              <p>
                Beyond writing code, I am deeply committed to the craft of engineering: readable syntax, thoughtful documentation, version control discipline, and high-performance execution. I continually explore emerging AI frameworks and contemporary design paradigms to build software that is both technically resilient and intuitively human.
              </p>
            </div>

            {/* Quick Principles Banner */}
            <div className="about-quote-box">
              <span className="quote-glyph">“</span>
              <p className="quote-text">
                Simplicity is the prerequisite for reliability. Great software should feel effortless to the user and elegant to the engineer.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Metric / Highlight Cards */}
          <div className="about-cards-column">
            <div className="about-card">
              <div className="card-header-row">
                <span className="card-badge">ACADEMICS</span>
                <span className="card-icon">🎓</span>
              </div>
              <h3 className="card-title">B.S. in Information Technology</h3>
              <p className="card-description">
                Undergraduate candidate pursuing rigorous studies in computing, data structures, algorithms, and distributed systems.
              </p>
            </div>

            <div className="about-card">
              <div className="card-header-row">
                <span className="card-badge">SPECIALIZATION</span>
                <span className="card-icon">⚡</span>
              </div>
              <h3 className="card-title">Software &amp; AI Integration</h3>
              <p className="card-description">
                Applying modern machine learning models and LLM agent architectures to solve real-world automation and data workflows.
              </p>
            </div>

            <div className="about-card">
              <div className="card-header-row">
                <span className="card-badge">ETHOS</span>
                <span className="card-icon">⟡</span>
              </div>
              <h3 className="card-title">Clean Craft &amp; UX Precision</h3>
              <p className="card-description">
                Inspired by minimalist design philosophies that prioritize clarity, fast performance, and zero unnecessary bloat.
              </p>
            </div>

            <div className="about-card">
              <div className="card-header-row">
                <span className="card-badge">GOALS</span>
                <span className="card-icon">🎯</span>
              </div>
              <h3 className="card-title">Engineering Impact</h3>
              <p className="card-description">
                Seeking ambitious engineering internships and collaborative research where I can contribute to mission-critical systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
