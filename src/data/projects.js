/**
 * Featured Projects Data
 * 
 * [EDITABLE PLACEHOLDERS]
 * Replace the items below with your personal projects, links, and repositories.
 */

export const projects = [
  {
    id: 'agentic-ai-orchestrator',
    title: 'Autonomous Agent Workflow Orchestrator',
    category: 'AI & Machine Learning',
    featured: true,
    year: '2025',
    description:
      'A multi-agent workflow framework designed to decompose complex natural language requests into structured, executable pipelines using LLMs and automated feedback loops.',
    technologies: ['Python', 'FastAPI', 'LangChain', 'React', 'Tailwind'],
    githubUrl: 'https://github.com/your-username/agentic-orchestrator',
    demoUrl: 'https://demo-agentic-orchestrator.example.com',
    stats: 'Multi-Agent DAG • Real-time Streaming',
    theme: {
      accent: '#2563eb',
      visualType: 'neural',
    },
  },
  {
    id: 'cloud-analytics-platform',
    title: 'Real-Time Distributed Telemetry Dashboard',
    category: 'Full-Stack Web',
    featured: true,
    year: '2025',
    description:
      'High-throughput web dashboard for visualizing distributed microservice health metrics, featuring low-latency WebSocket data streaming and responsive data charts.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'Chart.js'],
    githubUrl: 'https://github.com/your-username/distributed-telemetry-dashboard',
    demoUrl: 'https://demo-telemetry.example.com',
    stats: 'Sub-50ms Latency • Interactive Timeseries',
    theme: {
      accent: '#7c3aed',
      visualType: 'grid',
    },
  },
  {
    id: 'vision-defect-detector',
    title: 'Computer Vision Defect Inspection Model',
    category: 'AI & Machine Learning',
    featured: false,
    year: '2024',
    description:
      'Convolutional neural network pipeline trained to classify and localize manufacturing surface anomalies with high precision, complete with an interactive web evaluation GUI.',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'React', 'Docker'],
    githubUrl: 'https://github.com/your-username/vision-defect-detector',
    demoUrl: '',
    stats: '96.4% F1-Score • ResNet-50 Backbone',
    theme: {
      accent: '#06b6d4',
      visualType: 'vision',
    },
  },
  {
    id: 'portfolio-design-system',
    title: 'Minimalist Editorial Portfolio & Design Tokens',
    category: 'Frontend Development',
    featured: false,
    year: '2024',
    description:
      'A lightweight, Apple-inspired personal portfolio engineering platform built with React, Vite, and custom CSS design tokens for ultra-fast performance and clean aesthetics.',
    technologies: ['React', 'Vite', 'Modern CSS', 'ES6+'],
    githubUrl: 'https://github.com/your-username/my-portfolio',
    demoUrl: 'https://your-portfolio.vercel.app',
    stats: '100 Lighthouse Score • Zero Bloat',
    theme: {
      accent: '#171717',
      visualType: 'code',
    },
  },
];

export default projects;
