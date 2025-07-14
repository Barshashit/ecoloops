import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner-container">

      {/* Top row with 3 columns */}
      <div className="banner-top-row">
        {/* Left Column */}
        <div className="banner-column side-column">
          <img src="/images/img1.png" alt="img1" />
           <img src="/images/hero.img.png" alt="hero" />
        </div>

        {/* Middle Column (Hero) */}
        <div className="banner-column middle-column">
          <img src="/images/img2.png" alt="img2" />
         
          
        </div>

        {/* Right Column */}
        <div className="banner-column side-column">
          <img src="/images/img5.png" alt="img5" />
          <img src="/images/img6.png" alt="img6" />
        </div>
      </div>

      {/* Bottom row with 4 images horizontally */}
      <div className="banner-bottom-row">
        <img src="/images/img3.png" alt="img3" />
        <img src="/images/img4.png" alt="img4" />
        <img src="/images/img7.png" alt="img7" />
        <img src="/images/img8.png" alt="img8" />
      </div>

    </div>
  );
};

export default Banner;
