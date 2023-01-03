import { DependencyList, Dispatch, SetStateAction, useEffect } from 'react';

// * axios
import axios from 'axios';

// * config
axios.defaults.baseURL = 'https://api.unsplash.com';

// * interfaces
interface Options<T> {
  onComplete: Function | Dispatch<SetStateAction<T>>;
  params?: object;
  dependencies?: DependencyList;
}

const useAxios = <T>() => ({
  get: (url: string, options: Options<T>) => {
    const { onComplete, params = {}, dependencies = [] } = options;

    useEffect(() => {
      axios
        .get(url, { params: params })
        .then(({ data }) => onComplete(data))
        .catch(err => console.error(err));
    }, dependencies);
  },
});

export default useAxios;
