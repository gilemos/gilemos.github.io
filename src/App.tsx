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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Function to get items per row based on screen size
  const getItemsPerRow = () => {
    if (window.innerWidth >= 1400) return 4;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 769) return 2;
    return 1;
  };

  // Function to reorganize projects for row-preserving expansion
  const getReorganizedProjects = () => {
    if (expandedIndex === null) return projects;

    const itemsPerRow = getItemsPerRow();
    const expandedRowStart = Math.floor(expandedIndex / itemsPerRow) * itemsPerRow;
    const expandedRowEnd = expandedRowStart + itemsPerRow;
    
    const beforeExpanded = projects.slice(0, expandedIndex);
    const expandedItem = projects[expandedIndex];
    const sameRowAfterExpanded = projects.slice(expandedIndex + 1, expandedRowEnd);
    const afterExpandedRow = projects.slice(expandedRowEnd);
    
    // Put expanded item first, then items after it in the same row, then rest
    return [
      ...beforeExpanded,
      expandedItem,
      ...sameRowAfterExpanded,
      ...afterExpandedRow
    ];
  };

  const handleCardExpand = (index: number) => {
    setExpandedIndex(index);
  };

  const handleCardCollapse = () => {
    setExpandedIndex(null);
  };

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

    // Handle window resize to collapse expanded cards if needed
    const handleResize = () => {
      if (expandedIndex !== null) {
        // Collapse on resize to prevent layout issues
        setExpandedIndex(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [expandedIndex]);

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
            {getReorganizedProjects().map((project, displayIndex) => {
              const originalIndex = projects.findIndex(p => 
                p.title === project.title && 
                p.description === project.description
              );
              const isExpanded = expandedIndex === originalIndex;
              
              return (
                <ProjectCard
                  key={`${project.title}-${originalIndex}`}
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  technologies={project.technologies}
                  githubUrl={project.githubUrl}
                  isExpanded={isExpanded}
                  onExpand={() => handleCardExpand(originalIndex)}
                  onCollapse={handleCardCollapse}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
