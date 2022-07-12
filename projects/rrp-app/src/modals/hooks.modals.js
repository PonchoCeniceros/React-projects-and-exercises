import {useState} from 'react';

const useModal = () => {
  /**
   * Hooks internos y métodos asociados
   */
  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // retornar custom Hook
  return {
    isOpen,
    toggle,
  };
};

export default useModal;
