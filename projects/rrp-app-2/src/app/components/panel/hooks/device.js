import { useState } from 'react';

const useDevice = () => {
  const [device, setDevice] = useState({ label: 'demo', ip: '192.168.1.27' });
  
  const setLabel = newLabel => {
    setDevice(device => ({
      ...device,
      ...{ label: newLabel },
    }))
  };

  const setIp = newIp => {
    setDevice(device => ({
      ...device,
      ...{ ip: newIp },
    }))
  };

  return [device, setLabel, setIp];
};

export default useDevice;