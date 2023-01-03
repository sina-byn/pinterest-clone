import { FC, useContext } from 'react';

// * context
import { ModalCtx } from '../context/ModalContextProvider';

// * DUMMY_DATA
import placeholder from '../data/placeholder.json';

// * components
import Modal from './Modal';
import LikeButton from './LikeButton';
import Chips from './Chips';

const ImageModal: FC = () => {
  const { modalData, setModalData } = useContext(ModalCtx)!;
  const { image, open, likes, alt_description, description, tags } = modalData;
  const { username, name, profile_image, links } = modalData.user;
  const closeHandler = () => setModalData(prev => ({ ...prev, open: false }));

  return open ? (
    <Modal className='flex flex-col sm:flex-row justify-between rounded-3xl bg-white w-10/12 sm:w-[95%] md:w-3/4 lg:w-1/2 h-[90vh] sm:h-[60vh]'>
      <div className='img-container flex sm:w-fit sm:max-w-[50%] h-1/2 sm:h-full'>
        <img
          src={image}
          alt={alt_description}
          className='h-full w-full object-contain object-center sm:object-left'
        />
      </div>
      <div className='image-data flex-1 grid grid-rows-[auto,_1fr,_25px,_auto] gap-4 h-1/2 sm:h-full p-6'>
        <div className='user-profile flex justify-between gap-x-2'>
          <img
            alt={username}
            src={profile_image.large}
            className='w-16 h-16 rounded-full'
          />
          <div className='user-info grow flex flex-col'>
            <span className='name truncate font-medium'>{name}</span>
            <a
              target='_blank'
              href={links.html}
              rel='noopener noreferrer'
              className='username text-xs hover:underline'
            >
              @{username}
            </a>
          </div>
          <i
            onClick={closeHandler}
            className='fa-solid fa-close fa-lg hover:text-pinterest cursor-pointer mt-2'
          />
        </div>
        <p className='description h-full overflow-y-auto'>
          {description || placeholder}
        </p>
        <LikeButton likes={likes} />
        <div className='tags flex flex-wrap items-center gap-x-4 gap-y-2'>
          {tags.map(tag => (
            <Chips key={tag.title} title={tag.title} />
          ))}
        </div>
      </div>
    </Modal>
  ) : null;
};

export default ImageModal;
