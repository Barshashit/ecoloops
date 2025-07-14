import React from "react";
import "./Recycle.css";

const ImpactStats = ({ data, onBack }) => {
  if (!data) return null;
  return (
    <div className="impact-stats-card redesigned-impact-card">
      <div className="impact-header">
        <h3> Product Recycling!</h3>
        <div className="eco-coins-earned big-coins">
          +{data.coins} <span role="img" aria-label="EcoCoins">🪙<h3>On your way!</h3></span>
        </div>
      </div>
      <div className="impact-main-row">
        <div className="impact-main-details">
          <div className="impact-detail-row">
            <span className="impact-label">Pickup Scheduled:</span>
            <span className="impact-value">{data.pickup ? new Date(data.pickup).toLocaleString() : "-"}</span>
          </div>
          <div className="impact-detail-row">
            <span className="impact-label">Environmental Impact:</span>
            <span className="impact-value highlight-green">{data.impact}</span>
          </div>
          <div className="impact-detail-row">
            <span className="impact-label">Item:</span> <span className="impact-value">{data.item}</span>
            <span className="impact-label">Condition:</span> <span className="impact-value">{data.condition}</span>
          </div>
        </div>
        {data.photo && (
          <div className="impact-photo-box">
            <img src={data.photo} alt="item recycled" />
            <div className="photo-caption">Your Item</div>
          </div>
        )}
      </div>
      <div className="impact-stats-actions">
        <button className="share-btn" type="button" title="Share (UI only)">Share</button>
        <button className="back-btn" type="button" onClick={onBack}>Recycle Another Item</button>
        <button className="back-btn" type="button"  onClick={() => window.location.href = "/success/success.html"} >Confirm Recycle</button>
      </div>
    </div>
  );
};

export default ImpactStats; 