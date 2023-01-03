import { FC, useContext } from 'react';

// * context
import { ModalCtx } from '../context/ModalContextProvider';

// * components
import Button from './Button';

// * interfaces
import type { Image } from '../interfaces/interfaces';

interface ExpandButtonProps {
  image: Image;
}

const ExpandButton: FC<ExpandButtonProps> = ({ image }) => {
  const { setModalData } = useContext(ModalCtx)!;

  const { likes, description, alt_description, tags } = image;
  const { regular: img_url } = image.urls;
  const { username, name, profile_image } = image.user;
  const links = image.user.links;

  const expandHandler = () =>
    setModalData!({
      image: img_url,
      open: true,
      likes,
      description,
      alt_description,
      tags,
      user: {
        username,
        name,
        links,
        profile_image,
      },
    });

  return (
    <Button onClick={expandHandler} className='bg-pinterest w-6 h-6 rounded-full' >
      <i className='fa-solid fa-expand fa-sm -ml-[0.05rem]' />
    </Button>
  );
};

export default ExpandButton;
