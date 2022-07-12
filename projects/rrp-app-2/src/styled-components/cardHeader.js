import React from "react";
import CloseButton from "styled-components/closeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// #191F26

const CardHeader = ({icon, label, remove}) => {
  return (
    <div className="bg-[#215E9B] flex flex-row rounded-t pt-1">
      <div className="flex flex-wrap w-full">
        <FontAwesomeIcon className="text-white p-2" icon={icon} />
        <h6 className="pt-1 text-white">
          <b>{label}</b>
        </h6>
      </div>
      <div className="w-8 flex flex-col items-center justify-center">
        <CloseButton event={remove} />
      </div>
    </div>
  );
};

export default CardHeader;
