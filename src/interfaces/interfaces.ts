interface UserData {
  username: string;
  name: string;
  links: {
    html: string;
  };
  profile_image: {
    large: string;
  };
}

interface Image {
  height: number;
  width: number;
  id: string;
  tags: { title: string }[];
  likes: number;
  blur_hash: string;
  alt_description: string;
  description: string;
  urls: {
    regular: string;
  };
  links: {
    download: string;
  };
  user: UserData;
}

export type { Image, UserData };
