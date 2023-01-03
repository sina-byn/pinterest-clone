import {
  FC,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

// * context
export const ModalCtx = createContext<ModalContext | null>(null);

// * interfaces
import type { UserData } from '../interfaces/interfaces';

interface ModalContext {
  modalData: ModalData;
  setModalData: Dispatch<SetStateAction<ModalData>>;
}

interface ProviderProps {
  children: ReactNode;
}

interface ModalData {
  open: boolean;
  image: string;
  likes: number;
  description: string;
  alt_description: string;
  tags: { title: string }[];
  user: UserData;
}

const ModalContextProvider: FC<ProviderProps> = ({ children }) => {
  const [modalData, setModalData] = useState<ModalData>({
    open: false,
    image: '',
    likes: 0,
    description: '',
    alt_description: '',
    tags: [],
    user: {
      profile_image: { large: '' },
      name: '',
      username: '',
      links: { html: '' },
    },
  });

  return (
    <ModalCtx.Provider value={{ modalData, setModalData }}>
      {children}
    </ModalCtx.Provider>
  );
};

export default ModalContextProvider;
