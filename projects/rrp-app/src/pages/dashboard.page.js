import React, {useState} from 'react';
import Device from 'components/device.component';
import Panel from 'components/panel.component';
import 'assets/pages/dashboard.page.css';
import {Toaster} from 'react-hot-toast';
import {isIpAlready} from 'services/utils/validations.utils';
import {failToast, successToast} from 'services/utils/toasts.utils';

const Dashboard = () => {
  /**
   * Hooks
   */
  const [devices, setDevice] = useState([]);

  /**
   * métodos del componente
   */
  const addingCard = (device, socket) => {
    if (isIpAlready(device.ip, devices)) {
    failToast('el dispositivo ya está conectado');
    } else {
      setDevice([
        ...devices,
        /* @todo implementar Fragments */
        <Device
          ip={device.ip}
          label={device.label}
          socket={socket}
          onDelete={deleteCard}
        />,
      ]);
      successToast('conexión establecida con el dispositivo');
    }
  };

  const deleteCard = ip => {
    setDevice(
      devices.filter(device => device.props.ip !== ip)
    );
  };

  /**
   * componente a renderizar
   */
  return (
    <div className="dashboard-base">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="dashboard-header">
        <div className="dashboard-banner">
          <h3>Generador de registros rápidos de producción</h3>
        </div>
        </div>
      <div className="dashboard-container">
        <div className="dashboard-panel" />
        <Panel onSubmit={addingCard} />
        <div className="dashboard-cards">
          {devices.map((device, idx) => (
            <div key={idx}>{device}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
