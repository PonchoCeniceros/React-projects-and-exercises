import {useState} from 'react';

const useLoadingSpinner = () => {
  const [isActive, changeState] = useState(false);
  const loading = () => changeState(true);
  const processDone = () => changeState(false);

  return [isActive, loading, processDone];
};

export { useLoadingSpinner };