import { FC, ReactNode, MouseEvent } from 'react';

// * interfaces
interface ButtonProps {
  type?: 'button' | 'submit';
  children: ReactNode;
  onClick?: Function;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  type = 'button',
  children,
  onClick,
  className = '',
}) => {
  const clickHandler = (e: MouseEvent) => {
    if (type === 'submit') return;
    onClick?.(e);
  };

  return (
    <button type={type} onClick={clickHandler} className={className}>
      {children}
    </button>
  );
};

export default Button;
