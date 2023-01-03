import { FC, useState } from 'react';

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
    onComplete: (data: ApiData) => console.log(data),
    params: {
      client_id: import.meta.env.VITE_AUTH_KEY,
      query: tags.join(','),
      per_page: 30,
      page: page,
    },
    dependencies: [tags],
  });

  return <main className='app-container'></main>;
};

export default App;
