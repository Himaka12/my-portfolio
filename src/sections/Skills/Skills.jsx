import { skills } from '../../data/skills';
import './Skills.css';

function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <h2>Skills</h2>
        {/* Populate skills in src/data/skills.js */}
        {skills.length === 0 && (
          <p>Skills data will appear here once defined in src/data/skills.js.</p>
        )}
      </div>
    </section>
  );
}

export default Skills;
