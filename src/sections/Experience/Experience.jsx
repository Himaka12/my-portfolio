import { experience } from '../../data/experience';
import './Experience.css';

function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <h2>Experience</h2>
        {/* Populate experience in src/data/experience.js */}
        {experience.length === 0 && (
          <p>Experience details will appear here once defined in src/data/experience.js.</p>
        )}
      </div>
    </section>
  );
}

export default Experience;
