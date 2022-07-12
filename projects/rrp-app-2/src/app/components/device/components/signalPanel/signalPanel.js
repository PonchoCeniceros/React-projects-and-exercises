import useActivate from "./hooks/activate";
import { deviceSettingsModel } from "models/deviceSettings";
import { useEffect } from "react";

const SignalPanel = ({ mode, processOne, processTwo }) => {
  const [isActive, handleClick] = useActivate();

  return (
    <div className="w-full">
      <ul className="flex flex-wrap text-xs text-center border-b border-[#EEEEF0]">
        <li className="">
          <button
            style={{
              backgroundColor: isActive.signalOne ? "#EEEEF0" : "#D2D3D2",
            }}
            className="inline-block text-xs p-1 px-1.5 bg-[#EEEEF0] hover:bg-[#A3A3A3] rounded-t-lg"
            onClick={() => handleClick("signalOne")}
          >
            {mode === deviceSettingsModel.SIMPLIFIED ? "entradas" : "entrada 1"}
          </button>
        </li>
        <li className="">
          <button
            disabled={mode === deviceSettingsModel.SIMPLIFIED}
            style={{
              display: mode === deviceSettingsModel.SIMPLIFIED ? "none" : "",
              backgroundColor: isActive.signalTwo ? "#EEEEF0" : "#D2D3D2",
            }}
            className="inline-block text-xs p-1 px-1.5 bg-[#EEEEF0] hover:bg-[#A3A3A3] rounded-t-lg"
            onClick={() => handleClick("signalTwo")}
          >
            entrada 2
          </button>
        </li>
      </ul>
      <div className="w-full h-2 bg-[#EEEEF0]"></div>
      {isActive.signalOne && (
        <div className="bg-[#EEEEF0] flex flex-wrap">
          <div className="w-3/4"><h6 className="pl-4 text-sm"><b>{processOne.status}</b></h6></div>
          <div className="w-1/4">{
            processOne.status === "conectado"
            ? <h6 className="pl-4 text-xs">sin número de trabajo</h6>
            : <h6 className="pl-4 text-xs">número de trabajo: <b>{processOne.params.workId}</b></h6>
            }
          </div>
          <div className="w-3/4"></div>
          <div className="w-1/4">{
            processOne.status === "conectado"
            ? <h6 className="pl-4 text-xs text-[#EEEEF0]">x</h6>
            : <h6 className="pl-4 text-xs">piezas a contabilizar: <b>{processOne.params.items}</b></h6>
            }
          </div>
        </div>
      )}
      {isActive.signalTwo && (
        <div className="bg-[#EEEEF0] flex flex-wrap">
          <div className="w-3/4"><h6 className="pl-4 text-sm"><b>{processOne.status}</b></h6></div>
          <div className="w-1/4">{
            processOne.status === "conectado"
            ? <h6 className="pl-4 text-xs">sin número de trabajo</h6>
            : <h6 className="pl-4 text-xs">número de trabajo: <b>{processOne.params.workId}</b></h6>
            }
          </div>
          <div className="w-3/4"></div>
          <div className="w-1/4">{
            processOne.status === "conectado"
            ? <h6 className="pl-4 text-xs text-[#EEEEF0]">x</h6>
            : <h6 className="pl-4 text-xs">piezas a contabilizar: <b>{processOne.params.items}</b></h6>
            }
          </div>
        </div>
      )}
      <div className="w-full h-2 bg-[#EEEEF0]"></div>
    </div>
  );
};

export default SignalPanel;
