import React, { Component } from 'react';
import { motion } from 'framer-motion';
import './Menu.css';

interface MenuState {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  activeSection: string;
  indicatorStyle: {
    left: number;
    width: number;
    opacity: number;
  };
}

interface MenuProps {}

class Menu extends Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);
    this.state = {
      isScrolled: false,
      isMobileMenuOpen: false,
      activeSection: 'home',
      indicatorStyle: {
        left: 0,
        width: 0,
        opacity: 0,
      },
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // Set initial indicator position after component mounts
    setTimeout(() => {
      this.updateIndicatorPosition('home');
    }, 100);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const isScrolled = scrollTop > 50;
    
    if (isScrolled !== this.state.isScrolled) {
      this.setState({ isScrolled });
    }

    // Check which section is currently in view
    this.updateActiveSection();
  };

  updateActiveSection = () => {
    const sections = ['home', 'projects'];
    let currentSection = 'home';
    
    // Get viewport height for calculations
    const viewportHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    // Check each section to see which one is most visible
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        
        // Consider a section active if its top is within the upper 60% of viewport
        // or if we're past the middle of the previous section
        if (scrollTop >= elementTop - viewportHeight * 0.4) {
          currentSection = sectionId;
        }
      }
    }
    
    // Update active section and indicator if it changed
    if (currentSection !== this.state.activeSection) {
      this.setState({ activeSection: currentSection });
      this.updateIndicatorPosition(currentSection);
    }
  };

  toggleMobileMenu = () => {
    this.setState(prevState => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen
    }));
  };

  updateIndicatorPosition = (sectionId: string) => {
    const menuItem = document.querySelector(`[data-section="${sectionId}"]`) as HTMLElement;
    if (menuItem) {
      const menuContainer = menuItem.closest('.menu-items-desktop') as HTMLElement;
      if (menuContainer) {
        const containerRect = menuContainer.getBoundingClientRect();
        const itemRect = menuItem.getBoundingClientRect();
        
        this.setState({
          indicatorStyle: {
            left: itemRect.left - containerRect.left,
            width: itemRect.width,
            opacity: 1,
          }
        });
      }
    }
  };

  scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Update active section, indicator position, and close mobile menu
    this.setState({ 
      isMobileMenuOpen: false,
      activeSection: sectionId
    });
    
    // Update indicator position with animation
    this.updateIndicatorPosition(sectionId);
  };

  render() {
    const { isScrolled, isMobileMenuOpen, activeSection, indicatorStyle } = this.state;

    return (
      <motion.nav
        className={`menu ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="menu-container">
          {/* Logo/Brand */}
          <motion.div 
            className="menu-brand"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button 
              onClick={() => this.scrollToSection('home')}
              className="brand-button"
            >
              Portfolio
            </button>
          </motion.div>

          {/* Desktop Menu Items */}
          <div className="menu-items-desktop">
            <div 
              className="menu-indicator"
              style={indicatorStyle}
            />
            <motion.button
              className={`menu-item ${activeSection === 'home' ? 'active' : ''}`}
              data-section="home"
              onClick={() => this.scrollToSection('home')}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.button>
            <motion.button
              className={`menu-item ${activeSection === 'projects' ? 'active' : ''}`}
              data-section="projects"
              onClick={() => this.scrollToSection('projects')}
              whileTap={{ scale: 0.95 }}
            >
              Projects
            </motion.button>
          </div>

          {/* Mobile Hamburger Button */}
          <motion.button
            className="hamburger"
            onClick={this.toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            <motion.div
              className="hamburger-line"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 6 : 0
              }}
            />
            <motion.div
              className="hamburger-line"
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1
              }}
            />
            <motion.div
              className="hamburger-line"
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -6 : 0
              }}
            />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="menu-items-mobile"
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <motion.button
            className="menu-item-mobile"
            onClick={() => this.scrollToSection('home')}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
          <motion.button
            className="menu-item-mobile"
            onClick={() => this.scrollToSection('projects')}
            whileTap={{ scale: 0.95 }}
          >
            Projects
          </motion.button>
        </motion.div>
      </motion.nav>
    );
  }
}

export default Menu;