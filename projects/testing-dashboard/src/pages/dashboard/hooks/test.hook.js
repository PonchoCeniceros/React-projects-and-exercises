import {useState} from 'react';
import inactive from './assets/inactive.png';   // eslint-disable-line
import ok from './assets/ok.png';               // eslint-disable-line
import fail from './assets/fail.png';           // eslint-disable-line
import inProcess from './assets/inProcess.png'; // eslint-disable-line

const useTests = _ => {
  const initialState = {
    test1: {name: 'Quectel', flag: inactive},
    test2: {name: 'Sensores', flag: inactive},
    test3: {name: 'UART', flag: inactive},
    test4: {name: 'I²C', flag: inactive},
    test5: {name: 'Voltaje en batería', flag: inactive},
    test6: {name: 'Pantalla LCD', flag: inactive},
  };
  const [tests, updateTest] = useState(initialState); // eslint-disable-line
  
  const initFlags = tests => ({
    ...tests,
    ...{
      test1: {...tests.test1, ...{flag: inProcess}},
      test2: {...tests.test2, ...{flag: inProcess}},
      test3: {...tests.test3, ...{flag: inProcess}},
      test4: {...tests.test4, ...{flag: inProcess}},
      test5: {...tests.test5, ...{flag: inProcess}},
      test6: {...tests.test6, ...{flag: inProcess}},
    },
  });

  const passTest = test => {
    switch (test) {
      case 'test1':
        return tests => ({
          ...tests,
          ...{test1: {...tests.test1, ...{flag: ok}}},
        });

      case 'test2':
        return tests => ({
          ...tests,
          ...{test2: {...tests.test2, ...{flag: ok}}},
        });

      case 'test3':
        return tests => ({
          ...tests,
          ...{test3: {...tests.test3, ...{flag: ok}}},
        });

      case 'test4':
        return tests => ({
          ...tests,
          ...{test4: {...tests.test4, ...{flag: ok}}},
        });

      case 'test5':
        return tests => ({
          ...tests,
          ...{test5: {...tests.test5, ...{flag: ok}}},
        });

      case 'test6':
        return tests => ({
          ...tests,
          ...{test6: {...tests.test6, ...{flag: ok}}},
        });

      default:
        return tests;
    } 
  };
  
  
  

  return [tests, updateTest, {initFlags, passTest}];
};

export default useTests;