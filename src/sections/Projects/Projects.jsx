import { useState, useMemo } from 'react';
import { SectionHeader } from '../../components/common';
import Button from '../../components/Button';
import { projects } from '../../data/projects';
import './Projects.css';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Projects' },
  { id: 'AI & Machine Learning', label: 'AI & ML' },
  { id: 'Full-Stack Web', label: 'Full-Stack' },
  { id: 'Frontend Development', label: 'Frontend' },
];

function Projects() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <SectionHeader
          title="Architected software, models & web systems."
          description="Explore selected technical projects showcasing problem-solving across modern web engineering and applied artificial intelligence."
        />

        {/* Project Filter Controls */}
        <div className="projects-filter-bar">
          <div className="filter-pill-group">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`filter-pill-btn ${filter === opt.id ? 'active' : ''}`}
                onClick={() => setFilter(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <span className="project-count-badge">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
          </span>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="project-card">
              {/* Project Visual Preview Header (Apple/Antigravity style) */}
              <div className="project-preview-frame">
                <div className="preview-window-controls">
                  <span className="ctrl-dot"></span>
                  <span className="ctrl-dot"></span>
                  <span className="ctrl-dot"></span>
                </div>
                <div className="preview-meta-tag">
                  <span className="tech-badge">{project.category}</span>
                </div>

                {/* Stylized Preview Graphic */}
                <div className="preview-graphic-canvas">
                  <div className="code-editor-mockup">
                    <div className="code-line">
                      <span className="code-token purple">const</span>{' '}
                      <span className="code-token blue">{project.id.replace(/-/g, '_')}</span> ={' '}
                      <span className="code-token amber">async</span> () =&gt; &#123;
                    </div>
                    <div className="code-line indent">
                      <span className="code-token gray">// {project.stats}</span>
                    </div>
                    <div className="code-line indent">
                      <span className="code-token purple">return</span>{' '}
                      <span className="code-token green">executePipeline</span>();
                    </div>
                    <div className="code-line">&#125;;</div>
                  </div>
                </div>
              </div>

              {/* Project Body */}
              <div className="project-content">
                <div className="project-header-row">
                  <span className="project-year-label">{project.year}</span>
                  <span className="project-type-label">{project.category}</span>
                </div>

                <h3 className="project-title">{project.title}</h3>

                <p className="project-description">{project.description}</p>

                {/* Tech Stack Pills */}
                <div className="project-tech-tags">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag-pill">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="project-actions">
                  {project.githubUrl && (
                    <Button
                      variant="secondary"
                      size="sm"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon="↗"
                    >
                      Source Code
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button
                      variant="primary"
                      size="sm"
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon="→"
                    >
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
