import React from "react";
import "./Recycle.css";

const EcoCoinsProgress = ({ current, nextMilestone }) => {
  const percent = Math.min(100, Math.round((current / nextMilestone) * 100));
  return (
    <div className="eco-progress-card">
      <div className="eco-progress-header">
        <span className="eco-progress-title">EcoCoins Progress</span>
        <span className="eco-progress-badge">🏅 Next: {nextMilestone}</span>
      </div>
      <div className="eco-progress-bar-modern">
        <div
          className="eco-progress-bar-modern-fill"
          style={{ width: `${percent}%` }}
        >
          <span className="eco-progress-bar-label">
            <span role="img" aria-label="coin">🪙</span> {current}
          </span>
        </div>
      </div>
      <div className="eco-progress-footer">
        <span className="eco-progress-percent">{percent}%</span>
        <span className="eco-progress-next">{nextMilestone - current} EcoCoins to next reward</span>
      </div>
    </div>
  );
};

export default EcoCoinsProgress; 