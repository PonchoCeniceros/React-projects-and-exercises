// react utilities
import ReactDOM from "react-dom";
// styled and assets
import "./confirmation.css";
import CloseButton from "styled-components/closeButton";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Confirmation = ({ label, isOpen, close, hide }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="confirmation-wrapper">
      <div className="confirmation-container">
        <div className="w-full">
          <div className="bg-[#215E9B] flex flex-row rounded-t pt-1">
            <div className="flex flex-wrap w-full">
              <FontAwesomeIcon className="text-white p-2" icon={faWarning} />
              <h6 className="pt-1 text-white">
                <b>Desconectar dispositivo</b>
              </h6>
            </div>
            <div className="w-8 flex flex-col items-center justify-center">
              <CloseButton event={hide} />
            </div>
          </div>

          <div className="flex flex-wrap p-2.5 rounded">
            <div className="w-full flex h-12">
              <h1 className="ml-auto mr-auto flex items-center justify-center text-center">
                  ¿deseas desvincular el dispositivo {label}?
              </h1>
            </div>

            <div className="w-2/4 py-1.5 flex">
              <div className="w-11/12 pt-2 ml-auto mr-auto">
                <button
                  className="bg-[#A3A3A3] w-full text-center px-4 my-1 rounded text-sm"
                  onClick={hide}
                >
                  cancelar
                </button>
              </div>
            </div>
            <div className="w-2/4 py-1.5 flex">
              <div className="w-11/12 pt-2 ml-auto mr-auto">
                <button
                  className="bg-[#215E9B] text-white w-full text-center px-4 my-1 rounded text-sm"
                  onClick={close}
                >
                  aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Confirmation;
