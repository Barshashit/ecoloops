import React, { useEffect } from 'react';
import HeroSection from '../HeroSection/HeroSection';
import Banner from '../Banner/Banner';

const Home = () => {
  useEffect(() => {
    console.log("�� Home page rendered");
  }, []);

  return (
    <div>
      <HeroSection />
      <Banner />
      <div style={{ padding: "2rem" }}>
        <h2>Welcome to Ecoloops</h2>
        <p>Search for notebooks, electronics, and bags to see eco-friendly options.</p>
      </div>
    </div>
  );
};

export default Home;