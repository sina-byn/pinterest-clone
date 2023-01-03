import { FC, useEffect, ReactNode, useRef } from 'react';

// * interfaces
interface MasonryItemProps {
  children: ReactNode;
  className?: string;
}

const MasonryItem: FC<MasonryItemProps> = ({ children, className = '' }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const sizeHandler = () => {
    if (!itemRef.current) return;

    const el = itemRef.current;
    const masonryGrid = el.parentElement!;
    const children = Array.from(el.children);

    const rowHeight = parseInt(getComputedStyle(masonryGrid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(getComputedStyle(masonryGrid).getPropertyValue('row-gap'));
    const totalHeight = children.reduce(
      (prev, newEl) => (prev += newEl.getBoundingClientRect().height),
      0
    );

    el.style.gridRowEnd = `span ${Math.ceil((totalHeight + rowGap) / (rowHeight + rowGap))}`;
  };

  useEffect(() => {
    sizeHandler();

    window.addEventListener('resize', sizeHandler);

    return () => window.removeEventListener('resize', sizeHandler);
  }, [itemRef.current]);

  return (
    <div ref={itemRef} className={className}>
      {children}
    </div>
  );
};

export default MasonryItem;
