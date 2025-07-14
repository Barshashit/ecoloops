import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [stats, setStats] = useState({
    treesPlanted: 0,
    co2Reduced: 0,
    usersJoined: 0,
    wasteRecycled: 0
  });

  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateStats();
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    const targetStats = {
      treesPlanted: 15420,
      co2Reduced: 23450,
      usersJoined: 8920,
      wasteRecycled: 45670
    };

    const duration = 2500;
    const steps = 80;
    const stepValue = (target, current) => (target - current) / steps;

    const timer = setInterval(() => {
      setStats(prev => ({
        treesPlanted: Math.min(prev.treesPlanted + stepValue(targetStats.treesPlanted, prev.treesPlanted), targetStats.treesPlanted),
        co2Reduced: Math.min(prev.co2Reduced + stepValue(targetStats.co2Reduced, prev.co2Reduced), targetStats.co2Reduced),
        usersJoined: Math.min(prev.usersJoined + stepValue(targetStats.usersJoined, prev.usersJoined), targetStats.usersJoined),
        wasteRecycled: Math.min(prev.wasteRecycled + stepValue(targetStats.wasteRecycled, prev.wasteRecycled), targetStats.wasteRecycled)
      }));
    }, duration / steps);

    return () => clearInterval(timer);
  };

  return (
    <div className="hero-section" ref={heroRef}>
      {/* Animated Background Elements */}
      <div className="eco-background">
        <div className="floating-leaf leaf-8">🌲</div>
      </div>

      {/* Particle Effects */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--delay': `${i * 0.2}s`,
            '--duration': `${2 + i * 0.1}s`
          }}></div>
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-text-section">
          <div className={`hero-title ${isVisible ? 'animate-in' : ''}`}>
            <span className="gradient-text">Transform</span>
            <br />
            <span className="gradient-text">Waste Into</span>
            <br />
            <span className="eco-highlight">Worth</span>
          </div>
          
          <p className={`hero-subtitle ${isVisible ? 'animate-in' : ''}`}>
            Join the <span className="highlight">green revolution</span> of sustainable living. 
            Recycle, earn rewards, and help save our planet one step at a time.
          </p>
          
          <div className={`hero-stats ${isVisible ? 'animate-in' : ''}`}>
            <div className="stat-item">
              <div className="stat-icon">🌳</div>
              <div className="stat-number">{Math.round(stats.treesPlanted).toLocaleString()}+</div>
              <div className="stat-label">Trees Planted</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🌍</div>
              <div className="stat-number">{Math.round(stats.co2Reduced).toLocaleString()}kg</div>
              <div className="stat-label">CO₂ Reduced</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">👥</div>
              <div className="stat-number">{Math.round(stats.usersJoined).toLocaleString()}+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">♻️</div>
              <div className="stat-number">{Math.round(stats.wasteRecycled).toLocaleString()}kg</div>
              <div className="stat-label">Waste Recycled</div>
            </div>
          </div>
          
          <div className={`cta-section ${isVisible ? 'animate-in' : ''}`}>
            <button className="cta-button primary">
              <span>Start Recycling Today</span>
              <div className="button-glow"></div>
            </button>
            <button className="cta-button secondary">
              <span>Learn More</span>
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="eco-animation-container">
            {/* Central Earth Animation */}
            <div className="earth-container">
              <div className="earth">🌍</div>
              <div className="earth-ring ring-1"></div>
              <div className="earth-ring ring-2"></div>
              <div className="earth-ring ring-3"></div>
            </div>
            
            {/* Recycling Icons */}
            <div className="recycling-icons">
              <div className="recycle-icon icon-1">♻️</div>
              <div className="recycle-icon icon-2">🌱</div>
              <div className="recycle-icon icon-3">💚</div>
              <div className="recycle-icon icon-4">🌿</div>
              <div className="recycle-icon icon-5">🌲</div>
              <div className="recycle-icon icon-6">🌳</div>
            </div>
            
            {/* Progress Circles */}
            <div className="progress-circles">
              <div className="progress-circle circle-1">
                <div className="circle-fill"></div>
                <span>75%</span>
              </div>
              <div className="progress-circle circle-2">
                <div className="circle-fill"></div>
                <span>60%</span>
              </div>
              <div className="progress-circle circle-3">
                <div className="circle-fill"></div>
                <span>85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
      );
};

export default HeroSection;

 