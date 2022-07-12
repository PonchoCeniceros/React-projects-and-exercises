import { useState } from "react";

const useAPISettings = () => {
  const [apiSettings, setApiSettings] = useState({
    ip: "",
    port: "",
    database: "",
    token: "",
  });

  const loadSettings = (configs) => {
    if (configs) {
      setApiSettings((apiSettings) => ({
        ...apiSettings,
        ...{
          ip: configs.ip,
          port: configs.port,
          database: configs.database,
          token: configs.token,
        },
      }));
    }
  };

  const setIp = (ip) => {
    setApiSettings((apiSettings) => ({
      ...apiSettings,
      ...{ ip: ip },
    }));
  };

  const setPort = (port) => {
    setApiSettings((apiSettings) => ({
      ...apiSettings,
      ...{ port: port },
    }));
  };

  const setDatabase = (database) => {
    setApiSettings((apiSettings) => ({
      ...apiSettings,
      ...{ database: database },
    }));
  };

  const setToken = (token) => {
    setApiSettings((apiSettings) => ({
      ...apiSettings,
      ...{ token: token },
    }));
  };

  return [apiSettings, loadSettings, setIp, setPort, setDatabase, setToken];
};

export default useAPISettings;