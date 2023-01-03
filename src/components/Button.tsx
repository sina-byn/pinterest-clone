import { FC, ReactNode, MouseEvent } from 'react';

// * interfaces
interface ButtonProps {
  type?: 'button' | 'submit';
  children: ReactNode;
  onClick?: Function;
}

const Button: FC<ButtonProps> = ({ type = 'button', children, onClick }) => {
  const clickHandler = (e: MouseEvent) => {
    if (type === 'submit') return;
    onClick?.(e);
  };

  return (
    <button type={type} onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
