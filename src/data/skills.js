/**
 * Skills & Technical Capabilities Data
 * Organized into five core disciplines as requested.
 * Edit, add, or remove skills as needed.
 */

export const skillCategories = [
  {
    id: 'languages',
    title: 'Programming Languages',
    description: 'Foundational syntax, algorithmic problem solving, and system logic.',
    skills: [
      { name: 'Python', level: 'Advanced', badge: 'Core' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', badge: 'Core' },
      { name: 'TypeScript', level: 'Intermediate', badge: 'Modern' },
      { name: 'C++', level: 'Intermediate', badge: 'Systems' },
      { name: 'Java', level: 'Intermediate', badge: 'OOP' },
      { name: 'SQL', level: 'Proficient', badge: 'Data' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Building responsive, accessible, high-performance web applications.',
    skills: [
      { name: 'React', level: 'Advanced', badge: 'Core' },
      { name: 'Vite', level: 'Advanced', badge: 'Tooling' },
      { name: 'HTML5 & Modern CSS', level: 'Advanced', badge: 'Semantics' },
      { name: 'Responsive UI/UX', level: 'Advanced', badge: 'Design' },
      { name: 'State Management', level: 'Proficient', badge: 'Architecture' },
      { name: 'Tailwind CSS', level: 'Proficient', badge: 'Utility' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Scalable server-side logic, API design, and database integration.',
    skills: [
      { name: 'Node.js', level: 'Proficient', badge: 'Runtime' },
      { name: 'Express.js', level: 'Proficient', badge: 'Framework' },
      { name: 'RESTful APIs', level: 'Advanced', badge: 'Protocol' },
      { name: 'PostgreSQL', level: 'Proficient', badge: 'Relational' },
      { name: 'MongoDB', level: 'Intermediate', badge: 'NoSQL' },
      { name: 'FastAPI / Flask', level: 'Intermediate', badge: 'Python API' },
    ],
  },
  {
    id: 'aiml',
    title: 'Machine Learning & AI',
    description: 'Investigating neural architectures, model evaluation, and LLM orchestration.',
    skills: [
      { name: 'PyTorch', level: 'Intermediate', badge: 'Deep Learning' },
      { name: 'TensorFlow / Keras', level: 'Intermediate', badge: 'Framework' },
      { name: 'Scikit-Learn', level: 'Proficient', badge: 'Classical ML' },
      { name: 'LLM Prompt Engineering', level: 'Proficient', badge: 'GenAI' },
      { name: 'Computer Vision Basics', level: 'Familiar', badge: 'Vision' },
      { name: 'Data Preprocessing & NumPy', level: 'Advanced', badge: 'Data Science' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    description: 'Professional engineering workflows, version control, and environments.',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced', badge: 'Version Control' },
      { name: 'VS Code & Antigravity', level: 'Advanced', badge: 'Environment' },
      { name: 'Docker Containers', level: 'Familiar', badge: 'DevOps' },
      { name: 'Postman', level: 'Proficient', badge: 'API Testing' },
      { name: 'Linux / Unix Shell', level: 'Proficient', badge: 'CLI' },
      { name: 'Figma UI Design', level: 'Proficient', badge: 'Prototyping' },
    ],
  },
];

export const skills = skillCategories;
export default skillCategories;
