import { useState, useMemo } from 'react';
import { SectionHeader } from '../../components/common';
import { skillCategories } from '../../data/skills';
import './Skills.css';

const CATEGORIES = [
  { id: 'all', label: 'All Disciplines' },
  ...skillCategories.map((cat) => ({ id: cat.id, label: cat.title })),
];

function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const displayedCategories = useMemo(
    () =>
      activeCategory === 'all'
        ? skillCategories
        : skillCategories.filter((cat) => cat.id === activeCategory),
    [activeCategory]
  );

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <SectionHeader
          title="Engineered with modern tools, frameworks & algorithms."
          description="A comprehensive overview of my current technical stack across programming, full-stack development, and artificial intelligence."
        />

        {/* Category Filter Pills */}
        <div className="skills-filter-container">
          <div className="skills-filter-track">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`skill-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="skills-categories-grid">
          {displayedCategories.map((category) => (
            <div key={category.id} className="skill-category-card">
              <div className="skill-category-header">
                <div className="category-meta">
                  <span className="category-marker">◈</span>
                  <h3 className="category-title">{category.title}</h3>
                </div>
                <p className="category-description">{category.description}</p>
              </div>

              <div className="skills-pill-grid">
                {category.skills.map((skill, index) => (
                  <div key={index} className="skill-pill">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-badge-tag">{skill.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
