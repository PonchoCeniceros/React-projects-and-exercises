import { useState } from "react";

const useActivate = () => {
  const [isActive, active] = useState({
    signalOne: true,
    signalTwo: false,
  });

  const handleClick = (button) => {
    switch (button) {
      
        case "signalOne":
        active((isActive) => ({
          ...isActive,
          ...{
            signalOne: true,
            signalTwo: false,
          },
        }));
        break;
      
        case "signalTwo":
        active((isActive) => ({
          ...isActive,
          ...{
            signalOne: false,
            signalTwo: true,
          },
        }));
        break;
    }
  };

  return [isActive, handleClick];
};

export default useActivate;