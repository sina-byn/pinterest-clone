import { FC, useState } from 'react';

// * hooks
import useAxios from './hooks/useAxios';

// * context-provider
import ModalContextProvider from './context/ModalContextProvider';
import useScrollToBottom from './hooks/useScrollToBottom';

// * components
import Chips from './components/Chips';
import ImageCard from './components/ImageCard';
import MasonryGrid from './components/MasonryGrid';
import TagInput from './components/TagInput';
import ImageModal from './components/ImageModal';

// * interfaces
import type { Image } from './interfaces/interfaces';

interface ApiData {
  total: number;
  total_pages: number;
  results: Image[];
}

const App: FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [tags, setTags] = useState<string[]>(['tokyo', 'cars']);
  const [page, setPage] = useState<number>(1);

  useScrollToBottom(() => setPage(prev => ++prev));

  const axios = useAxios<Image[]>();
  axios.get('/search/photos', {
    onComplete: (data: ApiData) => {
      page === 1
        ? setImages(data.results)
        : setImages(prev => prev.concat(data.results));
    },
    params: {
      client_id: import.meta.env.VITE_AUTH_KEY,
      query: tags.join(','),
      per_page: 30,
      page: page,
    },
    dependencies: [page, tags],
  });

  return (
    <main className='app-container'>
      <header className='flex flex-col px-4 pt-4'>
        <h1 className='logo text-pinterest text-xl font-medium border-b border-pinterest'>
          Pinterest Clone
        </h1>
        <div className='tags flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 pb-6'>
          {tags &&
            tags.map(tag => (
              <Chips
                key={tag}
                type='deletable'
                title={tag}
                tags={tags}
                setTags={setTags}
              />
            ))}
          <TagInput setTags={setTags} />
        </div>
      </header>
      <ModalContextProvider>
        <MasonryGrid>
          {images &&
            images.map(image => <ImageCard key={image.id} image={image} />)}
        </MasonryGrid>
        <ImageModal />
      </ModalContextProvider>
    </main>
  );
};

export default App;
