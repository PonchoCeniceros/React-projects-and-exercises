import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CloseButton = ({event}) => {
  return (
    <button onClick={event}>
        <FontAwesomeIcon className='ml-auto mr-auto text-xl pr-2 text-white' icon={faXmark} />
    </button>
  );
};

export default CloseButton;