import React, { useEffect, useState } from 'react';
import { FaAngleUp } from 'react-icons/fa';
import backGround from "../images/Background.jpg"

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        display: isVisible ? 'block' : 'none',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: "slategrey",
        borderRadius : "50px"
      }}
    >
      <FaAngleUp size={40} color='white'/>
    </button>
  );
}

export default ScrollToTopButton;
