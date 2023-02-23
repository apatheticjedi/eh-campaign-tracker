import React from 'react';


const Footer = () => {
  return (
    <footer id="main-footer">
      <div className="text-center footer-div">
        &copy;{new Date().getFullYear()} by David Lundt
      </div>
    </footer>
  );
};

export default Footer;