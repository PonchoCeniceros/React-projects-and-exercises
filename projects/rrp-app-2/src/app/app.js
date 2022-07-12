// react utilities
import React from "react";
import useDevices from "./hooks/devices";
import { useModal } from "hooks/modal";
import { useLoadingSpinner } from "hooks/loadingSpinner";
// components
import Panel from "./components/panel/panel";
// styled and assets
import Header from "styled-components/header";
import logo from 'assets/img/logo.png';
// dependencies and utilities
import { Toaster } from "react-hot-toast";
import { failToast, successToast } from "utilities/toast";


const App = () => {
  const { devices, addDevice } = useDevices();

  const addingDevice = (device, socket) => {
    if (addDevice(device, socket))
      successToast("conexión establecida con el dispositivo");
    else failToast("el dispositivo ya está conectado");
  };

  return (
    <div className="flex flex-col h-screen">
      <Toaster position="bottom-right" reverseOrder={false} />
      <header>
        <Header logo={logo}/>
      </header>
      <main className="bg-[#EEEEF0] h-full mb-auto flex">
        <div className="w-3/12 flex">
          <Panel
            onSubmit={addingDevice}
            useModal={useModal}
            useLoadingSpinner={useLoadingSpinner}
          />
        </div>
        <div className="bg-[#EEEEF0] w-9/12 flex">
          <div className="bg-white ml-2 mt-10 w-full rounded overflow-y-scroll">
            {devices.map((device, idx) => (<div key={idx}>{device}</div>))}
          </div>
        </div>
      </main>
      <footer />
    </div>
  );
};

export default App;
