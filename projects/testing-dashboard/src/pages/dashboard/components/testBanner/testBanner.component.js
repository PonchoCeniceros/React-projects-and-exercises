import React from 'react';

const TestBanner = ({name, flag}) => {
  return (
    <div className="flex flex-row-reverse py-2 px-5">
      <div className="border-2 border-white border-b-[#A3A3A3] flex items-center w-full"><h1>{name}</h1></div>
      <div className="px-2">
        <img src={flag} alt="" />
      </div>
    </div>
  );
};

export default TestBanner;