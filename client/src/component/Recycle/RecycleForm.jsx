import React, { useState, useRef } from "react";
import "./Recycle.css";

const ITEM_TYPES = ["Bag", "Bottle", "Notebook", "Shoes", "Box", "Pen", "Paper"];
const CONDITIONS = ["New", "Old", "Damaged"];

const RecycleForm = ({ onRecycle }) => {
  const [item, setItem] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [condition, setCondition] = useState("");
  const [date, setDate] = useState("");
  const [pickup, setPickup] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef();
  const [dragActive, setDragActive] = useState(false);

  // Autocomplete logic
  const filteredItems = item
    ? ITEM_TYPES.filter((type) => type.toLowerCase().includes(item.toLowerCase()))
    : [];

  // Photo upload logic
  const handlePhoto = (file) => {
    setPhoto(file);
    if (file) setPhotoURL(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handlePhoto(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhoto(e.dataTransfer.files[0]);
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!photo) {
      setError("Please upload a photo of the item to recycle.");
      return;
    }
    setError("");
    // Mock eco coins and impact
    onRecycle({
      item,
      condition,
      date,
      pickup,
      coins: 20,
      impact: "2kg CO₂",
      photo: photoURL,
    });
  };

  return (
    <div className="recycle-form-card">
      <div className="recycle-form-eco-message">
        <span role="img" aria-label="leaf">🌱</span> Help the planet by recycling your item!
      </div>
      <div className="recycle-form-stepper">
        <div className="step active"><span>1</span> Item Details</div>
        <div className="step active"><span>2</span> Photo</div>
        <div className="step active"><span>3</span> Schedule Pickup</div>
      </div>
      <form className="recycle-form redesigned-recycle-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group prominent-group">
          <label className="prominent-label"><span role="img" aria-label="item">👜</span> Item Type</label>
          <div className="search-autocomplete prominent-search">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                setItem(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search or type item (e.g. Bag)"
              required
            />
            {showDropdown && filteredItems.length > 0 && (
              <ul className="autocomplete-dropdown">
                {filteredItems.map((type) => (
                  <li
                    key={type}
                    onClick={() => {
                      setItem(type);
                      setShowDropdown(false);
                    }}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-helper">Select the item you want to recycle.</div>
        </div>
        <div className="form-group prominent-group">
          <label className="prominent-label required-label"><span role="img" aria-label="camera">📷</span> Upload Photo <span className="required-star">*</span></label>
          <div
            className={`photo-dropzone${dragActive ? " drag-active" : ""}`}
            onClick={() => fileInputRef.current.click()}
            onDragOver={e => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
            onDrop={handleDrop}
          >
            {!photoURL ? (
              <div className="dropzone-content">
                <span className="dropzone-icon">📷</span>
                <span>Drag & drop or click to upload</span>
              </div>
            ) : (
              <img src={photoURL} alt="preview" className="photo-preview prominent-photo" />
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="form-helper">Upload a clear photo of your item.</div>
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="form-group">
          <label><span role="img" aria-label="condition">📝</span> Condition</label>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="">Select condition</option>
            {CONDITIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="form-helper">Is your item new, old, or damaged?</div>
        </div>
        <div className="form-group">
          <label><span role="img" aria-label="calendar">📅</span> Date of Purchase</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <div className="form-helper">When did you buy this item?</div>
        </div>
        <div className="form-group">
          <label><span role="img" aria-label="clock">⏰</span> Pickup Date & Time</label>
          <input
            type="datetime-local"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
          <div className="form-helper">Choose a convenient pickup slot.</div>
        </div>
        <button className="recycle-submit-btn big-recycle-btn" type="submit">
          🌱 Recycle Now
        </button>
      </form>
    </div>
  );
};

export default RecycleForm; 