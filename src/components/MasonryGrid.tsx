import { FC, ReactNode } from 'react';

// * interfaces
interface MasonryGridProps {
  children: ReactNode;
}

const MasonryGrid: FC<MasonryGridProps> = ({ children }) => {
  return (
    <div
      className={`
        masonry-grid grid
        auto-rows-[0] gap-4
        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
        px-4 mx-auto
      `}
    >
      {children}
    </div>
  );
};

export default MasonryGrid;
