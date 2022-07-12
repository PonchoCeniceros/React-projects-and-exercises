// react utilities
import React, { useContext, useState } from "react";
import useProcess from "./hooks/process";
import { useIPC as _useIPC } from "hooks/ipc";
import { useModal as _useModal } from "hooks/modal";
import { IpcContext } from "contexts/ipc";
// components
import RRPForm from "components/rrpSettings/rrpSettings";
import SignalPanel from "./components/signalPanel/signalPanel";
import Confirmation from "./components/confirmation/confirmation";
import DeviceSettings from "./components/deviceSettings/deviceSettings";
// styled and assets
import { faCube, faGear } from "@fortawesome/free-solid-svg-icons";
import PanelButton from "styled-components/panelButton";
import CardHeader from "styled-components/cardHeader";
// dependencies and utilities
import { deviceSettingsModel } from "models/deviceSettings";
import { successToast, warningToast, failToast } from "utilities/toast";
import { RRPService } from "services/rrp";

const Device = ({
  ip,
  label,
  socket,
  onDelete,
  useIPC = _useIPC,
  useModal = _useModal,
  rrpService = new RRPService(),
}) => {
  const [operationMode, setMode] = useState(deviceSettingsModel.SIMPLIFIED);

  const [isOpen, toggle] = useModal();
  const [isGoingToClose, goingToClose] = useModal();
  const [isSettingsOpen, toggleSettings] = useModal();

  const ipcService = useContext(IpcContext);
  const [process, restart, incrementCount, chargeInfo, captureRRPParams] =
    useProcess();

  useIPC(ipcService, "exsim-api-response", (event, response) => {
    if (response === "S") {
      successToast("Información capturada con éxito");
    } else if (response === "Error en la comunicación con la API") {
      failToast(response);
    } else {
      warningToast(response);
    }
    restart();
  });

  const remove = () => {
    socket.close();
    onDelete(ip);
  };

  const getRrpInfo = (data) => {
    chargeInfo(data);
  };

  const setOperationMode = (mode) => {
    setMode(mode);
  };

  socket.onclose = (event) => {
    /**
     * @todo haberme asegurado que la información y las cuentas
     */
    warningToast("El dispositivo se ha desconectado");
    onDelete(ip);
  };

  socket.onmessage = async (msg) => {
    if (process.ready) {
      const currentCount = process.count + 1;
      incrementCount(currentCount);
      if (currentCount === parseInt(process.params.items)) {
        const rrpParams = {
          ...process.params,
          ...{ end: new Date() },
        };
        captureRRPParams(rrpParams);
        const apiConfigs = JSON.parse(localStorage.getItem("apiSettings"));
        if (apiConfigs === null) {
          failToast(
            "No existen configuraciones para la comunicación con la API"
          );
          restart();
        } else {
          ipcService.send("exsim-api-post", {
            rrp: rrpService.encodeRRP(rrpParams),
            ...apiConfigs,
          });
        }
      }
    }
  };

  return (
    <div className="p-4">
      <div className="w-full h-30 rounded shadow-lg">
        <div className="w-full">
          <CardHeader icon={faCube} label={label} remove={goingToClose} />
          <div className="flex flex-wrap">
            <div className="w-full bg-[#215E9B] text-white">
              <h6 className="pb-1 pl-8 text-xs">
                dirección ip: <b>{ip}</b>
              </h6>
            </div>
            <div className="w-full h-3"></div>
            <SignalPanel mode={operationMode} processOne={process} />

            <div className="w-3/4 flex flex-row bg-[#EEEEF0]">
              <div className="pt-1 pl-1.5 text-xs scale-75">
                <PanelButton icon={faGear} event={toggleSettings} />
              </div>
              <h6 className="pt-2 p-1 text-xs">
                modo de operación:{" "}
                <b>
                  {operationMode === deviceSettingsModel.SIMPLIFIED
                    ? "simplificado"
                    : "individual"}
                </b>
              </h6>
            </div>
            <div className="w-1/4 bg-[#EEEEF0]">
              <div className="w-11/12">
                <button
                  className="bg-[#215E9B] text-white w-full text-center px-4 my-1 rounded text-sm"
                  onClick={toggle}
                >
                  {process.banner}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeviceSettings
        isOpen={isSettingsOpen}
        hide={toggleSettings}
        onSubmit={setOperationMode}
      />
      <Confirmation
        label={label}
        isOpen={isGoingToClose}
        hide={goingToClose}
        close={remove}
      />
      <RRPForm isOpen={isOpen} hide={toggle} onSubmit={getRrpInfo} />
    </div>
  );
};

export default Device;
