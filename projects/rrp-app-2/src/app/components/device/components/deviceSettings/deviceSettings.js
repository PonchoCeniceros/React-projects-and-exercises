// react utilities
import { useState } from "react";
import ReactDOM from "react-dom";
// styled and assets
import "./deviceSettings.css";
import CardHeader from "styled-components/cardHeader";
import { faGear } from "@fortawesome/free-solid-svg-icons";
// dependencies and utilities.
import { successToast } from "utilities/toast";
import { deviceSettingsModel } from "models/deviceSettings";

const DeviceSettings = ({ isOpen, hide, onSubmit }) => {
    const [settings, setSettings] = useState(deviceSettingsModel.SIMPLIFIED);
  
    if (!isOpen) return null;
  
    const onChangeSettings = (event) => {
        setSettings(event.target.value);
    };

  const setDeviceSettings = (event) => {
    successToast("Modo de operación actualizado");
    onSubmit(settings)
    hide();
  };

  return ReactDOM.createPortal(
    <div className="device-settings-wrapper">
      <div className="device-settings-container bg-[#EEEEF0] w-6/12 rounded shadow-2xl">
        <div className="w-full">
          <CardHeader
            icon={faGear}
            label="Modos de configuración"
            remove={hide}
          />
          <div onChange={onChangeSettings}>
            <div className="w-full p-2.5 flex flex-wrap">
              <div className="w-1/4 p-2 text-sm">
                <input type="radio" id="simplified" name="settings" value={deviceSettingsModel.SIMPLIFIED} />
                <label className="pl-1">simplificado</label>
              </div>
              <div className="w-3/4 p-2 text-sm">
                <p>
                  Todas las señales entrantes al dispositivo serán acumuladas
                  como una única cuenta, y sólo habrá un grupo de parámetros de
                  generación de órdenes de producción a configurar.
                </p>
              </div>
              <div className="w-1/4 p-2 text-sm">
                <input type="radio" id="individual" name="settings" value={deviceSettingsModel.INDIVIDUAL} />
                <label className="pl-1">individual</label>
              </div>
              <div className="w-3/4 p-2 text-sm">
                <p>
                  El dispositivo realiza cuentas separadas a través de sus
                  entradas. Cada señal será acumulada de manera de manera
                  independiente y tendrá sus propios parámetros para la
                  generación de órdenes de producción independientes
                </p>
              </div>
              <div className="w-full p-3"></div>
              <div className="w-3/4 p-1"></div>
              <div className="w-1/4 py-1 flex">
                <div className="w-11/12 pt-2 ml-auto mr-auto">
                  <button
                    className="bg-[#215E9B] text-white w-full text-center px-4 my-1 rounded text-sm"
                    onClick={setDeviceSettings}
                  >
                    aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeviceSettings;
