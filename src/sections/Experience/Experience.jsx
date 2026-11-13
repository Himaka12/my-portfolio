import { useState } from 'react';
import { SectionHeader } from '../../components/common';
import { experience } from '../../data/experience';
import './Experience.css';

function Experience() {
  const [filterType, setFilterType] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Milestones' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience & Internships' },
    { id: 'certification', label: 'Certifications' },
    { id: 'achievement', label: 'Honors' },
  ];

  const filteredItems =
    filterType === 'all'
      ? experience
      : experience.filter((item) => item.type === filterType);

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <SectionHeader
          eyebrow="04 // PATHWAY & TIMELINE"
          title="Education, internships & technical credentials."
          description="A chronological record of academic coursework, engineering projects, and certifications."
        />

        {/* Filter Tabs */}
        <div className="timeline-filter-bar">
          <div className="timeline-filter-track">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`timeline-tab-btn ${filterType === tab.id ? 'active' : ''}`}
                onClick={() => setFilterType(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Timeline */}
        <div className="timeline-container">
          {filteredItems.map((item, index) => (
            <div key={item.id} className="timeline-item">
              {/* Left Column: Period & Location */}
              <div className="timeline-left">
                <span className="timeline-period-badge">{item.period}</span>
                <span className="timeline-location">{item.location}</span>
                <span className="timeline-status-tag">{item.status}</span>
              </div>

              {/* Center: Timeline line and node */}
              <div className="timeline-node-wrapper">
                <div className="timeline-node">
                  <span className="node-dot"></span>
                </div>
                {index < filteredItems.length - 1 && <div className="timeline-connector"></div>}
              </div>

              {/* Right Column: Card Content */}
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <h3 className="timeline-role-title">{item.title}</h3>
                  <div className="timeline-org-meta">
                    <span className="org-name">{item.organization}</span>
                  </div>
                </div>

                <ul className="timeline-desc-list">
                  {item.description.map((point, i) => (
                    <li key={i} className="timeline-desc-point">
                      {point}
                    </li>
                  ))}
                </ul>

                {item.badges && item.badges.length > 0 && (
                  <div className="timeline-badges-row">
                    {item.badges.map((badge, bIdx) => (
                      <span key={bIdx} className="timeline-badge">
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
