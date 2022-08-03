import React, { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { VscChromeClose } from "react-icons/vsc";
import "./styles.scss";

const Modal = (props) => {

  const {
    children,
    title = "",
    close = null,
  } = props;


  const [containerToLoad, setContainerToLoad] = useState(null);

  useEffect(() => {
    setContainerToLoad(document.getElementById('modal'));
  }, []);

  return containerToLoad && createPortal(
    <div
      className='modalBackdrop show '
    >
      <div
        className='modalStart small'
      >
        <div className='header'>
          <div className='header_title'>{title}</div>
          <div className='header_close' onClick={close}>
            <VscChromeClose />
          </div>
        </div>
        {children}
      </div>
    </div>,
    containerToLoad
  )

};

export default memo(Modal);
