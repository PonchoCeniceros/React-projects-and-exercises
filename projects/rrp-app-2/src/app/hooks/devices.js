import { useState } from "react";
import { isIpAlready } from "utilities/validation";
import Device from "app/components/device/device";
import { useModal } from "hooks/modal";

const useDevices = () => {
  const [devices, setDevice] = useState([]);

  const deleteCard = (ip) => {
    setDevice(devices.filter((device) => device.props.ip !== ip));
  };

  const addDevice = (device, socket) => {
    if (isIpAlready(device.ip, devices)) {
      return false;
    } else {
      setDevice([
        ...devices,
        /* @todo implementar Fragments */
        <Device
          ip={device.ip}
          label={device.label}
          socket={socket}
          useModal={useModal}
          onDelete={deleteCard}
        />,
      ]);
      return true;
    }
  };

  return { devices, addDevice };
};

export default useDevices;