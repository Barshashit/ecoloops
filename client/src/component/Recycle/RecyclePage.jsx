import React, { useState, useEffect } from "react";
import "./Recycle.css";
import EcoCoinsProgress from "./EcoCoinsProgress";
import RecycleForm from "./RecycleForm";
import ImpactStats from "./ImpactStats";

const RecyclePage = () => {
  const [ecoCoins, setEcoCoins] = useState(0);
  const [showImpact, setShowImpact] = useState(false);
  const [impactData, setImpactData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation trigger when component mounts
    setIsVisible(true);
  }, []);

  const handleRecycle = (data) => {
    setImpactData(data);
    setShowImpact(true);
    setEcoCoins((prev) => prev + (data.coins || 0));
  };

  return (
    <div className={`recycle-page ${isVisible ? 'animate-in' : ''}`}>
      <div className="recycle-header">
        <h1 className="recycle-title">
          <span className="eco-icon">♻️</span>
          Recycle & Earn Rewards
        </h1>
        <p className="recycle-subtitle">
          Transform your waste into worth. Every item you recycle helps save our planet!
        </p>
      </div>

      <div className="recycle-content">
        <div className="recycle-main">
          <div className="progress-section">
            <EcoCoinsProgress current={ecoCoins} nextMilestone={200} />
          </div>
          
          <div className="form-section">
            {!showImpact ? (
              <RecycleForm onRecycle={handleRecycle} />
            ) : (
              <ImpactStats data={impactData} onBack={() => setShowImpact(false)} />
            )}
          </div>
        </div>

        <div className="recycle-sidebar">
          <div className="sidebar-card">
            <h3>🌱 Your Impact</h3>
            <div className="impact-summary">
              <div className="impact-item">
                <span className="impact-number">{ecoCoins}</span>
                <span className="impact-label">EcoCoins Earned</span>
              </div>
              <div className="impact-item">
                <span className="impact-number">{(ecoCoins * 0.5).toFixed(1)}kg</span>
                <span className="impact-label">CO₂ Saved</span>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>�� Achievements</h3>
            <div className="achievements-list">
              <div className="achievement-item">
                <span className="achievement-icon">🌿</span>
                <span>First Recycle</span>
              </div>
              <div className="achievement-item">
                <span className="achievement-icon">🌍</span>
                <span>Eco Warrior</span>
              </div>
              <div className="achievement-item locked">
                <span className="achievement-icon">👑</span>
                <span>Recycling Master</span>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>📊 Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <span className="stat-number">15</span>
                <span className="stat-label">Items Recycled</span>
              </div>
              <div className="stat-box">
                <span className="stat-number">7.5kg</span>
                <span className="stat-label">Waste Diverted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecyclePage;