import { FC, useEffect, useRef, useState } from 'react';

// * blurhash
import { Blurhash } from 'react-blurhash';

// * components
import MasonryItem from './MasonryItem';
import Overlay from './Overlay';
import ExpandButton from './ExpandButton';

// * interfaces
import type { Image } from '../interfaces/interfaces';

interface ImageCardProps {
  image: Image;
}

const ImageCard: FC<ImageCardProps> = ({ image }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const loadHandler = () => setLoaded(true);

  const { blur_hash, height, width, description, alt_description } = image;
  const { regular: img_url } = image.urls;
  const { username, name, profile_image } = image.user;
  const { html: profile_link } = image.user.links;

  useEffect(() => {
    const card = imageContainerRef.current;
    if (!card) return;

    if (!loaded) {
      const cardWidth = parseInt(
        getComputedStyle(card).getPropertyValue('width')
      );

      card.style.height = (cardWidth * height) / width + 'px';
      return;
    }

    card.style.height = 'initial';
  }, [imageContainerRef.current, loaded]);

  return (
    <MasonryItem className='image-card'>
      <div
        ref={imageContainerRef}
        className='image-container relative rounded-2xl overflow-hidden'
      >
        <img
          src={img_url}
          onLoad={loadHandler}
          alt={alt_description}
          className={loaded ? '' : 'hidden'}
        />
        {!loaded && blur_hash && (
          <Blurhash hash={blur_hash} width='100%' height='100%' />
        )}
        <Overlay className='flex justify-end text-gray-200 p-3'>
          <ExpandButton image={image} />
        </Overlay>
      </div>
      {description && (
        <p className='description font-medium pt-2 break-words'>
          {description.length > 50
            ? description.slice(0, 50) + '...'
            : description}
        </p>
      )}
      <div className='info flex gap-x-4 pt-2'>
        <img
          alt={username}
          src={profile_image.large}
          className='w-10 h-10 rounded-full'
        />
        <div className='grid grid-rows-2'>
          <span className='name truncate font-medium'>{name}</span>
          <a
            href={profile_link}
            target='_blank'
            rel='noopener noreferrer'
            className='username text-xs hover:underline'
          >
            @{username}
          </a>
        </div>
      </div>
    </MasonryItem>
  );
};

export default ImageCard;
