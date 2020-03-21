import React from 'react';
import close from '../Assets/x.png';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        <div className='modal-header'>
          <h1>Update Post</h1>
          <img
            src={close}
            className='close-modal'
            onClick={handleClose}
            alt='close'
          />
        </div>
        {children}
      </section>
    </div>
  );
};

export default Modal;
