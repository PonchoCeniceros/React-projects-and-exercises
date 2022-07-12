import toast from 'react-hot-toast';

const successToast = banner =>
  toast(banner, {
    icon: '✅',
    style: {
      fontFamily: 'sans-serif',
      border: '1px solid #7A7A7B',
      background: '#636364',
      color: '#FFFFFF',
      borderRadius: '5px',
      fontSize: '15px',
    },
  });

const failToast = banner =>
  toast(banner, {
    icon: '❌',
    style: {
      fontFamily: 'sans-serif',
      border: '1px solid #7A7A7B',
      background: '#636364',
      color: '#FFFFFF',
      borderRadius: '5px',
      fontSize: '15px',
    },
  });

const warningToast = banner =>
  toast(banner, {
    icon: '⚠️',
    style: {
      fontFamily: 'sans-serif',
      border: '1px solid #7A7A7B',
      background: '#636364',
      color: '#FFFFFF',
      borderRadius: '5px',
      fontSize: '15px',
    },
  });

export {successToast, warningToast, failToast};
