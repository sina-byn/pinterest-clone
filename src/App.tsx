import { FC, useState } from 'react';
import ImageCard from './components/ImageCard';
import MasonryGrid from './components/MasonryGrid';

// * hooks
import useAxios from './hooks/useAxios';

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

  const axios = useAxios<Image[]>();
  axios.get('/search/photos', {
    onComplete: (data: ApiData) => setImages(data.results),
    params: {
      client_id: import.meta.env.VITE_AUTH_KEY,
      query: tags.join(','),
      per_page: 30,
      page: page,
    },
    dependencies: [tags],
  });

  return (
    <main className='app-container'>
      <MasonryGrid>
        {images &&
          images.map(image => <ImageCard key={image.id} image={image} />)}
      </MasonryGrid>
    </main>
  );
};

export default App;
