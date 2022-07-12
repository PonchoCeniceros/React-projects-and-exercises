import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PanelButton = ({form, event, icon, legend}) => {
  return (
    <button  type="submit" form={form} onClick={event}>
      <span className='flex flex-wrap'>
        <FontAwesomeIcon className='ml-auto mr-auto text-2xl text-[#215E9B]' icon={icon} />
        {/* <img className='ml-auto mr-auto' src={icon} alt='' /> */}
        <h6 className='w-full text-sm pt-1'>{legend}</h6>
      </span>
    </button>
  );
};

export default PanelButton;