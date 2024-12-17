export interface Slide {
  index: number;
  image: string;
  phrase: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface UserRegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export interface AdminRegisterFormValues {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface BookType {
  _id?: string;
  title: string;
  author: string;
  pages: number;
  isbn: string;
  publisher: string;
  publicationDate: Date;
  genres: string[];
  language: string;
  description: string;
  price: number;
  stockQuantity: number;
  bookCover: string;
}
