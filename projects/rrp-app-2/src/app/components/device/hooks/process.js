import { useState } from "react";

const useProcess = () => {
  const [process, update] = useState({
    ready: false,
    status: "conectado",
    banner: "iniciar proceso",
    params: {},
    count: 0,
  });

  const restart = () => {
    update((process) => ({
      ...process,
      ...{ count: 0, status: "en proceso..." },
    }));
  };

  const incrementCount = (currentCount) => {
    update((process) =>
      currentCount === 1
        ? {
            ...process,
            ...{
              count: currentCount,
              status: "1 pieza contabilizada",
              params: { ...process.params, ...{ start: new Date() } },
            },
          }
        : {
            ...process,
            ...{
              count: currentCount,
              status: `${currentCount} piezas contabilizadas`,
            },
          }
    );
  };

  const chargeInfo = (data) => {
    update((process) => ({
      ...process,
      ...{
        count: 0,
        ready: true,
        status: "en proceso...",
        banner: "nuevo proceso",
        params: { ...data, orderDate: new Date() },
      },
    }));
  };

  const captureRRPParams = (rrpParams) => {
    update((process) => ({
      ...process,
      ...{
        status: "capturando datos...",
        params: { ...process.params, ...rrpParams },
      },
    }));
  };

  return [process, restart, incrementCount, chargeInfo, captureRRPParams];
};

export default useProcess;