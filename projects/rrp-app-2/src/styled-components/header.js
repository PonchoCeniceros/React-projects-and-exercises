import React from 'react';

// #191F26

const Header = ({logo}) => {
  return (
    <div className="bg-[#215E9B] flex flex-row-reverse">
      <div className="py-2 px-5">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default Header;