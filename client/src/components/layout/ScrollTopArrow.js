import React, { useState } from 'react';
import './arrowMobileStyling.css';

const ScrollTopArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop);

  return (
    <i className="fas fa-arrow-circle-up scrollTop fa-4x piss-off-arrow" onClick={scrollTop} style={{ display: showScroll ? 'flex' : 'none' }} />
  );
};

export default ScrollTopArrow;
