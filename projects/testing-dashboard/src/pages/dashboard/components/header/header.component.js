import React from 'react';
import imLogo from './assets/imLogo.png';

const Header = () => {
  return (
    <div className="bg-[#2A3E59] flex flex-row-reverse">
      <div className="py-0.5 px-0.5 scale-50">
        <img src={imLogo} alt="" />
      </div>
    </div>
  );
};

export default Header;
