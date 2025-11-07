import React, { useEffect, useState } from 'react';
import './App.css';
import Menu from './components/Menu';
import ProjectCard from './components/ProjectCard';
import Papa from 'papaparse';

interface Project {
  title: string;
  description: string;
  tags: string[];
  technologies: string[];
  githubUrl: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/data/projects.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const projectData: Project[] = results.data
              .filter((row: any) => row.title && row.title.trim() !== '')
              .map((row: any) => ({
                title: row.title,
                description: row.description,
                tags: row.tags ? row.tags.split(',').map((tag: string) => tag.trim()) : [],
                technologies: row.technologies ? row.technologies.split(',').map((tech: string) => tech.trim()) : [],
                githubUrl: row.githubUrl
              }));
            setProjects(projectData);
          }
        });
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="App">
      <Menu />
      
      {/* Home Section */}
      <section id="home" className="section home-section">
        <div className="circle-bg-1"></div>
        <div className="circle-bg-2"></div>
        <div className="circle-bg-3"></div>
        <div className="circle-bg-4"></div>
        <div className="section-content">
          <h1>Hello</h1>
          <p>
            I build amazing digital experiences using modern technologies. 
            From sleek web applications to interactive user interfaces, 
            I bring ideas to life with clean code and creative design.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="section-content">
          <h2>Featured Projects</h2>
          <p>
            Here are some of the exciting projects I've been working on. 
            Each one represents a unique challenge and creative solution, 
            built with passion and attention to detail.
          </p>
          
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                technologies={project.technologies}
                githubUrl={project.githubUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
