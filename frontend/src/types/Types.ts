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
  bookCover?: string;
  bookImageUrl: string;
}

export interface OrderType {
  _id: string;
  userId: string;
  bookId: string;
  quantity: number;
  totalPrice: number;
  orderDate: Date;
  delivered: boolean;
  paid: boolean;
  bookDetails: [
    {
      author: string;
      bookImageUrl: string;
      price: number;
      title: string;
    }
  ];
}
