import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="center">
      <p>&copy; Slick&apos;s Slices {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
