import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
  technologies: string[];
  githubUrl: string;
  isExpanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
}

const TECHNOLOGY_COLORS: { [key: string]: string } = {
  'React': '#61DAFB',
  'TypeScript': '#3178C6',
  'JavaScript': '#F7DF1E',
  'Python': '#3776AB',
  'Node.js': '#339933',
  'AI': '#6CB197',
  'Machine Learning': '#FF6B35',
  'CSS': '#1572B6',
  'HTML': '#E34F26',
  'Vue.js': '#4FC08D',
  'Angular': '#DD0031',
  'Docker': '#2496ED',
  'MongoDB': '#47A248',
  'PostgreSQL': '#336791',
  'Firebase': '#FFCA28',
  'GraphQL': '#E10098',
  'Redux': '#764ABC',
  'Next.js': '#000000',
  'Express': '#000000',
  'Flutter': '#02569B',
  'Swift': '#FA7343',
  'Kotlin': '#7F52FF',
  'Java': '#ED8B00',
  'C++': '#00599C',
  'PHP': '#777BB4',
  'Ruby': '#CC342D',
  'Go': '#00ADD8',
  'Rust': '#000000',
  'TensorFlow': '#FF6F00',
  'PyTorch': '#EE4C2C',
  'Solidity': '#363636',
  'Web3': '#F16822',
  'Ethereum': '#627EEA',
  'FastAPI': '#009688',
  'Dart': '#0175C2',
  'WebSocket': '#4A90E2'
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags = [],
  technologies,
  githubUrl,
  isExpanded = false,
  onExpand,
  onCollapse
}) => {
  const handleGitHubClick = () => {
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCardClick = () => {
    if (onExpand) {
      onExpand();
    }
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCollapse) {
      onCollapse();
    }
  };

  return (
    <motion.div 
      className={`project-card ${isExpanded ? 'expanded' : ''}`}
      onClick={!isExpanded ? handleCardClick : undefined}
      initial={false}
      animate={{
        scale: isExpanded ? 1.02 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
      style={{
        cursor: !isExpanded ? 'pointer' : 'default',
        zIndex: isExpanded ? 10 : 1,
        gridColumn: isExpanded ? '1 / -1' : undefined,
        gridRow: isExpanded ? 'span 2' : undefined,
      }}
    >
      <div className="project-card-header">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
      </div>

      {tags.length > 0 && (
        <div className="project-tags">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="project-tag">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="project-tag ellipsis-tag">...</span>
          )}
        </div>
      )}

      <div className="project-divider"></div>

      <div className="project-footer">
        <div className="project-technologies">
          {technologies.map((tech, index) => (
            <div key={index} className="technology-item">
              <div 
                className="technology-circle"
                style={{ backgroundColor: TECHNOLOGY_COLORS[tech] || '#6B7280' }}
              ></div>
              <span className="technology-name">{tech}</span>
            </div>
          ))}
        </div>

        <button className="github-button" onClick={handleGitHubClick}>
          <span className="github-icon">&lt;&gt;</span>
          View on GitHub
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.button
            className="close-button"
            onClick={handleCloseClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            ×
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard;