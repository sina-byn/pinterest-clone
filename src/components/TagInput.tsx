import {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
  MouseEvent,
  FormEvent,
} from 'react';

// * components
import Button from './Button';

// * interfaces
interface TagInputProps {
  setTags: Dispatch<SetStateAction<string[]>>;
}

const TagInput: FC<TagInputProps> = ({ setTags }) => {
  const [value, setValue] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(false);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    value.length > 0 ? setExpanded(true) : setExpanded(false);
  };

  const tagAddHandler = (e: FormEvent) => {
    e.preventDefault();
    setTags(prev => Array.from(new Set(prev.concat([value]))));
    setValue('');
    setExpanded(false);
  };

  const expandHandler = (e: MouseEvent) => {
    if (value.length) return;
    switch (e.type) {
      case 'mouseleave':
        return setExpanded(false);
      case 'mouseover':
        return setExpanded(true);
    }
  };

  return (
    <form
      onSubmit={tagAddHandler}
      onMouseOver={expandHandler}
      onMouseLeave={expandHandler}
      className='tag-input h-6 flex items-center bg-neutral text-xs text-gray-500 border border-gray-300 rounded-full px-2'
    >
      <input
        type='text'
        value={value}
        onChange={changeHandler}
        className={`
            bg-inherit outline-0 focus:w-20
            ${expanded ? 'w-20 pr-2' : 'w-0'}
        `}
      />
      <Button type='submit'>
        <i className='fa-solid fa-plus fa-xs hover:text-pinterest cursor-pointer' />
      </Button>
    </form>
  );
};

export default TagInput;
