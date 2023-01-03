import { FC, ReactNode } from 'react';

// * interfaces
interface OverlayProps {
  children: ReactNode;
  className?: string;
}

const Overlay: FC<OverlayProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`
        w-full h-full absolute inset-0 bg-black/50 z-10 opacity-0 hover:opacity-100
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Overlay;
