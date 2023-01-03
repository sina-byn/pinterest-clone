import { FC, MouseEvent, useState } from 'react';

// * components
import Button from './Button';

// * interfaces
interface LikeButtonProps {
  likes: number;
}

const LikeButton: FC<LikeButtonProps> = ({ likes }) => {
  const [likesCount, setLikesCount] = useState<number>(likes);

  const likeHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isLiked = !target.classList.contains('fa-regular');

    target.classList.toggle('fa-regular');
    target.classList.toggle('fa-solid');

    isLiked ? setLikesCount(prev => --prev) : setLikesCount(prev => ++prev);
  };

  return (
    <div className='like-btn-container flex items-end gap-x-2 text-pinterest font-medium'>
      <Button onClick={likeHandler}>
        <i className='fa-regular fa-heart' />
      </Button>
      <span className='count'>{likesCount}</span>
    </div>
  );
};

export default LikeButton;
