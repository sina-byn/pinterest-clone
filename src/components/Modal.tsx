import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

// * interfaces
interface ModalProps {
  children: ReactNode;
  className?: string;
}

const Modal: FC<ModalProps> = ({ children, className = '' }) => {
  return createPortal(
    <div
      className={`
        modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 overflow-hidden
        ${className}
      `}
    >
      {children}
    </div>,
    document.getElementById('modal')!
  );
};

export default Modal;
