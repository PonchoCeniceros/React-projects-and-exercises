// react utilities
import React from "react";
import useDevice from "./hooks/device";
import { useModal as _useModal } from "hooks/modal";
import { useLoadingSpinner as _useLoadingSpinner } from "hooks/loadingSpinner";
// components
import APISettings from "components/apiSettings/apiSettings";
// styled and assets
import PanelButton from "styled-components/panelButton";
import LoadingSpinner from "styled-components/loadingSpinner/loadingSpinner";
// dependencies and utilities
import { isValidAddress } from "utilities/validation";
import { failToast } from "utilities/toast";
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { faCubes } from '@fortawesome/free-solid-svg-icons';

const Panel = ({
  onSubmit,
  useModal = _useModal,
  useLoadingSpinner = _useLoadingSpinner,
}) => {
  const [isActive, loading, processDone] = useLoadingSpinner();
  const [isOpen, toggle] = useModal();
  const [device, setLabel, setIp] = useDevice();

  const validateDeviceFields = async event => {
    event.preventDefault();
    if (device.ip === "" || device.label === "" || !isValidAddress(device.ip)) {
      failToast("Los campos ingresados son inválidos");
    } else {
      loading();
      setTimeout(() => {
        const socket = new WebSocket(`ws://${device.ip}:6432`);
        
        socket.onopen = (event) => {
          processDone();
          onSubmit(device, socket);
        };

        socket.onerror = (event) => {
          processDone();
          failToast("Error de conexión con el dispositivo");
        };
      }, 300);
    }
  };

  /**
   * componente a renderizar
   */
  return (
    <div className="flex w-full">
      {isActive ? <LoadingSpinner /> : <span></span>}

      <div className="w-full p-2 my-3">
        <div className="flex flex-wrap">
          <div className="w-1/2 p-1 flex">
            <div className="ml-auto mr-auto">
              <PanelButton
                icon={faCubes}
                legend="añadir dispositivo"
                form="device-form"
              />
            </div>
          </div>
          <div className="w-1/2 p-1 flex">
            <div className="ml-auto mr-auto">
              <PanelButton icon={faGears} event={toggle} legend="configurar API" />
            </div>
          </div>
        </div>
        <form id="device-form" className="my-3" onSubmit={validateDeviceFields}>
          <div className="w-full">
            <input
              type="text"
              className="w-full text-left px-2 my-1 border border-[#A3A3A3] rounded text-xs"
              placeholder="ingresa un identificador para la sesión"
              value={device.label}
              onChange={(event) => setLabel(event.target.value)}
            ></input>
          </div>
          <div className="w-full">
            <input
              type="text"
              className="w-full text-left px-2 my-1 border border-[#A3A3A3] rounded text-xs"
              placeholder="ingresa una dirección ip de tu dispositivo"
              value={device.ip}
              onChange={(event) => setIp(event.target.value)}
            ></input>
          </div>
        </form>
        <APISettings isOpen={isOpen} hide={toggle} />
      </div>
    </div>
  );
};

export default Panel;
