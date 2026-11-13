import { projects } from '../../data/projects';
import './Projects.css';

function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2>Projects</h2>
        {/* Populate projects in src/data/projects.js */}
        {projects.length === 0 && (
          <p>Projects will appear here once defined in src/data/projects.js.</p>
        )}
      </div>
    </section>
  );
}

export default Projects;
