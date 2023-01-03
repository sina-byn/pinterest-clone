import { FC, ReactNode, Dispatch, SetStateAction } from 'react';

// * interfaces
interface ChipsProps {
  type?: 'normal' | 'deletable';
  title: string;
  tags?: string[];
  setTags?: Dispatch<SetStateAction<string[]>>;
}

const Chips: FC<ChipsProps> = ({
  type = 'normal',
  title,
  tags = [],
  setTags,
}) => {
  const deleteHandler = () =>
    setTags!(prev => {
      const idx = prev.indexOf(title);
      prev.splice(idx, 1);
      return prev.slice();
    });

  return (
    <div className='chips flex items-center bg-neutral text-sm text-gray-500 border border-gray-300 rounded-full px-2 pb-0.5'>
      {title}
      {type === 'deletable' && tags.length > 1 && (
        <i
          onClick={deleteHandler}
          className='fa-solid fa-close fa-xs cursor-pointer hover:text-pinterest mt-1 ml-2'
        />
      )}
    </div>
  );
};

export default Chips;
